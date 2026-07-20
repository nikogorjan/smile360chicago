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
          <p
            className={cn(
              'mt-4 max-w-xl text-base leading-relaxed',
              invert ? 'text-white/80' : 'text-muted-foreground',
            )}
          >
            {intro}
          </p>
        )}
      </div>

      {/* One table for all sizes — full width on desktop; on mobile it stays a table
          and scrolls horizontally (rather than restacking into cards). */}
      <div className="mt-12 overflow-x-auto md:overflow-visible">
        <div className="min-w-152 md:min-w-0">
          <div className="rounded-[8px] border border-border bg-card p-2.5 md:p-3">
            <div className="relative grid grid-cols-[1.2fr_1fr_1fr] gap-x-2.5 md:gap-x-3">
              {/* Elevated cobalt highlight pill behind the "ours" column */}
              <div
                aria-hidden
                className="rounded-[8px] bg-primary"
                style={{ gridColumn: 2, gridRow: `1 / span ${list.length + 1}` }}
              />

              {/* Header */}
              <div style={{ gridColumn: 1, gridRow: 1 }} />
              <div
                className="relative z-10 flex flex-col items-center gap-1.5 px-4 pb-4 pt-5 text-center md:gap-2 md:px-5 md:pb-5 md:pt-7"
                style={{ gridColumn: 2, gridRow: 1 }}
              >
                <Star className="size-5 fill-gold text-gold md:size-6" />
                <span className="text-base font-bold uppercase tracking-wide text-white md:text-lg">
                  {ours}
                </span>
              </div>
              <div
                className="flex flex-col items-center gap-1.5 px-4 pb-4 pt-5 text-center md:gap-2 md:px-5 md:pb-5 md:pt-7"
                style={{ gridColumn: 3, gridRow: 1 }}
              >
                <Star className="size-5 text-muted-foreground/40 md:size-6" />
                <span className="text-base font-semibold text-muted-foreground md:text-lg">
                  {theirs}
                </span>
              </div>

              {/* Rows */}
              {list.map((r, i) => {
                const row = i + 2
                return (
                  <React.Fragment key={i}>
                    <div
                      className="flex items-center border-t border-border px-4 py-4 text-base font-semibold text-foreground md:px-6 md:py-5 md:text-lg"
                      style={{ gridColumn: 1, gridRow: row }}
                    >
                      {r.label}
                    </div>
                    <div
                      className="relative z-10 flex items-start gap-2.5 px-4 py-4 md:gap-3 md:px-6 md:py-5"
                      style={{ gridColumn: 2, gridRow: row }}
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-gold md:size-5" strokeWidth={2.75} />
                      <span className="text-base font-medium leading-relaxed text-white md:text-lg">
                        {r.ours}
                      </span>
                    </div>
                    <div
                      className="flex items-start gap-2.5 border-t border-border px-4 py-4 text-muted-foreground md:gap-3 md:px-6 md:py-5"
                      style={{ gridColumn: 3, gridRow: row }}
                    >
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/40 md:size-5" />
                      <span className="text-base leading-relaxed md:text-lg">{r.theirs}</span>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
