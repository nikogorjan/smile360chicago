import Link from 'next/link'
import React from 'react'

import type { InvitationBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow, buttonPrimary, buttonSecondary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

/**
 * Closing invitation, hero-style (mirrors the New Patients hero): two panels sharing an
 * even 16px frame. The white contact card (NAP, hours, CTAs) fills the LEFT half — inset
 * 16px top/bottom, left-aligned to the container edge (it stops inside the wrapper). The
 * live map (or photo) fills the RIGHT half as the section backdrop — inset 16px on
 * top/right/bottom and bleeding to the viewport edge. The gap between them is the same
 * 16px. Stacks on mobile (card, then map).
 */
export const InvitationBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  body,
  details,
  image,
  mapAddress,
  links,
  surface,
  bottomGap,
}) => {
  const hasImage = image && typeof image !== 'string'
  // The contact card is always white, so render the accent in brand (not inverted).
  const headingEl = renderRichHeading(heading, false)
  // 'panel' would double up the card frame; sit on the open canvas instead.
  const shellSurface = surface === 'panel' ? 'canvas' : surface
  const detailList = details || []
  const primary = links?.[0]?.link
  const secondary = links?.[1]?.link
  const directionsHref = mapAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapAddress)}`
    : null

  // The map / photo, filling whatever frame it's given, with a "Get directions" chip.
  // The border/rounding are passed in by the caller: the desktop backdrop rounds all four
  // corners, while the mobile map sits flush inside the card (the card clips its corners).
  const mapFrame = (className: string) => (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {mapAddress ? (
        <iframe
          title="Practice location map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : hasImage ? (
        <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
          <DynamicIcon name="MapPin" className="size-10 opacity-40" />
        </div>
      )}

      {directionsHref && (
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-sm font-semibold text-foreground shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
        >
          <DynamicIcon name="Navigation" className="size-3.5 text-brand" />
          Get directions
        </a>
      )}
    </div>
  )

  return (
    <SectionShell
      surface={shellSurface}
      // The 16px frame is built here (the outer div + the backdrop's p-4), not from the
      // section's own top/bottom padding — otherwise the card would sit inset far more than
      // the map's 16px. So the section itself carries no vertical padding.
      paddingTop="none"
      paddingBottom="none"
      bottomGap={bottomGap}
      // The block above is usually a white `panel`, which carries ~56px of outer bottom
      // padding beneath its card. On desktop that would stack on top of the map's own 16px
      // inset, making the top gap look far bigger than the right/bottom. Pull the section up
      // to absorb it, so both panels read with an even ~16px frame on all sides (like the hero).
      className="lg:-mt-14"
      // Desktop map — fills the right half, inset 16px on top/right/bottom, bleeding to the edge.
      backdrop={
        <div className="absolute inset-y-0 right-0 hidden w-1/2 p-3 sm:p-4 lg:block">
          {mapFrame('h-full rounded-[8px] border border-border')}
        </div>
      }
    >
      {/* Left half — on desktop the contact card mirrors the map (16px frame from this
          wrapper's py-4, left-aligned inside the container). On mobile the card widens to the
          panel width (negative margins cancel the container gutter down to the panels' inset)
          and the map sits flush inside it as one connected panel — no gap between the two. */}
      <div className="-mx-3 py-4 sm:-mx-2 md:-mx-4 lg:mx-0 lg:w-1/2 lg:py-4">
        <div className="overflow-hidden rounded-[8px] border border-border bg-card lg:flex lg:min-h-128 lg:flex-col lg:justify-center">
          <div className="p-6 sm:p-8">
            {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}

          {headingEl && (
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl">
              {headingEl}
            </h2>
          )}

          {body && (
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
              {body}
            </p>
          )}

          {detailList.length > 0 && (
            <ul className="mt-6 max-w-md">
              {detailList.map((d, i) => (
                <li
                  key={i}
                  className={cn('flex items-center gap-4 py-3.5', i > 0 && 'border-t border-border/60')}
                >
                  {d.icon && (
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-brand/10 text-brand">
                      <DynamicIcon name={d.icon} className="size-4" />
                    </span>
                  )}
                  <div className="min-w-0">
                    {d.label && (
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {d.label}
                      </p>
                    )}
                    {d.value && (
                      <p className="text-[0.95rem] font-medium leading-snug text-foreground">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {(primary || secondary) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
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

          {/* Mobile map — flush at the bottom of the card, no gap (desktop uses the backdrop) */}
          <div className="lg:hidden">{mapFrame('aspect-4/3')}</div>
        </div>
      </div>
    </SectionShell>
  )
}
