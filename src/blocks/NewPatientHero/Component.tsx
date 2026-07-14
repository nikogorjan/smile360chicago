import Link from 'next/link'
import React from 'react'

import type { NewPatientHeroBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow, buttonPrimary, buttonSecondary } from '@/components/site/primitives'
import { ScrollParallax } from '@/components/site/ScrollParallax'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const NewPatientHeroBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  lead,
  chips,
  image,
  imageSide,
  links,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'
  const headingEl = renderRichHeading(heading, invert)
  const chipList = chips || []
  const primary = links?.[0]?.link
  const secondary = links?.[1]?.link

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div className={cn('max-w-xl', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
          {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}

          {headingEl && (
            <h1
              className={cn(
                'mt-4 font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {headingEl}
            </h1>
          )}

          {lead && (
            <p className={cn('mt-5 text-lg leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
              {lead}
            </p>
          )}

          {chipList.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {chipList.map((c, i) => (
                <li
                  key={i}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium',
                    invert
                      ? 'border-white/20 bg-white/5 text-white'
                      : 'border-border bg-card text-foreground',
                  )}
                >
                  <DynamicIcon name={c.icon || 'Check'} className="size-3.5 text-brand" />
                  {c.text}
                </li>
              ))}
            </ul>
          )}

          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primary && (
                <Link href={resolveHref(primary)} className={buttonPrimary}>
                  <ButtonLabel>{primary.label}</ButtonLabel>
                </Link>
              )}
              {secondary && (
                <Link href={resolveHref(secondary)} className={buttonSecondary}>
                  <ButtonLabel>{secondary.label}</ButtonLabel>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Photo — drifts with scroll */}
        <div className={cn('relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          {hasImage ? (
            <ScrollParallax className="aspect-[4/5] rounded-[8px] border border-border" amount={0.06}>
              <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
            </ScrollParallax>
          ) : (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-border">
              <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
                <DynamicIcon name="Smile" className="size-10 opacity-40" />
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
