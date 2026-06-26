'use client'

import { Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/site/primitives'
import type { Faq as FaqType } from '@/lib/practice'

export const Faq: React.FC<{
  items: FaqType[]
  eyebrow?: string
  heading?: string
  description?: string
  phone?: string
  phoneHref?: string
  tone?: 'default' | 'muted' | 'brand' | 'glow'
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
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading align="left" eyebrow={eyebrow} title={heading} description={description} />
          {phone && phoneHref && (
            <Link
              href={phoneHref}
              className={buttonVariants({ variant: 'outline', className: 'mt-6 font-bold' })}
            >
              Call {phone}
            </Link>
          )}
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-bold text-foreground">{f.question}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
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
