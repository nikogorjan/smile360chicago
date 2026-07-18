import React from 'react'

import type { Media as MediaType, TechnologyBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

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
      <div className={cn(hasPhotos && 'grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-stretch lg:gap-8')}>
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

        {/* Photos — an editorial collage (one tall + two stacked) that fills the
            column height, so the image side stays as substantial as the copy. */}
        {hasPhotos && (
          <div
            className={cn(
              'grid gap-4 lg:h-full',
              photos.length >= 3
                ? 'min-h-104 grid-cols-2 grid-rows-2'
                : photos.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-1',
            )}
          >
            {(photos.length >= 3 ? photos.slice(0, 3) : photos).map((m, i) => (
              <div
                key={i}
                className={cn(
                  'group/photo relative overflow-hidden rounded-[8px] border border-border bg-muted shadow-[0_18px_40px_-24px_rgb(0_0_0/0.3)]',
                  photos.length >= 3 ? i === 0 && 'row-span-2' : 'aspect-[9/16]',
                )}
              >
                <Media
                  resource={m}
                  fill
                  imgClassName="object-cover transition-transform duration-500 ease-out group-hover/photo:scale-105 motion-reduce:transition-none motion-reduce:group-hover/photo:scale-100"
                  className="absolute inset-0"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  )
}
