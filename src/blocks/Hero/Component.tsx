import { Phone, Play, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { resolveHref } from '@/lib/nav'
import { practice } from '@/lib/practice'
import { stockPhotos } from '@/lib/stockImages'

type TextNode = { type?: string; text?: string; format?: number }
type LexNode = { type?: string; children?: TextNode[] }
type MediaLike = { url?: string | null } | string | number | null | undefined

const mediaUrl = (m: MediaLike): string | undefined =>
  m && typeof m === 'object' && 'url' in m && m.url ? m.url : undefined

/** Render the rich-text headline inline inside an <h1> (white, bold for emphasis). */
const renderHeading = (data: unknown): React.ReactNode => {
  const root = (data as { root?: { children?: LexNode[] } })?.root
  if (!root?.children) return null
  const out: React.ReactNode[] = []
  root.children.forEach((block, bi) => {
    ;(block.children || []).forEach((n, i) => {
      if (n.type !== 'text' || !n.text) return
      let el: React.ReactNode = n.text
      if (n.format && n.format & 1) el = <strong key={`b${bi}-${i}`}>{el}</strong>
      out.push(<React.Fragment key={`${bi}-${i}`}>{el}</React.Fragment>)
    })
  })
  return out
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  mediaType,
  image,
  video,
  heading,
  showRating,
  ratingText,
  links,
  card,
}) => {
  const imageUrl = mediaUrl(image as MediaLike) || stockPhotos.reception
  const videoUrl = mediaUrl(video as MediaLike)
  const showVideo = mediaType === 'video' && !!videoUrl

  // Single white phone CTA — prefer the CMS tel: link, fall back to the practice phone.
  const call = (links || []).find((l) => /^tel:/i.test(l?.link?.url || ''))
  const callHref = call?.link ? resolveHref(call.link) : practice.phoneHref
  const callLabel = call?.link?.label || `Call ${practice.phone}`

  const cardMediaUrl = mediaUrl(card?.media as MediaLike)
  // Optional floating card — only shows when given real CMS content.
  const showCard = card?.enabled !== false && !!(card?.title || cardMediaUrl)

  return (
    // The nav is now a solid bar above the hero, so the media sits in normal flow
    // with a small even margin on all sides (square corners).
    <section data-hero className="relative">
      <div className="p-3 sm:p-4">
        <div className="relative h-[92svh] min-h-[640px] max-h-[960px] overflow-hidden bg-[oklch(20%_0.04_262deg)]">
          {showVideo ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={imageUrl}
            >
              <source src={videoUrl} />
            </video>
          ) : (
            <Image src={imageUrl} alt="" fill priority sizes="100vw" className="object-cover" />
          )}

          {/* Soft bottom-only overlay — keeps the rest of the photo bright/clear */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        </div>
      </div>

      {/* Content — overlaid, bottom-left, inside the page container so it lines up
          with the nav and the rest of the site */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end pb-12 sm:pb-14 lg:pb-20">
        <div className="container">
          <div className="pointer-events-auto max-w-2xl text-white">
            {showRating && (
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </span>
                {ratingText && <span>{ratingText}</span>}
              </div>
            )}

            <h1 className="mt-5 max-w-[18ch] font-display text-5xl font-normal leading-[1.05] tracking-normal text-white md:text-6xl">
              {renderHeading(heading)}
            </h1>

            <div className="mt-7">
              <Link
                href={callHref}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
              >
                <Phone className="size-4" />
                {callLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Optional floating card — bottom-right, desktop only, CMS-driven */}
      {showCard && (
        <div className="absolute bottom-10 right-6 z-20 hidden w-[300px] overflow-hidden rounded-2xl bg-card text-card-foreground shadow-xl ring-1 ring-black/5 md:bottom-12 md:right-12 lg:block">
          {cardMediaUrl && (
            <div className="relative aspect-[16/10] w-full">
              <Image src={cardMediaUrl} alt="" fill sizes="300px" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-11 place-items-center rounded-full bg-white/90 text-primary shadow-md">
                  <Play className="size-5 translate-x-0.5 fill-current" />
                </span>
              </span>
            </div>
          )}
          <div className="p-4">
            <p className="text-sm font-semibold leading-snug">
              {card?.title || "Your family's smile, in one place"}
            </p>
            {card?.text && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.text}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
