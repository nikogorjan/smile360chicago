'use client'

import React, { useEffect, useRef } from 'react'

import { cn } from '@/utilities/ui'

/**
 * Translates its children vertically as the element scrolls through the viewport —
 * a lightweight parallax for a staggered gallery. `amount` is the max drift in px
 * (positive drifts up as you scroll down; negative drifts down). Give sibling items
 * different amounts so they move at different rates. rAF-throttled + passive scroll,
 * and disabled under prefers-reduced-motion.
 */
export const ScrollDrift: React.FC<{
  className?: string
  amount?: number
  children: React.ReactNode
}> = ({ className, amount = 40, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // 0 when the element's top is at the viewport bottom, 1 when its bottom hits the top.
      const progress = (vh - rect.top) / (vh + rect.height)
      const clamped = Math.min(1, Math.max(0, progress))
      const y = (0.5 - clamped) * 2 * amount // +amount at the bottom, -amount at the top
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [amount])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
