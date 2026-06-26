import React from 'react'

import type { StatsBlock as Props } from '@/payload-types'
import { stats as fallback } from '@/lib/practice'
import { Section, SectionHeading } from '@/components/site/primitives'
import { StatsGrid } from './StatsGrid'

export const StatsBlock: React.FC<Props> = ({ items }) => {
  const mapped = (items || []).map((i) => ({ value: i.value, label: i.label }))
  const stats = mapped.length ? mapped : fallback

  return (
    <Section className="relative isolate">
      {/* Bridge from the dark hero — a soft cobalt-tinted fade at the top so the
          section doesn't jump straight from the dark video to flat gray. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-foreground/5 to-transparent"
      />

      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="By the numbers"
          title="Chicago keeps smiling with us"
          description="Fifteen years, twenty thousand smiles, and a five-star reputation built one gentle visit at a time."
        />

        <StatsGrid stats={stats} />
      </div>
    </Section>
  )
}
