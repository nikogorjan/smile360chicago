'use client'

import { Heart, Sparkles, Star, Zap, type LucideIcon } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

type Stat = { value: string; label: string }

/** Pick a line icon for a stat from its label (resilient to CMS copy edits). */
const iconForLabel = (label: string): LucideIcon => {
  const l = label.toLowerCase()
  if (/review|google|rating|star/.test(l)) return Star
  if (/smile|transform|tooth|patient/.test(l)) return Sparkles
  if (/same.?day|emergency|urgent|appointment/.test(l)) return Zap
  return Heart // years / caring for Chicago
}

type Parsed =
  | { kind: 'number'; prefix: string; target: number; decimals: number; suffix: string }
  | { kind: 'text'; text: string }

/** Split "20k+" → {20,"k+"}, "4.9★" → {4.9,"★"}; non-numeric ("Same-day") → text. */
const parseValue = (value: string): Parsed => {
  const m = value.match(/^(\D*?)(\d[\d.,]*)(.*)$/)
  if (!m) return { kind: 'text', text: value }
  const [, prefix, numStr, suffix] = m
  const clean = numStr.replace(/,/g, '')
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0
  return { kind: 'number', prefix, target: parseFloat(clean), decimals, suffix }
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const COUNT_MS = 1400

/** Counts 0 → target once `run` flips true (rAF). `instant` shows the final value. */
const CountUp: React.FC<{ target: number; decimals: number; run: boolean; instant: boolean }> = ({
  target,
  decimals,
  run,
  instant,
}) => {
  const [val, setVal] = useState(instant ? target : 0)

  useEffect(() => {
    if (instant) {
      setVal(target)
      return
    }
    if (!run) return
    let raf = 0
    let startTs = 0
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const t = Math.min(1, (ts - startTs) / COUNT_MS)
      setVal(target * easeOutCubic(t))
      if (t < 1) raf = requestAnimationFrame(step)
      else setVal(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run, instant, target])

  return <span className="tabular-nums">{val.toFixed(decimals)}</span>
}

/**
 * Animated stats grid. Cards count up from zero when scrolled into view
 * (IntersectionObserver, once), suffixes (+, k+, ★) are accented in brand blue,
 * and the whole thing collapses to final values instantly under reduced motion.
 */
export const StatsGrid: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (reduce) {
      setInView(true)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  const instant = !!reduce
  const shown = inView || instant

  return (
    <div ref={ref} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
      {stats.map((s, i) => {
        const parsed = parseValue(s.value)
        const Icon = iconForLabel(s.label)
        return (
          <div
            key={s.label}
            className={cn(
              'h-full ease-out motion-safe:transition-all motion-safe:duration-500',
              shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
            style={instant ? undefined : { transitionDelay: `${i * 90}ms` }}
          >
            <div
              role="img"
              aria-label={`${s.value}, ${s.label}`}
              className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center md:p-8"
            >
              {/* Icon — one matched set: brand-blue outline icon, centered in a soft circle */}
              <span
                aria-hidden
                className="mb-5 grid size-14 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"
              >
                <Icon className="size-7" strokeWidth={1.75} />
              </span>

              {/* Big value — fixed line box so all four share a baseline */}
              <div className="flex min-h-[4.5rem] items-center justify-center text-5xl font-bold leading-none tracking-tight md:text-6xl">
                {parsed.kind === 'number' ? (
                  <>
                    {parsed.prefix && <span className="text-foreground">{parsed.prefix}</span>}
                    <span className="text-foreground">
                      <CountUp
                        target={parsed.target}
                        decimals={parsed.decimals}
                        run={inView}
                        instant={instant}
                      />
                    </span>
                    {parsed.suffix && (
                      <span className="text-foreground">
                        {parsed.suffix.split('').map((c, j) =>
                          c === '★' ? (
                            <span key={j} className="text-gold">
                              {c}
                            </span>
                          ) : (
                            <React.Fragment key={j}>{c}</React.Fragment>
                          ),
                        )}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="whitespace-nowrap text-3xl text-foreground md:text-4xl">
                    {parsed.text}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="mt-4 max-w-[12rem] text-sm font-medium leading-snug text-muted-foreground sm:text-base">
                {s.label}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
