import Link from 'next/link'
import React from 'react'

import type { AffordabilityBlock as Props } from '@/payload-types'
import { DynamicIcon, Eyebrow, buttonPrimary } from '@/components/site/primitives'
import { InsuranceMarqueeTrack } from '@/blocks/InsuranceMarquee/InsuranceMarqueeTrack'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const AffordabilityBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  points,
  insurers,
  insurersLabel,
  links,
  surface,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const pointList = points || []
  const insurerList = insurers || []
  const cta = links?.[0]?.link
  const gridCols = pointList.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} topGap={topGap} bottomGap={bottomGap}>
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

        {intro && (
          <p className={cn('mt-4 text-base leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
            {intro}
          </p>
        )}
      </div>

      {pointList.length > 0 && (
        <div className={cn('mt-12 grid gap-6', gridCols)}>
          {pointList.map((p, i) => (
            <div
              key={i}
              className={cn(
                'rounded-[8px] border p-6 sm:p-7',
                invert ? 'border-white/15 bg-white/5' : 'border-border bg-card',
              )}
            >
              <span
                className={cn(
                  'grid size-11 place-items-center rounded-sm',
                  invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                )}
              >
                <DynamicIcon name={p.icon || 'ShieldCheck'} className="size-5" />
              </span>
              <h3 className={cn('mt-5 font-display text-lg font-bold', invert ? 'text-white' : 'text-foreground')}>
                {p.title}
              </h3>
              {p.body && (
                <p className={cn('mt-2 text-sm leading-relaxed', invert ? 'text-white/70' : 'text-muted-foreground')}>
                  {p.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {insurerList.length > 0 && (
        <div className="mt-12">
          {insurersLabel && (
            <p
              className={cn(
                'text-center text-xs font-semibold uppercase tracking-[0.16em]',
                invert ? 'text-white/60' : 'text-muted-foreground',
              )}
            >
              {insurersLabel}
            </p>
          )}
          {/* Infinite, seamless marquee (same as the homepage) */}
          <InsuranceMarqueeTrack names={insurerList.map((x) => x.text || '').filter(Boolean)} />
        </div>
      )}

      {cta && (
        <div className="mt-9">
          <Link href={resolveHref(cta)} className={buttonPrimary}>
            <ButtonLabel>{cta.label}</ButtonLabel>
          </Link>
        </div>
      )}
    </SectionShell>
  )
}
