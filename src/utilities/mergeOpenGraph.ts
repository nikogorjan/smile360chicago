import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Modern family, cosmetic & same-day emergency dentistry in the heart of Chicago.',
  images: [
    {
      url: `${getServerSideURL()}/og.jpg`,
      width: 1200,
      height: 630,
    },
  ],
  siteName: 'Smile360 Chicago',
  title: 'Smile360 Chicago — Modern Dental Care',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
