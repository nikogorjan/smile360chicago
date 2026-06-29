import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { DentistFeatureBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow, Section, buttonPrimary, emphasize } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { getTeamPhoto } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

/**
 * Single-practitioner feature — mirrors the SplitFeature ("Care that actually feels
 * different") two-column language: a large plain portrait on one side with an optional
 * gold-star proof badge, and on the other side the eyebrow, serif heading, bio,
 * credential line, specialty pill chips, and a CTA. Stacks on mobile with the portrait
 * above. Fully CMS-editable.
 */
export const DentistFeatureBlock: React.FC<Props> = ({
  portrait,
  imageSide,
  eyebrow,
  heading,
  name,
  credentials,
  bio,
  quote,
  links,
  background,
}) => {
  const hasPortrait = portrait && typeof portrait !== 'string'
  const imageLeft = imageSide !== 'right' // default: portrait on the left
  const cta = links?.[0]?.link
  const credentialLine = [name, credentials].filter(Boolean).join(' · ')

  return (
    <Section tone={background}>
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Portrait — plain full-colour image (no blue tint, no hover effects) */}
        <div className={cn('relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-border bg-muted">
            {hasPortrait ? (
              <Media resource={portrait} fill imgClassName="object-cover" className="absolute inset-0" />
            ) : (
              <Image
                src={getTeamPhoto(0)}
                alt={name || 'Smile360 Chicago dentist'}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
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

          {bio && (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{bio}</p>
          )}

          {quote && (
            <blockquote className="mt-6 border-l-2 border-brand/40 pl-5 text-lg leading-relaxed text-foreground">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          {credentialLine && (
            <p className="mt-6 text-sm font-semibold text-foreground">{credentialLine}</p>
          )}

          {cta && (
            <div className="mt-8">
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
