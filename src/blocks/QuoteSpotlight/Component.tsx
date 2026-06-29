import { Star } from 'lucide-react'
import React from 'react'

import type { QuoteBlock as Props } from '@/payload-types'
import { Section } from '@/components/site/primitives'
import { practice } from '@/lib/practice'

export const QuoteBlock: React.FC<Props> = ({ quote, author, role, rating }) => {
  const stars = rating || 5

  return (
    <Section tone="cream">
      <div className="container">
        <div className="grid items-stretch gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Cobalt stat card */}
          <div className="flex flex-col justify-between gap-8 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="flex gap-1" aria-label={`${stars} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < stars ? 'size-5 fill-gold text-gold' : 'size-5 text-white/25'}
                />
              ))}
            </div>
            <div>
              <p className="font-semibold text-6xl leading-none tracking-tight">
                {practice.rating.value}
              </p>
              <p className="mt-3 text-sm text-white/70">
                from {practice.rating.count}+ Google reviews
              </p>
            </div>
          </div>

          {/* Quote */}
          <figure className="relative flex flex-col justify-center rounded-3xl bg-card px-8 py-12 ring-1 ring-border sm:px-12">
            <span
              aria-hidden
              className="pointer-events-none absolute left-8 top-4 select-none font-semibold text-[7rem] leading-none text-primary/10 sm:left-10"
            >
              &ldquo;
            </span>
            <blockquote className="relative font-semibold text-2xl leading-snug tracking-tight text-foreground sm:text-3xl lg:text-[2.25rem] lg:leading-[1.2]">
              {quote}
            </blockquote>
            {(author || role) && (
              <figcaption className="mt-8 text-sm">
                {author && <span className="font-semibold text-foreground">{author}</span>}
                {role && <span className="text-muted-foreground"> · {role}</span>}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </Section>
  )
}
