import React from 'react'

import type { InsuranceBlock as Props } from '@/payload-types'
import { insurance as fallback } from '@/lib/practice'
import { Section, Eyebrow } from '@/components/site/primitives'
import { InsuranceMarqueeTrack } from './InsuranceMarqueeTrack'

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

      <InsuranceMarqueeTrack names={names} />
    </Section>
  )
}
