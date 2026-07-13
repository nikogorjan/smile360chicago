import Link from 'next/link'
import React from 'react'

import type { InvitationBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow, buttonPrimary, buttonSecondary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

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
  const invert = surfaceInvert(surface)
  const hasImage = image && typeof image !== 'string'
  const headingEl = renderRichHeading(heading, invert)
  const detailList = details || []
  const primary = links?.[0]?.link
  const secondary = links?.[1]?.link

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
        <div className="max-w-xl">
          {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}

          {headingEl && (
            <h2
              className={cn(
                'mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {headingEl}
            </h2>
          )}

          {body && (
            <p className={cn('mt-5 text-lg leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
              {body}
            </p>
          )}

          {detailList.length > 0 && (
            <ul className="mt-8 space-y-4">
              {detailList.map((d, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  {d.icon && (
                    <span
                      className={cn(
                        'mt-0.5 grid size-9 shrink-0 place-items-center rounded-full',
                        invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                      )}
                    >
                      <DynamicIcon name={d.icon} className="size-4" />
                    </span>
                  )}
                  <div>
                    {d.label && (
                      <p
                        className={cn(
                          'text-xs font-semibold uppercase tracking-[0.14em]',
                          invert ? 'text-white/55' : 'text-muted-foreground',
                        )}
                      >
                        {d.label}
                      </p>
                    )}
                    {d.value && (
                      <p className={cn('text-base', invert ? 'text-white' : 'text-foreground')}>{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {(primary || secondary) && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
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

        {/* Live map, or fallback photo */}
        <div className="relative overflow-hidden rounded-[8px] border border-border">
          <div className="relative aspect-[4/3]">
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
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
