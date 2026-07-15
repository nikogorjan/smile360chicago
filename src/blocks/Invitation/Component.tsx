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
 * A warm closing invitation, reimagined as an immersive location card: a white "contact"
 * panel (headline, address / hours / phone, CTAs) sits flush against a large live map (or
 * photo), with a glass "Get directions" chip that links straight into Google Maps. It's a
 * two-column grid on desktop — the panel's own height (content + even padding on every side)
 * sets the row height and the map stretches to match — and stacks (map over panel) on mobile.
 * The panel is always light (self-contained), so section surface only affects the band around
 * the card.
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
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const hasImage = image && typeof image !== 'string'
  // The panel is always on a white card, so render the accent in brand (not inverted).
  const headingEl = renderRichHeading(heading, false)
  // This block draws its own card (the map frame), so the white "panel" surface would double
  // up and squeeze it (especially on mobile) — sit on the open canvas instead. Coloured bands
  // (brand / muted) still pass through for anyone who wants one behind the card.
  const shellSurface = surface === 'panel' ? 'canvas' : surface
  const detailList = details || []
  const primary = links?.[0]?.link
  const secondary = links?.[1]?.link
  const directionsHref = mapAddress
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapAddress)}`
    : null

  return (
    <SectionShell surface={shellSurface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="overflow-hidden rounded-[8px] border border-border bg-card shadow-[0_24px_70px_-40px_rgb(0_0_0/0.5)]">
        <div className="grid lg:grid-cols-[25rem_1fr]">
          {/* Contact panel — below the map on mobile, a flush left column on desktop. Its own
              height (content + even padding on every side) sets the row height; the map matches it. */}
          <div className="order-2 flex flex-col justify-center bg-card p-6 sm:p-8 lg:order-1 lg:p-10">
            {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}

            {headingEl && (
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl">
                {headingEl}
              </h2>
            )}

            {body && <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">{body}</p>}

            {detailList.length > 0 && (
              <ul className="mt-7">
                {detailList.map((d, i) => (
                  <li
                    key={i}
                    className={cn('flex items-center gap-4 py-3.5', i > 0 && 'border-t border-border/60')}
                  >
                    {d.icon && (
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                        <DynamicIcon name={d.icon} className="size-4" />
                      </span>
                    )}
                    <div className="min-w-0">
                      {d.label && (
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {d.label}
                        </p>
                      )}
                      {d.value && <p className="text-[0.95rem] font-medium leading-snug text-foreground">{d.value}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {(primary || secondary) && (
              <div className="mt-7 flex flex-wrap items-center gap-3">
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

          {/* Map (or photo) — top on mobile, right on desktop; stretches to the panel's height */}
          <div className="relative order-1 h-[440px] sm:h-[520px] lg:order-2 lg:h-auto lg:min-h-[420px]">
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

            {/* Functional glass "Get directions" chip, top-right over the map */}
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
        </div>
      </div>
    </SectionShell>
  )
}
