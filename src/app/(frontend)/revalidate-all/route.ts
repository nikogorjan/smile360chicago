import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Dev helper: GET /revalidate-all?key=smile360revalidate
 *
 * Purges the Next data-cache tags for the CMS globals plus the whole frontend route tree.
 * Needed after writing to the CMS from a standalone script (which can't call revalidateTag
 * itself), so the changes show without clearing the entire .next build.
 *
 * Safe to delete once content is finalized.
 */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  if (params.get('key') !== 'smile360revalidate') {
    return NextResponse.json({ ok: false, error: 'Invalid key' }, { status: 401 })
  }

  const tags = ['global_site-settings', 'global_header', 'global_footer']
  for (const t of tags) revalidateTag(t)
  revalidatePath('/', 'layout')

  return NextResponse.json({ ok: true, revalidatedTags: tags, revalidatedPath: '/ (layout)' })
}
