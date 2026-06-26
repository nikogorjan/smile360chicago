'use client'

import { ArrowRight, Check } from 'lucide-react'
import React, { useState } from 'react'

import type { TabsBlock as Props } from '@/payload-types'
import { DynamicIcon, Section, SectionHeading, cardSurface } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

export const TabsBlock: React.FC<Props> = ({ eyebrow, heading, description, align, tabs }) => {
  const [active, setActive] = useState(0)
  const list = tabs || []
  const a = list[active] || list[0]

  if (!list.length) return null

  return (
    <Section>
      <div className="container">
        <SectionHeading
          align={align === 'left' ? 'left' : 'center'}
          eyebrow={eyebrow || undefined}
          title={heading || ''}
          description={description || undefined}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
          {/* Tab selector — horizontal pills on mobile, ruled vertical list on lg */}
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {list.map((t, i) => {
              const on = i === active
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={cn(
                    'flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors',
                    'lg:w-full lg:shrink lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-t lg:border-t-border lg:border-l-2 lg:border-l-transparent lg:py-5 lg:pl-5 lg:text-lg',
                    on
                      ? 'border-primary bg-primary text-primary-foreground lg:bg-transparent lg:border-l-primary lg:text-brand'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t.icon && (
                    <span
                      className={cn(
                        'hidden size-10 shrink-0 place-items-center rounded-full lg:grid',
                        on ? 'bg-primary/10 text-brand' : 'bg-foreground/5 text-muted-foreground',
                      )}
                    >
                      <DynamicIcon name={t.icon} className="size-5" />
                    </span>
                  )}
                  <span className="lg:font-semibold">{t.label}</span>
                  <ArrowRight
                    className={cn('ml-auto hidden size-5 lg:block', on ? 'text-brand' : 'text-transparent')}
                  />
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          {a && (
            <div className={cn(cardSurface, 'p-8 lg:p-12')}>
              <p className="font-display font-semibold text-3xl tracking-tight text-foreground sm:text-4xl">{a.title}</p>
              {a.body && (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {a.body}
                </p>
              )}
              {a.bullets && a.bullets.length > 0 && (
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {a.bullets.map((b, i) => (
                    <li key={b.id || i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-brand">
                        <Check className="size-3" />
                      </span>
                      <span className="text-sm leading-snug text-foreground">{b.item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {a.stat && (
                <div className="mt-9 flex items-baseline gap-3 border-t border-border pt-6">
                  <span className="font-semibold text-5xl tracking-tight text-foreground lg:text-6xl">
                    {a.stat}
                  </span>
                  {a.statLabel && <span className="text-sm text-muted-foreground">{a.statLabel}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
