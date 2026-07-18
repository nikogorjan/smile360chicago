import Link from 'next/link'
import React from 'react'

import type { CredentialsBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow, buttonPrimary } from '@/components/site/primitives'
import { ScrollParallax } from '@/components/site/ScrollParallax'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

/**
 * Credentials — a credential photo on one side, an icon checklist of qualifications /
 * certifications / memberships on the other. Stacks on mobile (photo first).
 */
export const CredentialsBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  lead,
  image,
  imageCaption,
  imageSide,
  credentials,
  links,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide !== 'right'
  const headingEl = renderRichHeading(heading, invert)
  const list = credentials || []
  const cta = links?.[0]?.link

  return (
    <SectionShell
      surface={surface}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      bottomGap={bottomGap}
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo */}
        <figure className={cn('relative m-0', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          {hasImage ? (
            <ScrollParallax className="aspect-[4/3] rounded-[8px] border border-border" amount={0.06}>
              <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
            </ScrollParallax>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-border bg-muted">
              <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
                <DynamicIcon name="Award" className="size-10 opacity-40" />
              </div>
            </div>
          )}
          {imageCaption && (
            <figcaption
              className={cn('mt-3 text-sm leading-relaxed', invert ? 'text-white/60' : 'text-muted-foreground')}
            >
              {imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Content */}
        <div className={cn('max-w-xl', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
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

          {lead && (
            <p className={cn('mt-4 text-base leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
              {lead}
            </p>
          )}

          {list.length > 0 && (
            <ul className="mt-8 space-y-5">
              {list.map((c, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className={cn(
                      'grid size-10 shrink-0 place-items-center rounded-sm',
                      invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                    )}
                  >
                    <DynamicIcon name={c.icon || 'BadgeCheck'} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className={cn('block font-semibold', invert ? 'text-white' : 'text-foreground')}>
                      {c.title}
                    </span>
                    {c.description && (
                      <span
                        className={cn(
                          'mt-0.5 block text-sm leading-relaxed',
                          invert ? 'text-white/70' : 'text-muted-foreground',
                        )}
                      >
                        {c.description}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
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
    </SectionShell>
  )
}
