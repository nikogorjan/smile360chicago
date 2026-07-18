import Link from 'next/link'
import React from 'react'

import type { ComfortBlock as Props } from '@/payload-types'
import { DynamicIcon, Eyebrow, buttonPrimary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

/**
 * Comfort commitments — a reassurance-first grid that disarms dental anxiety. A short
 * header over a soft icon-top grid (3-up on desktop). Calming and airy, distinct from the
 * page's other cards/accordion. Defaults to the white panel surface.
 */
export const ComfortBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  items,
  links,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const list = items || []
  const cta = links?.[0]?.link

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
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

      {list.length > 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((it, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col rounded-[8px] p-6',
                invert ? 'bg-white/5' : 'bg-muted/60',
              )}
            >
              <span
                className={cn(
                  'grid size-11 shrink-0 place-items-center rounded-sm',
                  invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                )}
              >
                <DynamicIcon name={it.icon || 'Heart'} className="size-5" />
              </span>

              <h3
                className={cn(
                  'mt-5 font-display text-lg font-bold leading-snug',
                  invert ? 'text-white' : 'text-foreground',
                )}
              >
                {it.title}
              </h3>

              {it.description && (
                <p
                  className={cn(
                    'mt-2 text-sm leading-relaxed',
                    invert ? 'text-white/70' : 'text-muted-foreground',
                  )}
                >
                  {it.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {cta && (
        <div className="mt-10">
          <Link href={resolveHref(cta)} className={buttonPrimary}>
            <ButtonLabel>{cta.label}</ButtonLabel>
          </Link>
        </div>
      )}
    </SectionShell>
  )
}
