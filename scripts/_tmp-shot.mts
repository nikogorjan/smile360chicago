import { chromium } from 'playwright'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1600 }, deviceScaleFactor: 2, reducedMotion: 'reduce', colorScheme: 'light' })
const page = await ctx.newPage()
await page.goto(process.argv[3], { waitUntil: 'domcontentloaded', timeout: 90000 })
await page.addStyleTag({ content: 'header, nextjs-portal { visibility: hidden !important; }' })
await page.waitForTimeout(3000)
// full-length article body
await page.locator('article').screenshot({ path: process.argv[2], timeout: 40000 })
await browser.close()
console.log('saved')
