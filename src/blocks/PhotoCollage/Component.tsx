import React from 'react'

import type { PhotoCollageBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

const span = (s?: string | null) =>
  s === 'wide'
    ? 'sm:col-span-2'
    : s === 'tall'
      ? 'lg:row-span-2'
      : s === 'big'
        ? 'sm:col-span-2 lg:row-span-2'
        : ''

export const PhotoCollageBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  items,
  surface,
  paddingTop,
  paddingBottom,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const list = items || []

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom}>
      {(eyebrow || headingEl || description) && (
        <div className="mb-10 max-w-2xl md:mb-14">
          {eyebrow && (
            <Eyebrow tone={invert ? 'dark' : 'light'} className="mb-3">
              {eyebrow}
            </Eyebrow>
          )}
          {headingEl && (
            <h2
              className={cn(
                'font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {headingEl}
            </h2>
          )}
          {description && (
            <p className={cn('mt-4 text-lg leading-relaxed', invert ? 'text-white/75' : 'text-muted-foreground')}>
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
        {list.map((it, i) => {
          const hasImage = it.image && typeof it.image !== 'string'
          return (
            <div
              key={i}
              className={cn('group relative overflow-hidden rounded-[8px] border border-border', span(it.size))}
            >
              {hasImage ? (
                <Media
                  resource={it.image}
                  fill
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  className="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
                  <DynamicIcon name="Image" className="size-8 opacity-40" />
                </div>
              )}
              {it.caption && (
                <>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground">
                    {it.caption}
                  </span>
                </>
              )}
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}
