import Link from 'next/link'
import React from 'react'

import type { AboutHeroBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import {
  DynamicIcon,
  Eyebrow,
  Section,
  StarRating,
  buttonPrimary,
  buttonSecondary,
  cardSurface,
} from '@/components/site/primitives'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { toneClasses } from '../_shared/tone'
import { withHighlight } from '../_shared/highlight'
import { cn } from '@/utilities/ui'

export const AboutHeroBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  highlight,
  intro,
  image,
  imageSide,
  ratingValue,
  ratingLabel,
  chips,
  links,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'
  const { wrapper, invert } = toneClasses(background)

  const primaryCta = links?.[0]?.link
  const secondaryCta = links?.[1]?.link
  const primaryClass = invert ? buttonVariants({ variant: 'white' }) : buttonPrimary
  const secondaryClass = invert ? buttonVariants({ variant: 'outlineWhite' }) : buttonSecondary

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} className={wrapper}>
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div className={cn('max-w-xl', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
          {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}

          {heading && (
            <h1
              className={cn(
                'mt-5 text-pretty font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {withHighlight(heading, highlight, invert ? 'text-white/60' : 'text-brand')}
            </h1>
          )}

          {intro && (
            <p
              className={cn(
                'mt-5 text-lg leading-relaxed',
                invert ? 'text-white/80' : 'text-muted-foreground',
              )}
            >
              {intro}
            </p>
          )}

          {chips && chips.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((c, i) => (
                <li
                  key={i}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm',
                    invert
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-border bg-card text-foreground',
                  )}
                >
                  {c.icon && (
                    <DynamicIcon
                      name={c.icon}
                      className={cn('size-4', invert ? 'text-white' : 'text-brand')}
                    />
                  )}
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {primaryCta && (
                <Link href={resolveHref(primaryCta)} className={primaryClass}>
                  <ButtonLabel>{primaryCta.label}</ButtonLabel>
                </Link>
              )}
              {secondaryCta && (
                <Link href={resolveHref(secondaryCta)} className={secondaryClass}>
                  <ButtonLabel>{secondaryCta.label}</ButtonLabel>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Photo + floating rating card */}
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
                <DynamicIcon name="Image" className="size-10 opacity-40" />
              </div>
            )}
          </div>

          {ratingLabel && (
            <div className="absolute bottom-5 left-5 max-w-[16rem] rounded-2xl bg-card px-5 py-4 ring-1 ring-border">
              <StarRating value={ratingValue ?? 5} />
              <p className="mt-2 text-sm font-medium leading-tight text-foreground">{ratingLabel}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
