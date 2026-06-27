'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

export type ServiceRow = {
  slug: string
  name: string
  excerpt: string
  category: string
  imageUrl: string
}

/**
 * Editorial service rows with a scroll-driven "spotlight": exactly one row at a
 * time gets a white background — the one whose vertical center is closest to the
 * viewport's center line. As you scroll, the highlight moves from row to row and
 * the previous one fades back to transparent. Under prefers-reduced-motion the
 * highlight is disabled entirely (every row stays transparent).
 */
export const ServicesListRows: React.FC<{ rows: ServiceRow[] }> = ({ rows }) => {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (reduce) {
      setActive(null)
      return
    }
    const container = containerRef.current
    if (!container) return

    let raf = 0
    const compute = () => {
      raf = 0
      const items = Array.from(container.querySelectorAll<HTMLElement>('[data-row]'))
      if (!items.length) return
      const center = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const mid = r.top + r.height / 2
        const dist = Math.abs(mid - center)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce, rows.length])

  return (
    <div ref={containerRef} className="mt-12 border-t border-border">
      {rows.map((s, i) => (
        <Link
          key={s.slug || i}
          data-row
          href={`/services/${s.slug}`}
          className={cn(
            'group flex flex-col gap-4 border-b border-border px-4 py-10 transition-colors duration-500 ease-out motion-reduce:transition-none sm:px-6 lg:py-14',
            'lg:grid lg:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:items-center lg:gap-10',
            active === i ? 'bg-card' : 'bg-transparent hover:bg-card',
          )}
        >
          {/* Thumbnail — square corners */}
          <div className="relative aspect-[4/3] w-40 shrink-0 overflow-hidden lg:w-full">
            <Image
              src={s.imageUrl}
              alt={s.name}
              fill
              sizes="(min-width: 1024px) 8rem, 10rem"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Title (large column) */}
          <div className="min-w-0">
            {s.category && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {s.category}
              </span>
            )}
            <h3 className="font-display mt-1.5 text-2xl font-medium leading-tight text-foreground lg:text-3xl">
              {s.name}
            </h3>
          </div>

          {/* Description */}
          {s.excerpt && (
            <p className="text-base leading-relaxed text-muted-foreground">{s.excerpt}</p>
          )}

          {/* Arrow (desktop) — on hover the resting arrow exits top-right while a
              second arrow slides in from the bottom-left; the circle clips both. */}
          <span className="relative hidden size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-border text-foreground transition-colors duration-300 group-hover:border-foreground lg:grid">
            <ArrowUpRight
              aria-hidden
              className="size-5 [grid-area:1/1] transition-transform duration-300 ease-out group-hover:-translate-y-[150%] group-hover:translate-x-[150%] motion-reduce:transition-none"
            />
            <ArrowUpRight
              aria-hidden
              className="size-5 -translate-x-[150%] translate-y-[150%] [grid-area:1/1] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none"
            />
          </span>
        </Link>
      ))}
    </div>
  )
}
