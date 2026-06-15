import React from 'react'

import type { TimelineBlock as Props } from '@/payload-types'
import { DynamicIcon, Section, SectionHeading } from '@/components/site/primitives'

const colClass: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

export const TimelineBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  align,
  items,
  background,
}) => {
  const list = items || []
  const n = Math.min(list.length, 6) || 1
  // trim the desktop connector so it runs node-center → node-center
  const inset = `${50 / n}%`

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

        <ol className={`relative mt-14 grid gap-8 ${colClass[n] || 'lg:grid-cols-4'} lg:gap-6`}>
          {/* mobile: vertical connector */}
          <span className="absolute bottom-3 left-6 top-3 w-0.5 -translate-x-1/2 bg-border lg:hidden" />
          {/* desktop: horizontal connector */}
          <span
            className="absolute top-6 hidden h-0.5 -translate-y-1/2 bg-border lg:block"
            style={{ left: inset, right: inset }}
          />

          {list.map((it, i) => (
            <li
              key={i}
              className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              <span className="z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-background bg-brand text-brand-foreground lg:mb-5">
                {it.icon ? (
                  <DynamicIcon name={it.icon} className="size-5" />
                ) : (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}
              </span>

              <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm lg:w-full lg:flex-none">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand">
                  Step {i + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground">{it.title}</h3>
                {it.body && (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
