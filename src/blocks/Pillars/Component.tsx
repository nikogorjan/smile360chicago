import React from 'react'

import type { PillarsBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { stockPhotos } from '@/lib/stockImages'
import { insurance as insuranceFallback } from '@/lib/practice'
import { InsuranceMarqueeTrack } from '@/blocks/InsuranceMarquee/InsuranceMarqueeTrack'
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
 * pillar, resolves the upload to a URL with a stock fallback, builds the
 * checklist + stat) and hands it to the client <PillarsAccordion> (horizontal
 * accordion on desktop, stacked on mobile). The insurance marquee is merged in
 * at the bottom of the same section.
 */
export const PillarsBlock: React.FC<Props> = ({ eyebrow, heading, intro, pillars, insurance }) => {
  const items: PillarItem[] = (pillars || []).map((p, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: p.title,
    body: p.body,
    imageUrl: mediaUrl(p.image as MediaLike) || FALLBACKS[i % FALLBACKS.length],
    imageAlt: mediaAlt(p.image as MediaLike) || p.title || '',
    checklist: (p.checklist || []).map((c) => c.item || '').filter(Boolean),
    stat: p.stat?.value ? { value: p.stat.value, caption: p.stat.caption || '' } : null,
  }))

  if (!items.length) return null

  // Insurance marquee (merged in) — same data source/fallback as the old block.
  const insuranceNames = insurance?.plans?.length
    ? insurance.plans.map((p) => p.name || '').filter(Boolean)
    : insuranceFallback
  const insuranceHeading = insurance?.heading || 'We accept most major dental plans'

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

        {/* Insurance marquee — merged at the bottom, normal internal spacing */}
        {insuranceNames.length > 0 && (
          <div className="mt-16 text-center">
            <h2 className="text-pretty text-2xl leading-tight tracking-normal text-foreground sm:text-3xl">
              {insuranceHeading}
            </h2>
            <InsuranceMarqueeTrack names={insuranceNames} />
          </div>
        )}
      </div>
    </Section>
  )
}
