'use client'

import React, { useEffect, useRef, useState } from 'react'

const Chip: React.FC<{ name: string }> = ({ name }) => (
  <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground">
    {name}
  </span>
)

/**
 * Infinite, seamless insurance marquee that fills any width. We measure one pass
 * of the list against the container and repeat it enough times that each of the
 * two animated halves is at least as wide as the container — so the -50% loop
 * never exposes a gap, even on very wide screens. The duration scales with the
 * repeat count so the scroll speed stays consistent across widths. Pauses on
 * hover; `.animate-marquee` already disables motion under prefers-reduced-motion.
 */
export const InsuranceMarqueeTrack: React.FC<{ names: string[] }> = ({ names }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [repeat, setRepeat] = useState(4)

  useEffect(() => {
    const compute = () => {
      const c = containerRef.current
      const m = measureRef.current
      if (!c || !m) return
      const cw = c.offsetWidth
      const lw = m.offsetWidth
      if (cw > 0 && lw > 0) setRepeat(Math.max(2, Math.ceil(cw / lw) + 1))
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [names.length])

  const pass = (gkey: string) =>
    Array.from({ length: repeat }).flatMap((_, r) =>
      names.map((name, i) => <Chip key={`${gkey}-${r}-${i}`} name={name} />),
    )

  return (
    <div ref={containerRef} className="relative mt-10 overflow-hidden">
      {/* Hidden single pass — measures the width of one list run. */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex items-center gap-3 pr-3"
      >
        {names.map((name, i) => (
          <Chip key={`measure-${i}`} name={name} />
        ))}
      </div>

      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: `${repeat * 22}s` }}
      >
        {/* Two equal halves (each `repeat` passes wide). The -50% translate lands
            the copy exactly where the first began — a seamless, gap-free loop. */}
        <div className="flex shrink-0 items-center gap-3 pr-3">{pass('a')}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-3 pr-3">
          {pass('b')}
        </div>
      </div>
    </div>
  )
}
