'use client'

import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'

import { Eyebrow, Section, SectionHeading } from '@/components/site/primitives'
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
  videoUrl?: string
  videoEyebrow?: string
  videoHeading?: string
  videoDescription?: string
  videoText?: string
  paddingTop?: string
  paddingBottom?: string
  topGap?: string
  bottomGap?: string
}> = ({
  eyebrow,
  heading,
  description,
  reviews,
  videoUrl,
  videoEyebrow,
  videoHeading,
  videoDescription,
  videoText,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 372, behavior: 'smooth' })

  // Pull the numeric video id out of a full TikTok URL (…/video/123456…) or a bare id.
  const tiktokId =
    videoUrl?.match(/\/video\/(\d+)/)?.[1] ||
    (videoUrl && /^\d+$/.test(videoUrl.trim()) ? videoUrl.trim() : null)

  // Carousel prev/next control — the two arrows differ only in direction, so share one helper.
  const arrowBtn = (dir: number, label: string, Icon: typeof ArrowLeft) => (
    <button
      type="button"
      onClick={() => scroll(dir)}
      aria-label={label}
      className="group grid size-11 place-items-center overflow-hidden rounded-full bg-brand/10 text-brand transition-colors hover:bg-brand hover:text-white"
    >
      <Icon
        aria-hidden
        className={cn(
          'size-5 [grid-area:1/1] transition-transform duration-300 ease-out motion-reduce:transition-none',
          dir < 0 ? 'group-hover:-translate-x-[150%]' : 'group-hover:translate-x-[150%]',
        )}
      />
      <Icon
        aria-hidden
        className={cn(
          'size-5 [grid-area:1/1] transition-transform duration-300 ease-out motion-reduce:transition-none',
          dir < 0 ? 'translate-x-[150%] group-hover:translate-x-0' : '-translate-x-[150%] group-hover:translate-x-0',
        )}
      />
    </button>
  )

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} topGap={topGap} bottomGap={bottomGap}>
      <div className="container">
        {/* Featured TikTok video — a centred header, then a large pull-quote (founder-note
            style) beside the vertical video. Sits at the top of the section; renders only
            when a video URL is set. */}
        {tiktokId && (
          <div className="mx-auto max-w-4xl">
            {(videoEyebrow || videoHeading || videoDescription) && (
              <SectionHeading
                align="center"
                eyebrow={videoEyebrow}
                title={videoHeading || ''}
                description={videoDescription}
              />
            )}
            <div
              className={cn(
                'grid items-center gap-8 sm:grid-cols-[1fr_300px] sm:gap-12',
                (videoEyebrow || videoHeading || videoDescription) && 'mt-12',
              )}
            >
              <figure className="relative order-2 sm:order-1">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-1 -top-7 select-none font-display text-6xl leading-none text-brand/15"
                >
                  &ldquo;
                </span>
                {videoText && (
                  <blockquote className="relative pl-2 font-display text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {videoText}
                  </blockquote>
                )}
              </figure>
              <div className="order-1 mx-auto w-full max-w-[300px] overflow-hidden rounded-[8px] border border-border bg-black sm:order-2 sm:mx-0">
                <div className="relative aspect-[9/16]">
                  <iframe
                    src={`https://www.tiktok.com/player/v1/${tiktokId}`}
                    title="Patient video"
                    loading="lazy"
                    allow="fullscreen"
                    className="absolute inset-0 size-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews header — moved BELOW the video, directly above the cards. */}
        <div className={cn('max-w-2xl', tiktokId && 'mt-20')}>
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

        <div
          ref={ref}
          className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((t, i) => (
            <figure
              key={t.author}
              className="flex w-[280px] shrink-0 snap-start flex-col rounded-[6px] border border-border bg-card p-7 sm:w-[320px]"
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

        {/* Carousel controls — under the testimonials. */}
        {reviews.length > 1 && (
          <div className="mt-8 flex justify-end gap-2">
            {arrowBtn(-1, 'Previous reviews', ArrowLeft)}
            {arrowBtn(1, 'More reviews', ArrowRight)}
          </div>
        )}
      </div>
    </Section>
  )
}
