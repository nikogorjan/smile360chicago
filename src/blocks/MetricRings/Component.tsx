import React from 'react'

import type { MetricRingsBlock as Props } from '@/payload-types'
import { Eyebrow, Section, StatRing } from '@/components/site/primitives'
import { toneClasses } from '../_shared/tone'
import { withHighlight } from '../_shared/highlight'
import { cn } from '@/utilities/ui'

export const MetricRingsBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  highlight,
  description,
  metrics,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const { wrapper, invert } = toneClasses(background)
  const items = metrics || []

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} className={wrapper}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'} className="mb-3">{eyebrow}</Eyebrow>}
            {heading && (
              <h2
                className={cn(
                  'font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl',
                  invert ? 'text-white' : 'text-foreground',
                )}
              >
                {withHighlight(heading, highlight, invert ? 'text-white/60' : 'text-brand')}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  'mx-auto mt-4 max-w-2xl text-lg leading-relaxed',
                  invert ? 'text-white/75' : 'text-muted-foreground',
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {items.map((m, i) => (
            <StatRing
              key={i}
              value={m.value}
              label={m.label}
              percent={m.percent ?? 75}
              tone={invert ? 'dark' : 'light'}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
