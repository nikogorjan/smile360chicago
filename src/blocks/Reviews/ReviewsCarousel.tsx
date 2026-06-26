'use client'

import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'

import { Eyebrow, Section, cardSurface } from '@/components/site/primitives'
import { practice } from '@/lib/practice'
import { getPatientPhoto } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

type Review = {
  author: string
  rating: number
  quote: string
  treatment: string
  source: string
}

export const ReviewsCarousel: React.FC<{
  eyebrow?: string
  heading?: string
  description?: string
  reviews: Review[]
}> = ({ eyebrow, heading, description, reviews }) => {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 372, behavior: 'smooth' })

  return (
    <Section>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-4 text-4xl leading-[1.03] tracking-normal text-foreground sm:text-5xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous reviews"
              className="grid size-11 place-items-center rounded-sm border border-border text-foreground transition-colors hover:border-foreground/30"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="More reviews"
              className="grid size-11 place-items-center rounded-sm border border-border text-foreground transition-colors hover:border-foreground/30"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* rating stat card — white surface, cobalt as accent only */}
          <div
            className={cn(
              cardSurface,
              'flex w-[280px] shrink-0 snap-start flex-col justify-between p-7 sm:w-[320px]',
            )}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-gold text-gold" />
              ))}
            </div>
            <div>
              <p className="text-6xl font-semibold tracking-tight text-brand">
                {practice.rating.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                from {practice.rating.count}+ Google reviews
              </p>
            </div>
          </div>

          {reviews.map((t, i) => (
            <figure
              key={t.author}
              className={cn(cardSurface, 'flex w-[280px] shrink-0 snap-start flex-col p-7 sm:w-[320px]')}
            >
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={cn('size-4', j < t.rating ? 'fill-gold text-gold' : 'text-muted-foreground/30')}
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={getPatientPhoto(i)}
                    alt={t.author}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{t.author}</span>
                  <span className="block text-xs text-muted-foreground">
                    {t.treatment} · {t.source}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}
