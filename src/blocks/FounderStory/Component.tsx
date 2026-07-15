import Link from 'next/link'
import React from 'react'

import type { FounderStoryBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import {
  DynamicIcon,
  Eyebrow,
  Section,
  SpecList,
  buttonPrimary,
  cardSurface,
} from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { toneClasses } from '../_shared/tone'
import { withHighlight } from '../_shared/highlight'
import { cn } from '@/utilities/ui'

export const FounderStoryBlock: React.FC<Props> = ({
  image,
  imageSide,
  eyebrow,
  heading,
  highlight,
  body,
  quote,
  signature,
  role,
  bullets,
  links,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide !== 'right'
  const { wrapper, invert } = toneClasses(background)
  const cta = links?.[0]?.link
  const specs = (bullets || []).map((b) => ({ icon: 'Check', label: b.item }))

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} className={wrapper}>
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Portrait */}
        <div className={cn('group relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          <div className={cn(cardSurface, 'relative aspect-[4/5] overflow-hidden')}>
            {hasImage ? (
              <Media
                resource={image}
                fill
                imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
                <DynamicIcon name="UserRound" className="size-12 opacity-40" />
              </div>
            )}
          </div>
        </div>

        {/* Story */}
        <div className={cn('max-w-xl', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
          {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}

          {heading && (
            <h2
              className={cn(
                'mt-5 text-pretty font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {withHighlight(heading, highlight, invert ? 'text-white/60' : 'text-brand')}
            </h2>
          )}

          {body && (
            <p
              className={cn(
                'mt-5 whitespace-pre-line text-base leading-relaxed sm:text-lg',
                invert ? 'text-white/80' : 'text-muted-foreground',
              )}
            >
              {body}
            </p>
          )}

          {quote && (
            <blockquote
              className={cn(
                'mt-7 border-l-2 pl-5 font-display text-xl leading-snug sm:text-2xl',
                invert ? 'border-white/40 text-white' : 'border-brand text-foreground',
              )}
            >
              {quote.replace(/\*/g, '')}
            </blockquote>
          )}

          {specs.length > 0 && <SpecList items={specs} tone={invert ? 'dark' : 'light'} className="mt-8" />}

          {(signature || role) && (
            <div className="mt-8">
              {signature && (
                <p
                  className={cn(
                    'font-display text-2xl leading-none',
                    invert ? 'text-white' : 'text-foreground',
                  )}
                >
                  {signature}
                </p>
              )}
              {role && (
                <p
                  className={cn(
                    'mt-2 text-xs font-semibold uppercase tracking-[0.18em]',
                    invert ? 'text-white/60' : 'text-muted-foreground',
                  )}
                >
                  {role}
                </p>
              )}
            </div>
          )}

          {cta && (
            <div className="mt-9">
              <Link href={resolveHref(cta)} className={buttonPrimary}>
                <ButtonLabel>{cta.label}</ButtonLabel>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
