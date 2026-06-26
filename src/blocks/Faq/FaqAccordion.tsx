'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import { Section, SectionHeading, buttonPrimary } from '@/components/site/primitives'
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
}> = ({
  items,
  eyebrow = 'Good to know',
  heading = 'Frequently asked questions',
  description = 'Can’t find your answer? We’re happy to help — give us a call.',
  phone,
  phoneHref,
  tone = 'default',
}) => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section tone={tone}>
      <div className="container grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow={eyebrow}
            title={heading}
            description={description}
          />
          {phone && phoneHref && (
            <Link href={phoneHref} className={cn(buttonPrimary, 'mt-8')}>
              Call {phone}
            </Link>
          )}
        </div>

        <div>
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.question} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-foreground sm:text-lg">
                    {f.question}
                  </span>
                  <ChevronDown
                    className={
                      'size-5 shrink-0 text-muted-foreground transition-transform duration-300 ' +
                      (isOpen ? 'rotate-180' : '')
                    }
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-prose pb-7 pr-10 text-base leading-relaxed text-muted-foreground">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
