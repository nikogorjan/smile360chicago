/**
 * Screenshots every block as it actually renders and writes the thumbnails Payload shows in
 * the "Add Layout" block picker (the `imageURL` on each block config).
 *
 * Needs the dev server running:  npm run dev
 * Then:                          npx tsx scripts/shoot-block-previews.mts
 *
 * Blocks are found via the `data-block` attribute that RenderBlocks / Panel put on each one.
 * A block is only captured once, from the first page it's found on.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

import { chromium } from 'playwright'
import sharp from 'sharp'

const BASE = process.env.PREVIEW_BASE || 'http://localhost:3000'
const OUT_DIR = path.join(process.cwd(), 'public', 'block-previews')
const PAGES = ['/', '/about', '/new-patients', '/contact']

/** Capture at desktop width; clamp to 3:2 so a very tall block doesn't shrink to a sliver. */
const VIEWPORT_W = 1440
const MAX_RATIO = 1.5
const OUT_W = 900
const OUT_H = 600

/** blockType -> preview filename (kebab-case of the block's admin label). */
const FILENAME: Record<string, string> = {
  heroBlock: 'hero',
  mastheadBlock: 'masthead',
  founderLetterBlock: 'founder-letter',
  valuesIndexBlock: 'values-index',
  manifestoBlock: 'manifesto',
  firstVisitBlock: 'first-visit',
  newPatientHeroBlock: 'new-patient-hero',
  offerSpotlightBlock: 'offer-spotlight',
  getReadyBlock: 'get-ready',
  comfortBlock: 'comfort',
  mapBandBlock: 'map-band',
  imageBandBlock: 'image-band',
  pillarsBlock: 'pillars',
  statsBlock: 'stats',
  servicesBentoBlock: 'services-bento',
  comparisonBlock: 'comparison',
  credentialsBlock: 'credentials',
  technologyBlock: 'technology',
  reviewsBlock: 'reviews',
  latestPostsBlock: 'latest-posts',
  dentistFeatureBlock: 'dentist-feature',
  timelineBlock: 'timeline',
  panelBlock: 'panel',
  faqBlock: 'faq',
  emergencyBlock: 'emergency',
  appointmentBlock: 'appointment',
}

/** Chrome that would otherwise sit on top of a block: sticky header, Next's dev overlay.
 *  `visibility` (not `display`) so nothing reflows — the block renders exactly as shipped. */
const HIDE_CHROME = `
  header, nextjs-portal, [data-nextjs-toast], #__next-dev-overlay { visibility: hidden !important; }
  html { scroll-behavior: auto !important; }
`

await fs.mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: VIEWPORT_W, height: 900 },
  deviceScaleFactor: 2,
  // The hero's intro animation and the scroll-parallax layers settle instantly under
  // reduced motion, so every block is captured in its resting state.
  reducedMotion: 'reduce',
  colorScheme: 'light',
})
const page = await context.newPage()

const captured: string[] = []
const skipped: string[] = []

for (const url of PAGES) {
  process.stdout.write(`\n${url}\n`)
  await page.goto(BASE + url, { waitUntil: 'domcontentloaded', timeout: 90_000 })
  await page.addStyleTag({ content: HIDE_CHROME })

  // Walk the page so lazy images/iframes load, then settle back at the top.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 100))
    }
    window.scrollTo(0, 0)
  })
  // Best-effort: pages with a Google Maps embed never reach networkidle, so don't insist.
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
  await page.waitForTimeout(2500)

  const types: string[] = await page.$$eval('[data-block]', (els) =>
    els.map((e) => e.getAttribute('data-block') || ''),
  )

  for (const type of types) {
    const name = FILENAME[type]
    if (!name) {
      skipped.push(`${type} (no filename mapping)`)
      continue
    }
    if (captured.includes(name)) continue

    // RenderBlocks' wrapper is `display: contents` (no box of its own), so step down to the
    // block's real root element. Panel tags a real div, which we can shoot directly.
    const ok = await page.evaluate((t) => {
      document.querySelectorAll('[data-shot]').forEach((n) => n.removeAttribute('data-shot'))
      const wrapper = document.querySelector(`[data-block="${t}"]`)
      if (!wrapper) return false
      const target = wrapper.getBoundingClientRect().width > 0 ? wrapper : wrapper.firstElementChild
      if (!target) return false
      target.setAttribute('data-shot', '1')
      return true
    }, type)
    if (!ok) {
      skipped.push(`${type} (no element)`)
      continue
    }

    const png = await page.locator('[data-shot="1"]').screenshot({ timeout: 30_000 })

    // Clamp to 3:2, then letterbox anything shorter against its own background colour
    // (sampled from a corner pixel) so short bands don't get cropped to their middle.
    const meta = await sharp(png).metadata()
    const maxH = Math.round((meta.width || VIEWPORT_W) / MAX_RATIO)
    const source =
      (meta.height || 0) > maxH
        ? await sharp(png).extract({ left: 0, top: 0, width: meta.width!, height: maxH }).toBuffer()
        : png

    const { data: px } = await sharp(png)
      .extract({ left: 4, top: 4, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const outFile = path.join(OUT_DIR, `${name}.webp`)
    await sharp(source)
      .resize(OUT_W, OUT_H, {
        fit: 'contain',
        background: { r: px[0], g: px[1], b: px[2] },
      })
      .webp({ quality: 82 })
      .toFile(outFile)

    const { size } = await fs.stat(outFile)
    captured.push(name)
    process.stdout.write(`  ✓ ${name}.webp  (${Math.round(size / 1024)} KB)\n`)
  }
}

await browser.close()

const missing = Object.entries(FILENAME)
  .filter(([, name]) => !captured.includes(name))
  .map(([type, name]) => `${name} (${type})`)

process.stdout.write(`\ncaptured ${captured.length}/${Object.keys(FILENAME).length}\n`)
if (missing.length) process.stdout.write(`not on any page: ${missing.join(', ')}\n`)
if (skipped.length) process.stdout.write(`skipped: ${skipped.join(', ')}\n`)
