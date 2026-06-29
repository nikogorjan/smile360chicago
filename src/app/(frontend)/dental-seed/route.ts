import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { dentalSeed } from '@/seed/dentalSeed'

/**
 * Dev convenience: GET /dental-seed?key=smile360seed populates the CMS with the
 * dental content (Site Settings, nav, collections, and all pages as blocks).
 *
 * Non-destructive by default — it only fills collections/posts that are empty, so it
 * never wipes content or photos you've added in the admin. Add `&force=1` to wipe and
 * re-create everything from placeholder data (use only for a deliberate clean reset).
 * Safe to delete this route once content is finalized.
 */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  if (params.get('key') !== 'smile360seed') {
    return NextResponse.json({ ok: false, error: 'Invalid key' }, { status: 401 })
  }
  const force = params.get('force') === '1'
  try {
    const payload = await getPayload({ config: configPromise })
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
