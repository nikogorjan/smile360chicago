import { Check, Star, X } from 'lucide-react'
import React from 'react'

import type { ComparisonBlock as Props } from '@/payload-types'
import { Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

/**
 * "Why Smile360" comparison. Desktop: the criterion + "the usual" columns are plain,
 * hairline-separated, while the "ours" column is an elevated cobalt card floating over
 * them (gold star + gold checks) — so the blue reads as a deliberate highlight, not a
 * bordered cell fighting the grid. Mobile: stacked cards.
 */
export const ComparisonBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  ourLabel,
  theirLabel,
  rows,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const list = rows || []
  const ours = ourLabel || 'At Smile360'
  const theirs = theirLabel || 'The usual dental visit'
  if (!list.length) return null

  return (
    <SectionShell
      surface={surface}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      bottomGap={bottomGap}
    >
      <div className="mx-auto max-w-2xl text-center">
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
          <p
            className={cn(
              'mx-auto mt-4 max-w-xl text-base leading-relaxed',
              invert ? 'text-white/80' : 'text-muted-foreground',
            )}
          >
            {intro}
          </p>
        )}
      </div>

      {/* Desktop — a grounded, full-width white panel with an elevated cobalt "ours" pill */}
      <div className="mt-12 hidden md:block">
        <div className="rounded-[16px] border border-border bg-card p-3 shadow-[0_30px_70px_-40px_rgb(0_0_0/0.35)]">
          <div className="relative grid grid-cols-[1.2fr_1fr_1fr] gap-x-3">
            {/* Elevated cobalt highlight pill behind the "ours" column */}
            <div
              aria-hidden
              className="rounded-[10px] bg-primary shadow-[0_22px_45px_-22px_rgb(0_72_180/0.55)]"
              style={{ gridColumn: 2, gridRow: `1 / span ${list.length + 1}` }}
            />

            {/* Header */}
            <div style={{ gridColumn: 1, gridRow: 1 }} />
            <div
              className="relative z-10 flex flex-col items-center gap-2 px-5 pb-5 pt-7 text-center"
              style={{ gridColumn: 2, gridRow: 1 }}
            >
              <Star className="size-6 fill-gold text-gold" />
              <span className="text-lg font-bold uppercase tracking-wide text-white">{ours}</span>
            </div>
            <div
              className="flex flex-col items-center gap-2 px-5 pb-5 pt-7 text-center"
              style={{ gridColumn: 3, gridRow: 1 }}
            >
              <Star className="size-6 text-muted-foreground/40" />
              <span className="text-lg font-semibold text-muted-foreground">{theirs}</span>
            </div>

            {/* Rows */}
            {list.map((r, i) => {
              const row = i + 2
              return (
                <React.Fragment key={i}>
                  <div
                    className="flex items-center border-t border-border py-5 px-6 text-lg font-semibold text-foreground"
                    style={{ gridColumn: 1, gridRow: row }}
                  >
                    {r.label}
                  </div>
                  <div
                    className="relative z-10 flex items-start gap-3 px-6 py-5"
                    style={{ gridColumn: 2, gridRow: row }}
                  >
                    <Check className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={2.75} />
                    <span className="text-lg font-medium leading-relaxed text-white">{r.ours}</span>
                  </div>
                  <div
                    className="flex items-start gap-3 border-t border-border px-6 py-5 text-muted-foreground"
                    style={{ gridColumn: 3, gridRow: row }}
                  >
                    <X className="mt-0.5 size-5 shrink-0 text-muted-foreground/40" />
                    <span className="text-lg leading-relaxed">{r.theirs}</span>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile — stacked cards */}
      <div className="mx-auto mt-10 max-w-md space-y-4 md:hidden">
        {list.map((r, i) => (
          <div key={i} className="rounded-[8px] border border-border bg-card p-5">
            <p className="text-base font-semibold text-foreground">{r.label}</p>
            <div className="mt-3 flex items-start gap-2.5 rounded-sm bg-primary px-3.5 py-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={2.75} />
              <span className="text-sm text-white">
                <span className="font-semibold">{ours}: </span>
                {r.ours}
              </span>
            </div>
            <div className="mt-2 flex items-start gap-2.5 px-3.5 py-1.5">
              <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
              <span className="text-sm text-muted-foreground">
                <span className="font-medium">{theirs}: </span>
                {r.theirs}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
