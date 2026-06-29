'use client'

import { motion, useReducedMotion } from 'motion/react'
import React from 'react'

import { DynamicIcon } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

type Step = { icon?: string | null; title?: string | null; body?: string | null }

const colClass: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

/**
 * The roadmap steps (extracted to a client component for the staggered scroll-in
 * reveal). Visual polish over the original: double-ring icon chips (solid-blue chip +
 * white anchor gap + faint brand outline) that sit on an opaque card-coloured disc so
 * the connector passes behind them; a progressive connector that fades brand→faint
 * left-to-right (vertical on mobile); and a left-to-right staggered fade/rise when the
 * section enters view. All motion is wrapped in a prefers-reduced-motion guard — those
 * users get the full layout, static.
 */
export const TimelineSteps: React.FC<{ items: Step[] }> = ({ items }) => {
  const reduce = useReducedMotion()
  const list = items || []
  const n = Math.min(list.length, 6) || 1
  // trim the desktop connector so it runs node-center → node-center
  const inset = `${50 / n}%`

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  }
  const step = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <motion.ol
      className={cn('relative mt-16 grid gap-y-12', colClass[n] || 'lg:grid-cols-4', 'lg:gap-x-10')}
      variants={reduce ? undefined : container}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* mobile: vertical progressive connector (stronger at top, fading down) */}
      <span
        aria-hidden
        className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-brand/30 via-brand/10 to-brand/5 lg:hidden"
      />
      {/* desktop: horizontal progressive connector node-center → node-center */}
      <span
        aria-hidden
        className="absolute top-6 hidden h-px -translate-y-1/2 bg-gradient-to-r from-brand/30 via-brand/10 to-brand/5 lg:block"
        style={{ left: inset, right: inset }}
      />

      {list.map((it, i) => (
        <motion.li
          key={i}
          className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
          variants={reduce ? undefined : step}
        >
          {/* Double-ring icon chip — solid cobalt chip, a white (card) anchor gap that
              masks the connector, and a faint brand outline as the outer ring. */}
          <div className="relative z-10 lg:mb-6">
            <span className="grid size-12 place-items-center rounded-full bg-primary font-semibold text-primary-foreground ring-2 ring-brand/25 ring-offset-4 ring-offset-card">
              {it.icon ? (
                <DynamicIcon name={it.icon} className="size-5" />
              ) : (
                <span className="text-sm">{i + 1}</span>
              )}
            </span>
          </div>

          <div className="flex-1 lg:w-full lg:flex-none lg:px-2">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Step {i + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{it.title}</h3>
            {it.body && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  )
}
