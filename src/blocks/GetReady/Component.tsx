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
      <div className="flex items-center gap-3.5">
        <span
          className={cn(
            'grid size-11 shrink-0 place-items-center rounded-sm',
            hot ? 'bg-brand text-white' : 'bg-brand/10 text-brand',
          )}
        >
          <DynamicIcon name={col.icon || 'ClipboardList'} className="size-5" />
        </span>
        <h3 className="font-display text-xl font-bold tracking-tight text-foreground">{col.title}</h3>
      </div>

      <ul className="mt-6 divide-y divide-border/70">
        {items.map((it, j) => (
          <li key={j} className="flex items-center gap-4 py-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
              <DynamicIcon name="Check" className="size-4" />
            </span>
            <span className="text-base font-medium leading-snug text-foreground">{it.text}</span>
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
  topGap,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const cols = columns || []
  const cta = links?.[0]?.link
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'

  // Header + checklist — the copy column shared by both layouts.
  const copy = (
    <>
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

      {cols.length > 0 && (
        <div className="mt-9 flex flex-col gap-10">
          {cols.map((col, i) => (
            <Checklist key={i} col={col} />
          ))}
        </div>
      )}

      {cta && (
        <div className="mt-8">
          <Link href={resolveHref(cta)} className={buttonPrimary}>
            <ButtonLabel>{cta.label}</ButtonLabel>
          </Link>
        </div>
      )}
    </>
  )

  // With a photo: it bleeds to the viewport edge (rounded, small even inset) with the copy
  // beside it — the same premium split as the hero and the "Come say hi" block. No card, no
  // shadow. Stacks on mobile (copy, then a full-width photo).
  if (hasImage) {
    const photo = (className: string) => (
      <div className={cn('relative overflow-hidden rounded-[8px] border border-border bg-muted', className)}>
        <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
      </div>
    )

    return (
      <SectionShell
        surface={surface}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        topGap={topGap} bottomGap={bottomGap}
        // The block above is a white `panel` (~56px of outer bottom padding); on desktop that
        // stacks on top of the photo's own 16px inset, making the top gap read bigger than the
        // right/bottom. Pull the section up to absorb it, so the photo has an even 16px frame.
        //
        // `max-lg:pb-0` — on desktop the backdrop photo spans inset-y-0, so it covers the
        // section's bottom padding and the gap to the next block is just the photo's 16px
        // inset. Below lg the photo drops into the flow, so that padding would read as extra
        // gap; zero it and let the photo's own bottom inset (below) match the desktop frame.
        className="max-lg:pb-0 lg:-mt-14"
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
        <div
          className={cn(
            'flex max-w-xl flex-col justify-center lg:min-h-128 lg:max-w-[min(36rem,calc(50%-4rem))]',
            imageLeft ? 'lg:ml-auto' : 'lg:mr-auto',
          )}
        >
          {copy}
        </div>

        {/* Mobile photo — full-bleed below the copy, pulled out of the capped copy column so it
            spans the full width (desktop uses the backdrop). */}
        <div className="mt-8 -mx-6 px-3 pb-3 sm:px-4 sm:pb-4 md:-mx-8 lg:hidden">
          {photo('aspect-4/3')}
        </div>
      </SectionShell>
    )
  }

  // No photo → a centered header over the clean card grid.
  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} topGap={topGap} bottomGap={bottomGap}>
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

      {cols.length > 0 && (
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
      )}
    </SectionShell>
  )
}
