import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { SplitFeatureBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import {
  Eyebrow,
  Section,
  SpecList,
  buttonPrimary,
  buttonSecondary,
  cardSurface,
  emphasize,
} from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { stockPhotos } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

export const SplitFeatureBlock: React.FC<Props> = ({
  image,
  imageSide,
  eyebrow,
  heading,
  body,
  bullets,
  statValue,
  statLabel,
  links,
  background,
}) => {
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'

  const primaryCta = links?.[0]?.link
  const secondaryCta = links?.[1]?.link

  const specs = (bullets || []).map((b) => ({ icon: 'Check', label: b.item }))

  return (
    <Section tone={background}>
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo — unified card surface (border + soft shadow) */}
        <div className={cn('group relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          <div className={cn(cardSurface, 'relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]')}>
            {hasImage ? (
              <Media
                resource={image}
                fill
                imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                className="absolute inset-0"
              />
            ) : (
              <Image
                src={stockPhotos.careConsult}
                alt={typeof heading === 'string' ? heading.replace(/\*/g, '') : 'Smile360 dental care'}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}

            {statValue && (
              <div className="absolute bottom-5 left-5 rounded-2xl bg-card px-5 py-3.5 ring-1 ring-border">
                <p className="font-semibold text-2xl leading-none text-foreground">{statValue}</p>
                {statLabel && (
                  <p className="mt-1.5 text-xs leading-tight text-muted-foreground">{statLabel}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={cn('max-w-xl', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

          {heading && (
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-normal text-foreground sm:text-5xl">
              {emphasize(heading)}
            </h2>
          )}

          {body && (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
          )}

          {specs.length > 0 && <SpecList items={specs} className="mt-8" />}

          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {primaryCta && (
                <Link href={resolveHref(primaryCta)} className={buttonPrimary}>
                  <ButtonLabel>{primaryCta.label}</ButtonLabel>
                </Link>
              )}
              {secondaryCta && (
                <Link href={resolveHref(secondaryCta)} className={buttonSecondary}>
                  <ButtonLabel>{secondaryCta.label}</ButtonLabel>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
