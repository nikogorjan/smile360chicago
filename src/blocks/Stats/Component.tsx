import React from 'react'

import type { StatsBlock as Props } from '@/payload-types'
import { stats as fallback } from '@/lib/practice'
import { Section, SectionHeading } from '@/components/site/primitives'
import { StatsGrid } from './StatsGrid'

export const StatsBlock: React.FC<Props> = ({ items }) => {
  const mapped = (items || []).map((i) => ({ value: i.value, label: i.label }))
  const stats = mapped.length ? mapped : fallback

  return (
    <Section>
      <div className="container">
        <SectionHeading
          align="center"
          className="max-w-xl"
          eyebrow="By the numbers"
          title="Chicago keeps smiling with us"
          description="Fifteen years, twenty thousand smiles, and a five-star reputation built one gentle visit at a time."
        />

        <StatsGrid stats={stats} />
      </div>
    </Section>
  )
}
