import React from 'react'

import type { PillarsBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { stockPhotos } from '@/lib/stockImages'
import { PillarsAccordion, type PillarItem } from './PillarsAccordion'

type MediaLike = { url?: string | null; alt?: string | null } | string | number | null | undefined

const mediaUrl = (m: MediaLike): string | undefined =>
  m && typeof m === 'object' && 'url' in m && m.url ? m.url : undefined
const mediaAlt = (m: MediaLike): string =>
  m && typeof m === 'object' && 'alt' in m && typeof m.alt === 'string' ? m.alt : ''

// Per-pillar image fallbacks so seeded pillars (no upload) still render.
const FALLBACKS = [
  stockPhotos.careConsult,
  stockPhotos.officeBright,
  stockPhotos.scanReview,
  stockPhotos.clearAligner,
  stockPhotos.examCloseup,
  stockPhotos.officeModern,
  stockPhotos.officeWarm,
]

/**
 * Pillars block — server component. Resolves CMS content (auto-numbers each
 * pillar, resolves the upload to a URL with a stock fallback) and hands it to
 * the client <PillarsAccordion>, which renders the horizontal accordion on
 * desktop and a stacked accordion on tablet/mobile.
 */
export const PillarsBlock: React.FC<Props> = ({ eyebrow, heading, intro, pillars }) => {
  const items: PillarItem[] = (pillars || []).map((p, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: p.title,
    body: p.body,
    imageUrl: mediaUrl(p.image as MediaLike) || FALLBACKS[i % FALLBACKS.length],
    imageAlt: mediaAlt(p.image as MediaLike) || p.title || '',
  }))

  if (!items.length) return null

  return (
    <Section>
      <div className="container">
        {heading && (
          <SectionHeading
            align="left"
            eyebrow={eyebrow || undefined}
            title={heading}
            description={intro || undefined}
          />
        )}
        <div className={heading ? 'mt-12' : ''}>
          <PillarsAccordion pillars={items} />
        </div>
      </div>
    </Section>
  )
}
