import React from 'react'

import type { MastheadBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const MastheadBlock: React.FC<Props> = ({
  eyebrow,
  facts,
  heading,
  lead,
  image,
  caption,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const hasImage = image && typeof image !== 'string'
  const headingEl = renderRichHeading(heading, invert)

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}

        {facts && facts.length > 0 && (
          <ul
            className={cn(
              'mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm',
              invert ? 'text-white/70' : 'text-muted-foreground',
            )}
          >
            {facts.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                {i > 0 && (
                  <span className={cn('size-1 rounded-full', invert ? 'bg-white/40' : 'bg-muted-foreground/40')} />
                )}
                {f.text}
              </li>
            ))}
          </ul>
        )}

        {headingEl && (
          <h1
            className={cn(
              'mt-6 text-pretty font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {headingEl}
          </h1>
        )}

        {lead && (
          <p
            className={cn(
              'mx-auto mt-6 max-w-2xl text-lg leading-relaxed',
              invert ? 'text-white/80' : 'text-muted-foreground',
            )}
          >
            {lead}
          </p>
        )}
      </div>

      <div className="group relative mt-12 overflow-hidden rounded-[8px] border border-border md:mt-16">
        <div className="relative aspect-[16/7]">
          {hasImage ? (
            <Media
              resource={image}
              fill
              imgClassName="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              className="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
              <DynamicIcon name="Image" className="size-10 opacity-40" />
            </div>
          )}
          {caption && (
            <>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-card px-3.5 py-1.5 text-sm font-medium text-foreground">
                {caption}
              </span>
            </>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
