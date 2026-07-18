import React from 'react'

import type { Media as MediaType, TechnologyBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { ScrollDrift } from '@/components/site/ScrollDrift'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

// Per-tile vertical stagger (start position) and scroll drift (px, per index 0/1/2).
// Symmetric — outer tiles match, middle is offset — so it always reads centered;
// the drift is small so the movement stays subtle.
const STAGGER = ['mt-8', 'mt-0', 'mt-8']
const DRIFT = [16, -10, 16]

/**
 * Technology — icon cards (the star) with an optional supporting photo strip below.
 */
export const TechnologyBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  lead,
  items,
  images,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const list = items || []
  const photos = (Array.isArray(images) ? images : [])
    .map((row) => row?.image)
    .filter((m): m is MediaType => !!m && typeof m === 'object')
  const hasPhotos = photos.length > 0
  if (!list.length && !hasPhotos) return null

  return (
    <SectionShell
      surface={surface}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      bottomGap={bottomGap}
    >
      <div className={cn(hasPhotos && 'grid items-end gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8')}>
        {/* Content + technology list */}
        <div className={cn(hasPhotos ? 'max-w-xl' : 'max-w-2xl')}>
          {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}
          {headingEl && (
            <h2
              className={cn(
                'mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {headingEl}
            </h2>
          )}
          {lead && (
            <p className={cn('mt-4 text-base leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
              {lead}
            </p>
          )}

          {list.length > 0 && (
            <ul className={cn('mt-8', hasPhotos ? 'space-y-5' : 'grid gap-x-8 gap-y-5 sm:grid-cols-2')}>
              {list.map((t, i) => (
                <li
                  key={i}
                  className={cn(
                    'flex items-start gap-4 rounded-[8px] border p-4 sm:p-5',
                    invert ? 'border-white/15 bg-white/5' : 'border-border bg-card',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-10 shrink-0 place-items-center rounded-sm',
                      invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                    )}
                  >
                    <DynamicIcon name={t.icon || 'Sparkles'} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className={cn('block font-semibold', invert ? 'text-white' : 'text-foreground')}>
                      {t.title}
                    </span>
                    {t.description && (
                      <span
                        className={cn(
                          'mt-0.5 block text-sm leading-relaxed',
                          invert ? 'text-white/70' : 'text-muted-foreground',
                        )}
                      >
                        {t.description}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Photos — three tall 9:16 tiles, staggered, each drifting on scroll.
            Vertically centred against the copy (items-center on the parent grid). */}
        {hasPhotos && (
          <div
            className={cn(
              'grid gap-4 sm:gap-5',
              photos.length >= 3 ? 'grid-cols-3' : photos.length === 2 ? 'grid-cols-2' : 'grid-cols-1',
            )}
          >
            {photos.map((m, i) => (
              <ScrollDrift key={i} amount={DRIFT[i % 3]} className={STAGGER[i % 3]}>
                <div className="relative aspect-[9/16] overflow-hidden rounded-[8px] border border-border bg-muted">
                  <Media resource={m} fill imgClassName="object-cover" className="absolute inset-0" />
                </div>
              </ScrollDrift>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  )
}
