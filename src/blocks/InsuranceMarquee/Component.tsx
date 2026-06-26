import React from 'react'

import type { InsuranceBlock as Props } from '@/payload-types'
import { insurance as fallback } from '@/lib/practice'
import { Section, Eyebrow } from '@/components/site/primitives'

const Chip: React.FC<{ name: string }> = ({ name }) => (
  <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground">
    {name}
  </span>
)

export const InsuranceBlock: React.FC<Props> = ({ heading, plans }) => {
  const names = plans?.length ? plans.map((p) => p.name || '').filter(Boolean) : fallback
  if (!names.length) return null

  return (
    <Section tone="cream" className="py-14 sm:py-16 lg:py-20">
      <div className="container flex flex-col items-center text-center">
        <Eyebrow>In-network &amp; billing</Eyebrow>
        <h2 className="mt-5 text-pretty text-2xl leading-tight tracking-normal text-foreground sm:text-3xl">
          {heading || 'We accept most major dental plans'}
        </h2>
      </div>

      {/* Infinite seamless marquee: the list is rendered twice inside one flex
          track. The animate-marquee keyframe translates the track by -50%, so
          the duplicated (aria-hidden) copy slides in perfectly behind the
          first, producing a continuous loop. Pauses on hover. */}
      <div className="mt-10 overflow-hidden">
        <div className="flex w-max items-center gap-3 animate-marquee hover:[animation-play-state:paused]">
          {names.map((name, i) => (
            <Chip key={`a-${i}`} name={name} />
          ))}
          {names.map((name, i) => (
            <span key={`b-${i}`} aria-hidden="true" className="contents">
              <Chip name={name} />
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
