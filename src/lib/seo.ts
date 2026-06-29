import type { Metadata } from 'next'

import { practice } from '@/lib/practice'

/** Consistent per-page metadata for the marketing routes. */
export const buildMeta = ({
  title,
  description,
  path = '/',
}: {
  title: string
  description: string
  path?: string
}): Metadata => {
  const fullTitle = `${title} | ${practice.name}`
  const url = `${practice.url}${path}`
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: practice.name,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}
