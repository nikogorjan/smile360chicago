'use client'

import React, { useEffect, useRef, useState } from 'react'

import { DynamicIcon } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

type Step = { icon?: string | null; title?: string | null; description?: string | null; id?: string | null }

const COLS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

/**
 * The step journey. On mobile it's a vertical timeline (node on the left, content on the
 * right, a connector running down through the nodes — matching the site's "How it works"
 * timeline); on desktop it flips to a full-width horizontal row (node on top, centred
 * content below) whose cobalt connector draws left→right when the section scrolls into view.
 * Honours reduced motion (completed line, no transition) and stays complete without JS.
 */
export const FirstVisitSteps: React.FC<{ steps: Step[]; invert: boolean }> = ({ steps, invert }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setAnimate(false)
      setShown(true)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cols = COLS[steps.length] || 'lg:grid-cols-4'
  // Connect the outer nodes on desktop: their centres sit at 0.5/n and 1 − 0.5/n of the width.
  const lineInset = steps.length > 1 ? `${(0.5 / steps.length) * 100}%` : '50%'

  return (
    <div ref={ref} className={cn('relative mt-14 grid gap-y-10 lg:gap-x-10', cols)}>
      {/* Desktop: static horizontal connector, node-centre → node-centre */}
      <span
        aria-hidden
        className={cn('absolute top-7 hidden h-px -translate-y-1/2 lg:block', invert ? 'bg-white/15' : 'bg-border')}
        style={{ left: lineInset, right: lineInset }}
      />
      {/* Desktop: cobalt progress line — draws left→right when the section scrolls into view */}
      <span
        aria-hidden
        className={cn(
          'absolute top-7 hidden h-px origin-left -translate-y-1/2 lg:block',
          invert ? 'bg-gradient-to-r from-white to-gold' : 'bg-gradient-to-r from-brand to-gold',
          animate && 'transition-transform duration-[1100ms] ease-out',
          shown ? 'scale-x-100' : 'scale-x-0',
        )}
        style={{ left: lineInset, right: lineInset }}
      />

      {steps.map((s, i) => (
        <div
          key={s.id || i}
          className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
        >
          {/* Mobile: connector segment from this node down to the next one. Solid cobalt,
              drawn on top of a faint track, revealed in sequence (h = item + gap-y-10). */}
          {i < steps.length - 1 && (
            <>
              <span
                aria-hidden
                className={cn(
                  'absolute left-7 top-7 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 lg:hidden',
                  invert ? 'bg-white/15' : 'bg-border',
                )}
              />
              <span
                aria-hidden
                className={cn(
                  'absolute left-7 top-7 h-[calc(100%+2.5rem)] w-px origin-top -translate-x-1/2 lg:hidden',
                  invert ? 'bg-gradient-to-b from-white to-gold' : 'bg-gradient-to-b from-brand to-gold',
                  animate && 'transition-transform duration-[420ms] ease-out',
                  shown ? 'scale-y-100' : 'scale-y-0',
                )}
                style={animate ? { transitionDelay: `${i * 420}ms` } : undefined}
              />
            </>
          )}

          <div className="relative z-10 lg:mb-6">
            <div
              className={cn(
                'relative flex size-14 items-center justify-center rounded-full border shadow-sm',
                invert ? 'border-white/20 bg-primary text-white' : 'border-brand/15 bg-brand-soft text-brand',
              )}
            >
              {s.icon ? (
                <DynamicIcon name={s.icon} className="size-6" />
              ) : (
                <span className="font-display text-xl font-bold leading-none">{i + 1}</span>
              )}
              {/* Step-number badge */}
              <span
                className={cn(
                  'absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-[0.6rem] font-bold leading-none tabular-nums shadow-sm ring-2',
                  invert ? 'bg-gold text-gold-foreground ring-primary' : 'bg-gold text-gold-foreground ring-card',
                )}
              >
                {i + 1}
              </span>
            </div>
          </div>

          <div className="flex-1 lg:w-full lg:flex-none lg:px-2">
            <h3 className={cn('font-display text-lg font-bold', invert ? 'text-white' : 'text-foreground')}>
              {s.title}
            </h3>
            {s.description && (
              <p
                className={cn(
                  'mt-2 text-sm leading-relaxed',
                  invert ? 'text-white/70' : 'text-muted-foreground',
                )}
              >
                {s.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
