'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import { Section, SectionHeading, buttonPrimary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import type { Faq as FaqType } from '@/lib/practice'
import { cn } from '@/utilities/ui'

export const FaqAccordion: React.FC<{
  items: FaqType[]
  eyebrow?: string
  heading?: string
  description?: string
  phone?: string
  phoneHref?: string
  tone?: 'default' | 'muted' | 'cream'
  /** Render just the grid (no Section/container) for use inside a shared Panel. */
  bare?: boolean
}> = ({
  items,
  eyebrow = 'Good to know',
  heading = 'Frequently asked questions',
  description = 'Can’t find your answer? We’re happy to help — give us a call.',
  phone,
  phoneHref,
  tone = 'default',
  bare,
}) => {
  const [open, setOpen] = useState<number | null>(0)

  const grid = (
    <div
      className={cn(
        'grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20',
        !bare && 'container',
      )}
    >
      <div className="lg:sticky lg:top-28">
        <SectionHeading align="left" eyebrow={eyebrow} title={heading} description={description} />
        {phone && phoneHref && (
          <Link href={phoneHref} className={cn(buttonPrimary, 'mt-8')}>
            <ButtonLabel>Call {phone}</ButtonLabel>
          </Link>
        )}
      </div>

      <div>
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <div
              key={f.question}
              className={cn(
                // hairline divider + a left accent bar that activates when open; a
                // barely-there blue tint lifts the open row off the white. No layout
                // shift (the 2px bar is always present, just transparent when closed).
                'border-b border-l-2 border-border transition-colors duration-300 motion-reduce:transition-none',
                isOpen ? 'border-l-brand bg-brand/[0.04]' : 'border-l-transparent',
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between gap-6 rounded-sm py-5 pl-4 pr-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <span
                  className={cn(
                    'text-base font-semibold transition-colors duration-300 motion-reduce:transition-none sm:text-lg',
                    isOpen ? 'text-brand' : 'text-foreground',
                  )}
                >
                  {f.question}
                </span>
                {/* Chevron toggle — becomes the unified chip (light-blue fill, brand
                    glyph) when open; a plain lighter chevron when closed. */}
                <span
                  aria-hidden
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 motion-reduce:transition-none',
                    isOpen ? 'bg-brand/10 text-brand' : 'text-muted-foreground',
                  )}
                >
                  <ChevronDown
                    className={cn(
                      'size-5 transition-transform duration-300 motion-reduce:transition-none',
                      isOpen && 'rotate-180',
                    )}
                  />
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                className="grid transition-all duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-prose pb-7 pl-4 pr-10 text-base leading-relaxed text-muted-foreground">
                    {f.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  if (bare) return grid

  return <Section tone={tone}>{grid}</Section>
}
