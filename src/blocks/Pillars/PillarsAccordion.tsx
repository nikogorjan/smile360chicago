'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

export type PillarItem = {
  number: string
  title: string
  body?: string | null
  imageUrl: string
  imageAlt: string
  checklist?: string[]
  stat?: { value: string; caption: string } | null
}

/**
 * Pillars accordion. Desktop: a "frosted filmstrip" — each collapsed column
 * shows its own image, desaturated + brand-blue tinted, with a ghost watermark
 * number and a rotated title; the open panel reveals the full-colour image
 * beside a white content card. It auto-advances on a timer (a gold progress
 * line drives the cadence via animationend), pausing on hover/keyboard focus and
 * stopping for good after a manual click. Tablet/mobile: a plain stacked
 * accordion. All motion respects prefers-reduced-motion.
 */
export const PillarsAccordion: React.FC<{ pillars: PillarItem[] }> = ({ pillars }) => {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [stopped, setStopped] = useState(false)
  // Two-phase content switch: when `active` changes, the new panel's content stays
  // hidden for EXIT_MS (while the old one animates out), then enters as a stagger.
  // The cleanup cancels a pending enter so rapid clicks restart cleanly.
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (reduce) {
      setRevealed(true)
      return
    }
    setRevealed(false)
    const t = setTimeout(() => setRevealed(true), 130)
    return () => clearTimeout(t)
  }, [active, reduce])

  if (!pillars.length) return null

  // Manual interaction stops auto-advance permanently.
  const select = (i: number) => {
    setActive(i)
    setStopped(true)
  }

  return (
    <>
      {/* Desktop — frosted filmstrip accordion */}
      <div className="group/strip hidden overflow-hidden rounded-2xl border border-border lg:flex lg:h-[42rem]">
        {pillars.map((p, i) => {
          const isActive = i === active
          // `shown` = this panel is open AND past the exit phase (or reduced motion).
          const shown = isActive && (revealed || !!reduce)
          const listLen = p.checklist?.length ?? 0
          const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
          const textState = shown
            ? 'opacity-100 translate-y-0'
            : isActive
              ? 'opacity-0 translate-y-3'
              : 'opacity-0 -translate-y-1'
          // Staggered enter (quick uniform exit). Delay only applies while entering.
          const elStyle = (delay: number): React.CSSProperties => ({
            transitionProperty: 'opacity, transform',
            transitionTimingFunction: ease,
            transitionDuration: reduce ? '0ms' : shown ? '290ms' : '150ms',
            transitionDelay: reduce ? '0ms' : shown ? `${delay}ms` : '0ms',
          })
          const cardStyle: React.CSSProperties = {
            transitionProperty: 'opacity',
            transitionTimingFunction: ease,
            transitionDuration: reduce ? '0ms' : shown ? '260ms' : '150ms',
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => select(i)}
              aria-expanded={isActive}
              aria-label={p.body ? `${p.title}. ${p.body}` : p.title}
              className={cn(
                'group relative flex h-full min-w-0 overflow-hidden bg-muted text-left outline-none',
                'transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none',
                'focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand',
                i > 0 && 'border-l border-border',
                isActive ? 'flex-[6] cursor-default xl:flex-[10]' : 'flex-[1] cursor-pointer',
              )}
            >
              {/* Background image — frosted (desaturated + dimmed) when closed,
                  full colour + settle-zoom when open */}
              <Image
                src={p.imageUrl}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 1280px) 50vw, 40vw"
                className={cn(
                  'object-cover transition-[filter,transform] duration-700 ease-out motion-reduce:transition-none',
                  shown
                    ? 'scale-100 brightness-100 grayscale-0'
                    : 'scale-105 brightness-[0.5] grayscale-[0.9] group-hover:brightness-[0.6] group-hover:grayscale-[0.8]',
                )}
              />
              {/* Even brand-blue frost tint — flat across the whole column (lifts a
                  touch on hover); no center band, so the darkening reads uniform */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-0 bg-brand transition-opacity duration-700 motion-reduce:transition-none',
                  shown ? 'opacity-0' : 'opacity-65 group-hover:opacity-55',
                )}
              />
              {/* Flat dark floor — uniform, stays put on hover so the white title and
                  number keep contrast even where the source image is bright */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 motion-reduce:transition-none',
                  shown ? 'opacity-0' : 'opacity-[0.18]',
                )}
              />

              {/* Collapsed rail — small indicator + rotated title (crossfades to the
                  open content at phase 2) */}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none',
                  shown ? 'pointer-events-none opacity-0' : 'opacity-100',
                )}
              >
                <span className="absolute inset-0 flex flex-col items-center gap-6 py-7">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/40 text-xs font-semibold text-white">
                    {p.number}
                  </span>
                  <span className="font-display rotate-180 text-xl font-medium text-white [writing-mode:vertical-rl]">
                    {p.title}
                  </span>
                </span>
              </span>

              {/* Open content — white card (left) over the full-colour image (right).
                  The card reveals at phase 2; the text cascades in sequence. */}
              <span
                aria-hidden
                className={cn('absolute inset-0', isActive ? '' : 'pointer-events-none')}
              >
                {/* White card backdrop */}
                <span
                  className={cn(
                    'absolute inset-y-0 left-0 w-3/5 bg-card xl:w-1/2',
                    shown ? 'opacity-100' : 'opacity-0',
                  )}
                  style={cardStyle}
                />
                {/* Text column — each element fades + rises on its own delay */}
                <span className="absolute inset-y-0 left-0 flex w-3/5 flex-col justify-between p-8 xl:w-1/2 xl:p-10">
                  <span className="flex flex-col">
                    <span
                      className={cn(
                        'grid size-10 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand',
                        textState,
                      )}
                      style={elStyle(0)}
                    >
                      {p.number}
                    </span>
                    <span
                      className={cn(
                        'font-display mt-6 text-3xl font-medium leading-tight text-foreground',
                        textState,
                      )}
                      style={elStyle(0)}
                    >
                      {p.title}
                    </span>
                    {p.body && (
                      <span
                        className={cn(
                          'mt-4 block text-base leading-relaxed text-muted-foreground',
                          textState,
                        )}
                        style={elStyle(45)}
                      >
                        {p.body}
                      </span>
                    )}
                    {p.checklist && p.checklist.length > 0 && (
                      <span className="mt-6 flex flex-col gap-2.5">
                        {p.checklist.map((c, j) => (
                          <span
                            key={j}
                            className={cn(
                              'flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85',
                              textState,
                            )}
                            style={elStyle(85 + j * 22)}
                          >
                            <span
                              aria-hidden
                              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
                            >
                              <Check className="size-3" strokeWidth={2.5} />
                            </span>
                            <span>{c}</span>
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  {p.stat?.value && (
                    <span
                      className={cn('block border-t border-border pt-5', textState)}
                      style={elStyle(85 + listLen * 22 + 30)}
                    >
                      <span className="flex items-center gap-4 rounded-[6px] bg-gold/10 px-4 py-3.5">
                        <span className="font-display shrink-0 whitespace-nowrap text-4xl font-semibold leading-none text-gold">
                          {p.stat.value}
                        </span>
                        {p.stat.caption && (
                          <>
                            <span aria-hidden className="h-9 w-px shrink-0 bg-gold/30" />
                            <span className="text-sm leading-snug text-muted-foreground">
                              {p.stat.caption}
                            </span>
                          </>
                        )}
                      </span>
                    </span>
                  )}
                </span>
              </span>

              {/* Gold auto-advance progress — drives the timer; pauses on
                  hover/focus anywhere in the strip; hidden once stopped / reduced */}
              {isActive && !stopped && !reduce && (
                <span
                  key={active}
                  aria-hidden
                  onAnimationEnd={() => setActive((a) => (a + 1) % pillars.length)}
                  className="absolute inset-x-0 bottom-0 z-30 h-[3px] origin-left bg-gold [animation:pillar-progress_5500ms_linear_forwards] group-focus-within/strip:[animation-play-state:paused] group-hover/strip:[animation-play-state:paused]"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tablet / mobile — stacked accordion, image above text */}
      <div className="lg:hidden">
        {pillars.map((p, i) => {
          const isOpen = i === active
          return (
            <div key={i} className="border-t border-border bg-card last:border-b">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={isOpen}
                className="relative flex w-full items-center gap-4 overflow-hidden px-6 py-5 text-left outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                {/* Frosted image — collapsed only; opening reveals the white header */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none',
                    isOpen ? 'opacity-0' : 'opacity-100',
                  )}
                >
                  <Image
                    src={p.imageUrl}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover brightness-[0.6] grayscale-[0.9]"
                  />
                  <span className="absolute inset-0 bg-brand/40" />
                  {/* ghost number */}
                  <span className="font-display absolute inset-y-0 right-4 flex items-center text-6xl font-bold leading-none text-white/10">
                    {p.number}
                  </span>
                </span>
                <span
                  className={cn(
                    'relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors duration-500 motion-reduce:transition-none',
                    isOpen ? 'bg-brand/10 text-brand' : 'border border-white/40 text-white',
                  )}
                >
                  {p.number}
                </span>
                <span
                  className={cn(
                    'font-display relative z-10 flex-1 text-xl font-medium transition-colors duration-500 motion-reduce:transition-none',
                    isOpen ? 'text-foreground' : 'text-white',
                  )}
                >
                  {p.title}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'relative z-10 size-5 shrink-0 transition-[transform,color] duration-300 motion-reduce:transition-none',
                    isOpen ? 'rotate-180 text-muted-foreground' : 'text-white',
                  )}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="pb-6">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={p.imageUrl}
                        alt={p.imageAlt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-6">
                      {p.body && (
                        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                          {p.body}
                        </p>
                      )}
                      {p.checklist && p.checklist.length > 0 && (
                        <ul className="mt-4 flex flex-col gap-2.5">
                          {p.checklist.map((c, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85"
                            >
                              <span
                                aria-hidden
                                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
                              >
                                <Check className="size-3" strokeWidth={2.5} />
                              </span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {p.stat?.value && (
                        <div className="mt-5 border-t border-border pt-4">
                          <div className="flex items-center gap-4 rounded-[6px] bg-gold/10 px-4 py-3">
                            <span className="font-display text-3xl font-semibold leading-none text-gold">
                              {p.stat.value}
                            </span>
                            {p.stat.caption && (
                              <>
                                <span aria-hidden className="h-8 w-px shrink-0 bg-gold/30" />
                                <span className="text-sm leading-snug text-muted-foreground">
                                  {p.stat.caption}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
