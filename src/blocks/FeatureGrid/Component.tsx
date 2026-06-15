import React from 'react'

import type { FeatureGridBlock as Props } from '@/payload-types'
import { DynamicIcon, Section, SectionHeading } from '@/components/site/primitives'

export const FeatureGridBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  align,
  features,
  background,
}) => {
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
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {(features || []).map((f, i) => (
            <div key={i} className="group bg-card p-7 transition-colors hover:bg-secondary/50">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand transition-transform group-hover:scale-110">
                <DynamicIcon name={f.icon || 'Sparkles'} className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
              {f.body && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
