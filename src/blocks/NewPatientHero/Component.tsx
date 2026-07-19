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
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'
  const headingEl = renderRichHeading(heading, invert)
  const chipList = chips || []
  const primary = links?.[0]?.link
  const secondary = links?.[1]?.link

  // The photo, filling whatever frame it's given (backdrop on lg, in-flow on mobile).
  const photo = (className: string) =>
    hasImage ? (
      <ScrollParallax className={cn('overflow-hidden rounded-[8px] border border-border', className)} amount={0.06}>
        <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
      </ScrollParallax>
    ) : (
      <div className={cn('relative overflow-hidden rounded-[8px] border border-border', className)}>
        <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
          <DynamicIcon name="Smile" className="size-10 opacity-40" />
        </div>
      </div>
    )

  return (
    <SectionShell
      surface={surface}
      paddingTop={paddingTop}
      // The desktop photo is a backdrop that bleeds to the section's bottom edge (16px inset),
      // so it *absorbs* any bottom padding — paddingBottom only ever showed as a big gap on
      // mobile (photo in-flow), never on desktop. Keep the section bottom at zero and give both
      // a matching small inset, so the gap reads the same; use "Gap below" (bottomGap) to
      // control the space to the next section consistently on mobile and desktop.
      paddingBottom="none"
      bottomGap={bottomGap}
      // Desktop photo — a full-height panel on one half, inset by the same small
      // padding on top/right/bottom (like the home/About hero), bleeding to the edge.
      backdrop={
        <div
          className={cn(
            'absolute inset-y-0 hidden w-1/2 p-3 sm:p-4 lg:block',
            imageLeft ? 'left-0' : 'right-0',
          )}
        >
          {photo('h-full')}
        </div>
      }
    >
      {/* Copy — kept in the container (aligned to the site edge) and vertically
          centred beside the photo. */}
      <div
        className={cn(
          // Cap the copy to the left half minus a gutter on lg so it never runs
          // under the photo (which starts at 50vw), while staying readable width.
          'flex max-w-xl flex-col justify-center lg:max-w-[min(36rem,calc(50%-4rem))] lg:min-h-128',
          imageLeft ? 'lg:ml-auto' : 'lg:mr-auto',
        )}
      >
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

      {/* Mobile photo — sits below the copy (desktop uses the backdrop). Pulled out of the
          copy column and the container gutter so it spans the full screen width, with just a
          small even inset — matching the desktop photo's edge bleed. */}
      <div className="mt-10 -mx-6 px-3 pb-3 sm:px-4 sm:pb-4 md:-mx-8 lg:hidden">{photo('aspect-[4/5]')}</div>
    </SectionShell>
  )
}
