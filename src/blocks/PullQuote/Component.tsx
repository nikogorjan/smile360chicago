import React from 'react'

import type { PullQuoteBlock as Props } from '@/payload-types'

// Editorial pull quote: a cobalt accent bar and large serif type break the body rhythm.
export const PullQuoteBlock: React.FC<Props> = ({ quote, attribution }) => {
  if (!quote) return null
  return (
    <figure className="not-prose my-10 border-l-4 border-brand pl-6 sm:pl-8">
      <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
        “{quote}”
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
