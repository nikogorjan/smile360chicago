import Link from 'next/link'
import React from 'react'

import type { GetReadyBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow, buttonPrimary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

type Column = NonNullable<Props['columns']>[number]

/** A single checklist — icon + title + check items on hairline-divided rows. */
const Checklist: React.FC<{ col: Column; hot?: boolean }> = ({ col, hot }) => {
  const items = col.items || []
  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'grid size-12 shrink-0 place-items-center rounded-sm',
            hot ? 'bg-brand text-white' : 'bg-brand/10 text-brand',
          )}
        >
          <DynamicIcon name={col.icon || 'ClipboardList'} className="size-6" />
        </span>
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">{col.title}</h3>
      </div>

      <ul className="mt-7 divide-y divide-border/70">
        {items.map((it, j) => (
          <li key={j} className="flex items-center gap-4 py-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
              <DynamicIcon name="Check" className="size-4" />
            </span>
            <span className="text-base font-medium leading-snug text-foreground sm:text-lg">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const GetReadyBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  columns,
  image,
  imageSide,
  links,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const cols = columns || []
  const cta = links?.[0]?.link
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="max-w-2xl">
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

        {intro && (
          <p className={cn('mt-4 text-base leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
            {intro}
          </p>
        )}
      </div>

      {hasImage && cols.length > 0 ? (
        /* Split card — the checklist on one side, a photo filling the other so it never
           feels empty. The photo cell stretches to the checklist's height on desktop. */
        <div className="mt-10 grid overflow-hidden rounded-[8px] border border-border bg-card shadow-[0_28px_70px_-52px_rgb(0_0_0/0.45)] lg:mt-12 lg:grid-cols-2">
          {/* Checklist — first in the DOM (reading order); positioned by `order` on desktop */}
          <div
            className={cn(
              'flex flex-col justify-center gap-9 p-8 sm:p-10 lg:p-12',
              imageLeft ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {cols.map((col, i) => (
              <Checklist key={i} col={col} />
            ))}

            {cta && (
              <div>
                <Link href={resolveHref(cta)} className={buttonPrimary}>
                  <ButtonLabel>{cta.label}</ButtonLabel>
                </Link>
              </div>
            )}
          </div>

          {/* Photo — a fixed ratio on mobile, stretched to fill the card height on desktop */}
          <div
            className={cn(
              'relative aspect-16/10 sm:aspect-2/1 lg:aspect-auto',
              imageLeft ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
          </div>
        </div>
      ) : cols.length > 0 ? (
        /* No image → the original clean card grid (one or two columns). */
        <div className={cn('mt-12 grid gap-6', cols.length > 1 ? 'lg:grid-cols-2' : 'max-w-2xl')}>
          {cols.map((col, i) => {
            const hot = !!col.highlight
            return (
              <div
                key={i}
                className={cn(
                  'flex flex-col rounded-[8px] border p-6 sm:p-8',
                  hot ? 'border-brand/30 bg-brand-soft' : 'border-border bg-card',
                )}
              >
                <Checklist col={col} hot={hot} />

                {hot && cta && (
                  <div className="mt-7">
                    <Link href={resolveHref(cta)} className={buttonPrimary}>
                      <ButtonLabel>{cta.label}</ButtonLabel>
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : null}
    </SectionShell>
  )
}
