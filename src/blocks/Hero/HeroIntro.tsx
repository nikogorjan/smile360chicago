'use client'

import { Phone, Play, Star } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ButtonLabel, buttonVariants } from '@/components/ui/button'

type TextNode = { type?: string; text?: string; format?: number }
type LexNode = { type?: string; children?: TextNode[] }

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

const EASE = [0.76, 0, 0.24, 1] as const
const EASE_OUT = [0.22, 1, 0.36, 1] as const
/** Toggle the opening brand-name + logo intro. Flip to `true` to bring it back. */
const SHOW_INTRO_NAME = false

/** When the page chrome + hero content are revealed (ms). 4000 leaves room for the
 *  name preamble; without it the media grows immediately so we reveal sooner. */
const REVEAL_AT = SHOW_INTRO_NAME ? 4000 : 2400

/** useLayoutEffect on the client, useEffect during SSR (silences the hydration warning). */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Props = {
  imageUrl: string
  videoUrl?: string | null
  showVideo: boolean
  /** Brand name that wipes up in the intro. */
  introName: string
  heading: unknown
  showRating?: boolean | null
  ratingText?: string | null
  callHref: string
  callLabel: string
  callVariant: 'white' | 'outlineWhite'
  logoLight?: string | null
  logoDark?: string | null
  logoAlt?: string | null
  card?: { mediaUrl?: string; title?: string | null; text?: string | null } | null
}

/**
 * Hero (client) with the load-in intro, recreating the reference timeline:
 *   1. only the brand name is on screen — it wipes up, letter by letter,
 *   2. the hero's OWN media grows in place (width then height) + a slow zoom,
 *   3. the page chrome (gated by globals.css) + the hero content fade to 1.
 *
 * There is a single media element — the real hero media — so nothing is
 * duplicated. Framer's `initial` is server-rendered, so the phase-1 frame is
 * the actual SSR output (no flash). Only runs on a fresh home load; skipped on
 * client navigation and under prefers-reduced-motion.
 */
export const HeroIntro: React.FC<Props> = ({
  imageUrl,
  videoUrl,
  showVideo,
  introName,
  heading,
  showRating,
  ratingText,
  callHref,
  callLabel,
  callVariant,
  logoLight,
  logoDark,
  logoAlt,
  card,
}) => {
  const reduce = useReducedMotion()
  // null = undetermined (hold the intro's first frame); true = play; false = skip.
  const [play, setPlay] = useState<boolean | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const running =
      document.documentElement.getAttribute('data-intro') === 'running' && !reduce
    if (running) {
      setPlay(true)
      const t = setTimeout(() => {
        document.documentElement.removeAttribute('data-intro') // chrome fades in
        setRevealed(true) // hero content fades in
      }, REVEAL_AT)
      return () => clearTimeout(t)
    }
    document.documentElement.removeAttribute('data-intro')
    setPlay(false)
    setRevealed(true)
  }, [reduce])

  const mediaAnimate =
    play === true
      ? {
          clipPath: ['inset(50% 50% 50% 50%)', 'inset(40% 0% 40% 0%)', 'inset(0% 0% 0% 0%)'],
          scale: 1,
        }
      : play === false
        ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
        : undefined // null: keep `initial`

  // The logo wipes up last — after every letter has started.
  const logoDelay = 0.4 + introName.length * 0.04 + 0.1

  // Fit the intro "name + logo" row to the wrapper so it always spans the
  // container edge-to-edge. Measure the row's natural width and scale the
  // font-size to the container's inner width (re-fit on resize + webfont swap).
  const introBoxRef = useRef<HTMLDivElement>(null)
  const introRowRef = useRef<HTMLDivElement>(null)
  const [introSize, setIntroSize] = useState<number | null>(null)

  useIsoLayoutEffect(() => {
    if (play === false) return
    const fit = () => {
      const box = introBoxRef.current
      const row = introRowRef.current
      if (!box || !row) return
      const cs = getComputedStyle(box)
      const inner = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const natural = row.scrollWidth
      const current = parseFloat(getComputedStyle(row).fontSize)
      if (inner > 0 && natural > 0 && current > 0) setIntroSize((current * inner) / natural)
    }
    fit()
    const ro = new ResizeObserver(fit)
    if (introBoxRef.current) ro.observe(introBoxRef.current)
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(fit).catch(() => {})
    }
    return () => ro.disconnect()
  }, [play, introName])

  return (
    <section data-hero className="relative bg-cream">
      <div className="p-3 sm:p-4">
        <div className="relative h-[92svh] min-h-[640px] max-h-[960px] overflow-hidden rounded-[8px]">
          {/* The one and only hero media — grows in place */}
          <motion.div
            className="absolute inset-0 bg-cream"
            initial={{ clipPath: 'inset(50% 50% 50% 50%)', scale: 1.14 }}
            animate={mediaAnimate}
            transition={
              play === true
                ? { duration: 2, delay: SHOW_INTRO_NAME ? 1.9 : 0.2, ease: EASE, times: [0, 0.5, 1] }
                : { duration: 0 }
            }
          >
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
                <source src={videoUrl ?? undefined} />
              </video>
            ) : (
              <Image src={imageUrl} alt="" fill priority sizes="100vw" className="object-cover" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 via-30% to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Content — bottom-left, in the page container; fades in after the reveal */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end pb-12 sm:pb-14 lg:pb-20">
        <div className="container">
          <motion.div
            className="pointer-events-auto max-w-2xl text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
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
              <Link href={callHref} className={buttonVariants({ variant: callVariant })}>
                <ButtonLabel>
                  <Phone className="size-4" />
                  {callLabel}
                </ButtonLabel>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brand name — the only thing on screen first, wipes up letter by letter */}
      {SHOW_INTRO_NAME && play !== false && (
        <div className="pointer-events-none fixed inset-0 z-40 grid place-items-center">
          <div ref={introBoxRef} className="container">
            <div
              ref={introRowRef}
              className="mx-auto flex w-max flex-nowrap items-center gap-[0.3em] text-foreground"
              style={{ fontSize: introSize ? `${introSize}px` : 'clamp(1.9rem, 8.5vw, 7rem)' }}
            >
              <h2 aria-hidden className="flex flex-nowrap font-display font-normal leading-none">
              {introName.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.2em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: 0 }}
                    animate={play === true ? { y: '-115%' } : { y: 0 }}
                    transition={
                      play === true
                        ? { duration: 0.7, delay: 0.4 + i * 0.04, ease: EASE_OUT }
                        : { duration: 0 }
                    }
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* CMS logo — same height as the text, wipes up last */}
            <span className="inline-block shrink-0 overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: 0 }}
                animate={play === true ? { y: '-130%' } : { y: 0 }}
                transition={
                  play === true ? { duration: 0.7, delay: logoDelay, ease: EASE_OUT } : { duration: 0 }
                }
              >
                <Image
                  src={logoLight || '/smile360-new-logo.png'}
                  alt={logoAlt || ''}
                  width={1254}
                  height={1254}
                  priority
                  className="h-[0.85em] w-auto rounded-lg dark:hidden"
                />
                <Image
                  src={logoDark || logoLight || '/smile360-new-logo.png'}
                  alt={logoAlt || ''}
                  width={1254}
                  height={1254}
                  priority
                  className="hidden h-[0.85em] w-auto rounded-lg dark:block"
                />
              </motion.span>
            </span>
            </div>
          </div>
        </div>
      )}

      {/* Optional floating card — fades in with the content */}
      {card && (
        <motion.div
          className="absolute bottom-10 right-6 z-20 hidden w-[300px] overflow-hidden rounded-2xl bg-card text-card-foreground ring-1 ring-black/5 md:bottom-12 md:right-12 lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
        >
          {card.mediaUrl && (
            <div className="relative aspect-[16/10] w-full">
              <Image src={card.mediaUrl} alt="" fill sizes="300px" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-11 place-items-center rounded-full bg-white/90 text-primary">
                  <Play className="size-5 translate-x-0.5 fill-current" />
                </span>
              </span>
            </div>
          )}
          <div className="p-4">
            <p className="text-sm font-semibold leading-snug">
              {card.title || "Your family's smile, in one place"}
            </p>
            {card.text && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.text}</p>
            )}
          </div>
        </motion.div>
      )}
    </section>
  )
}
