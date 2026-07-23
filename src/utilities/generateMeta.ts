import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

/** The page's own Meta Image, preferring the 1200×630 `og` size Payload generates for it.
 *  Returns undefined when the page has none, so `mergeOpenGraph` falls back to the
 *  site-wide /og.jpg rather than the Payload template's placeholder. */
const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (image && typeof image === 'object' && 'url' in image) {
    const serverUrl = getServerSideURL()
    const ogUrl = image.sizes?.og?.url

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return undefined
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  // The Meta Title field IS the full title — no brand suffix appended. The SEO panel
  // measures that field against the 50–60 character target, so anything tacked on here
  // would silently push every page past what Google actually shows.
  const title = doc?.meta?.title || 'Smile360 Chicago'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
