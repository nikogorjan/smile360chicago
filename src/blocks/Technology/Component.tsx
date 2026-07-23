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
  topGap,
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
      topGap={topGap} bottomGap={bottomGap}
    >
      {/* Header */}
      <div className="max-w-2xl">
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
      </div>

      {/* Technology blocks */}
      {list.length > 0 && (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <div
              key={i}
              className={cn(
                'rounded-[8px] border p-6',
                invert ? 'border-white/15 bg-white/5' : 'border-border bg-card',
              )}
            >
              <span
                className={cn(
                  'grid size-11 place-items-center rounded-sm',
                  invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                )}
              >
                <DynamicIcon name={t.icon || 'Sparkles'} className="size-5" />
              </span>
              <h3 className={cn('mt-4 text-lg font-semibold', invert ? 'text-white' : 'text-foreground')}>
                {t.title}
              </h3>
              {t.description && (
                <p
                  className={cn(
                    'mt-1.5 text-sm leading-relaxed',
                    invert ? 'text-white/70' : 'text-muted-foreground',
                  )}
                >
                  {t.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Photos — a band below the blocks */}
      {hasPhotos && (
        <div
          className={cn(
            'mt-5 grid gap-5',
            photos.length >= 3 ? 'grid-cols-3' : photos.length === 2 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {photos.map((m, i) => (
            <div
              key={i}
              className="group/photo relative aspect-[3/4] overflow-hidden rounded-[8px] border border-border bg-muted shadow-[0_18px_40px_-24px_rgb(0_0_0/0.3)]"
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
    </SectionShell>
  )
}
