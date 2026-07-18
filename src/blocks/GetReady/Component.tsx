import Link from 'next/link'
import React from 'react'

import type { GetReadyBlock as Props } from '@/payload-types'
import { DynamicIcon, Eyebrow, buttonPrimary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const GetReadyBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  columns,
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

      {cols.length > 0 && (
        <div className={cn('mt-12 grid gap-6', cols.length > 1 ? 'lg:grid-cols-2' : 'max-w-2xl')}>
          {cols.map((col, i) => {
            const hot = !!col.highlight
            const items = col.items || []
            return (
              <div
                key={i}
                className={cn(
                  'flex flex-col rounded-[8px] border p-6 sm:p-8',
                  hot ? 'border-brand/30 bg-brand-soft' : 'border-border bg-card',
                )}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-sm',
                      hot ? 'bg-brand text-white' : 'bg-brand/10 text-brand',
                    )}
                  >
                    <DynamicIcon name={col.icon || 'ClipboardList'} className="size-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground">{col.title}</h3>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm bg-brand/10 text-brand">
                        <DynamicIcon name="Check" className="size-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/85 sm:text-[0.95rem]">{it.text}</span>
                    </li>
                  ))}
                </ul>

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
