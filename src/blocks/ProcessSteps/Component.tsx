import React from 'react'

import type { ProcessBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'

export const ProcessBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  align,
  steps,
  background,
}) => {
  const list = steps || []
  return (
    <Section tone={(background as 'default') || 'default'}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((step, i) => (
            <li key={i} className="relative rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-full bg-brand text-lg font-semibold text-brand-foreground">
                {i + 1}
              </span>
              {i < list.length - 1 && (
                <span className="absolute right-0 top-11 hidden h-px w-6 translate-x-full bg-border lg:block" />
              )}
              <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
              {step.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
