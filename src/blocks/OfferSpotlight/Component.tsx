import Link from 'next/link'
import React from 'react'

import type { OfferSpotlightBlock as Props } from '@/payload-types'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'

export const OfferSpotlightBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  subline,
  seal,
  sealIcon,
  finePrint,
  links,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  // The card is always cobalt, so render the heading accent inverted (white).
  const headingEl = renderRichHeading(heading, true)
  const cta = links?.[0]?.link

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="relative overflow-hidden rounded-[8px] bg-primary text-primary-foreground">
        {/* Soft cobalt/gold glow for depth */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          {/* The offer */}
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}

            {headingEl && (
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.03] tracking-tight text-white sm:text-5xl">
                {headingEl}
              </h2>
            )}

            {subline && <p className="mt-4 text-lg leading-relaxed text-white/80">{subline}</p>}

            {cta && (
              <div className="mt-8">
                <Link href={resolveHref(cta)} className={buttonVariants({ variant: 'white' })}>
                  <ButtonLabel>{cta.label}</ButtonLabel>
                </Link>
              </div>
            )}

            {finePrint && <p className="mt-5 max-w-md text-xs leading-relaxed text-white/45">{finePrint}</p>}
          </div>

          {/* Gold seal — a rotated stamp, behind a perforated divider on desktop */}
          <div className="relative flex justify-center lg:border-l lg:border-dashed lg:border-white/25 lg:pl-14">
            <div className="relative grid size-36 rotate-[-7deg] place-items-center rounded-full bg-gold text-gold-foreground sm:size-44">
              <span aria-hidden className="absolute inset-2.5 rounded-full border-2 border-dashed border-gold-foreground/30" />
              <div className="flex flex-col items-center gap-1.5 px-6 text-center">
                <DynamicIcon name={sealIcon || 'BadgePercent'} className="size-7" />
                {seal && (
                  <span className="text-[0.7rem] font-bold uppercase leading-tight tracking-[0.12em]">{seal}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
