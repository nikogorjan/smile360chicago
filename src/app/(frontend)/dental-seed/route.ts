import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import { dentalSeed } from '@/seed/dentalSeed'

/**
 * Dev convenience: GET /dental-seed?key=smile360seed populates the CMS with the
 * dental content (Site Settings, nav, collections, and all pages as blocks).
 * Safe to delete once content is finalized.
 */
export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get('key')
  if (key !== 'smile360seed') {
    return NextResponse.json({ ok: false, error: 'Invalid key' }, { status: 401 })
  }
  try {
    const payload = await getPayload({ config: configPromise })
    await dentalSeed(payload)
    return NextResponse.json({ ok: true, message: 'Dental content seeded.' })
  } catch (err) {
    console.error('[dental-seed]', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
