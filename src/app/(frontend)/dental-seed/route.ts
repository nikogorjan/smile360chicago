import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { dentalSeed, seedPages } from '@/seed/dentalSeed'

/**
 * Dev convenience: GET /dental-seed?key=smile360seed populates the CMS with the
 * dental content (Site Settings, nav, collections, and all pages as blocks).
 *
 * Non-destructive by default — pages are only created when missing and collections
 * only seeded when empty, so it never wipes content or photos you've added in admin.
 *   • &only=about   seed ONLY that page (comma-separate for several, e.g. only=about,contact)
 *   • &force=1      wipe + recreate (whole site, or just the &only pages) from placeholders
 *
 * Safe to delete this route once content is finalized.
 */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  if (params.get('key') !== 'smile360seed') {
    return NextResponse.json({ ok: false, error: 'Invalid key' }, { status: 401 })
  }
  const force = params.get('force') === '1'
  const only = params.get('only')
  try {
    const payload = await getPayload({ config: configPromise })

    // Targeted: seed only the requested page(s), leaving the rest of the site alone.
    if (only) {
      const slugs = only
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      const res = await seedPages(payload, slugs, { force })
      return NextResponse.json({
        ok: true,
        ...res,
        message: force
          ? `Reset page(s): ${res.created.join(', ') || 'none'}.`
          : `Created missing page(s): ${res.created.join(', ') || 'none'}. Skipped existing (images preserved): ${res.skipped.join(', ') || 'none'}.`,
      })
    }

    await dentalSeed(payload, { force })
    return NextResponse.json({
      ok: true,
      message: force
        ? 'Full reset — all content re-created from placeholders.'
        : 'Seeded missing content only — your existing content & photos were preserved.',
    })
  } catch (err) {
    console.error('[dental-seed]', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
