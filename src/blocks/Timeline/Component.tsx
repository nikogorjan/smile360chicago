import React from 'react'

import type { TimelineBlock as Props } from '@/payload-types'
import { DynamicIcon, Section, SectionHeading } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

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
    <Section tone={background}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}

        <ol
          className={cn(
            'relative mt-16 grid gap-y-12',
            colClass[n] || 'lg:grid-cols-4',
            'lg:gap-x-10',
          )}
        >
          {/* mobile: vertical hairline connector */}
          <span
            className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-border lg:hidden"
            aria-hidden
          />
          {/* desktop: thin horizontal connector running node-center → node-center */}
          <span
            className="absolute top-6 hidden -translate-y-1/2 border-t border-border lg:block"
            style={{ left: inset, right: inset }}
            aria-hidden
          />

          {list.map((it, i) => (
            <li
              key={i}
              className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              {/* cobalt numbered node / icon chip */}
              <div className="relative z-10 lg:mb-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground ring-4 ring-background">
                  {it.icon ? (
                    <DynamicIcon name={it.icon} className="size-5" />
                  ) : (
                    <span className="text-sm">{i + 1}</span>
                  )}
                </span>
              </div>

              <div className="flex-1 lg:w-full lg:flex-none lg:px-2">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {it.title}
                </h3>
                {it.body && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
