import React from 'react'

import type { InsuranceBlock as Props } from '@/payload-types'
import { insurance as fallback } from '@/lib/practice'

const Chip: React.FC<{ name: string }> = ({ name }) => (
  <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-muted-foreground">
    {name}
  </span>
)

export const InsuranceBlock: React.FC<Props> = ({ heading, plans }) => {
  const names = plans?.length ? plans.map((p) => p.name || '').filter(Boolean) : fallback
  if (!names.length) return null

  // Repeat the list so one "group" is wider than any viewport, then render the
  // group twice and slide the track by exactly one group (-50%) → seamless loop.
  const reps = Math.max(3, Math.ceil(24 / names.length))
  const group = Array.from({ length: reps }).flatMap(() => names)

  return (
    <section className="border-b border-border py-8">
      {heading && (
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {heading}
          </p>
        </div>
      )}
      <div className="relative mt-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee">
          <ul className="flex shrink-0 items-center gap-4 pr-4">
            {group.map((name, i) => (
              <li key={`a-${i}`}>
                <Chip name={name} />
              </li>
            ))}
          </ul>
          <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden="true">
            {group.map((name, i) => (
              <li key={`b-${i}`}>
                <Chip name={name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
