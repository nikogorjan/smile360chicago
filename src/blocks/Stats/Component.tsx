import React from 'react'

import type { StatsBlock as Props } from '@/payload-types'
import { stats as fallback } from '@/lib/practice'
import { Section, SectionHeading } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

export const StatsBlock: React.FC<Props> = ({ items }) => {
  const mapped = (items || []).map((i) => ({ value: i.value, label: i.label }))
  const stats = mapped.length ? mapped : fallback

  return (
    <Section>
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="By the numbers"
          title="Chicago keeps smiling with us"
          description="Fifteen years, twenty thousand smiles, and a five-star reputation built one gentle visit at a time."
        />

        <div className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'flex flex-col items-center px-4 text-center lg:px-8',
                i % 2 === 0 ? 'border-r border-border lg:border-r-0' : '',
                i % 4 === 0 ? 'lg:border-l-0' : 'lg:border-l lg:border-border',
              )}
            >
              <p className="text-5xl font-bold leading-none tracking-tight text-foreground md:text-6xl">
                {s.value}
              </p>
              <p className="mt-4 max-w-[12rem] text-sm font-medium leading-snug text-muted-foreground sm:text-base">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
