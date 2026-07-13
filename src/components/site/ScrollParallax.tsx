'use client'

import React, { useEffect, useRef } from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  /** Classes for the clipping frame (e.g. aspect ratio, rounded corners, border). */
  className?: string
  /** Max vertical drift as a fraction of the frame height, each direction. Default 0.06 (±6%). */
  amount?: number
  children: React.ReactNode
}

/**
 * A scroll-driven parallax frame. The children are rendered into a layer that is a little
 * taller than the frame and clipped by it; as the frame travels through the viewport the
 * layer drifts vertically, so the image inside appears to move at a different speed than the
 * page — a subtle depth effect. rAF-throttled + passive scroll, and disabled entirely for
 * users who prefer reduced motion (the layer simply stays centred).
 */
export const ScrollParallax: React.FC<Props> = ({ className, amount = 0.06, children }) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const layer = layerRef.current
    if (!frame || !layer) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = frame.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // 0 when the frame's top is at the viewport bottom, 1 when its bottom reaches the top.
      const progress = (vh - rect.top) / (vh + rect.height)
      const clamped = Math.min(1, Math.max(0, progress))
      const travel = (0.5 - clamped) * 2 * amount * rect.height // ±amount·height, 0 when centred
      layer.style.transform = `translate3d(0, ${travel.toFixed(2)}px, 0)`
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

  // Overflow the frame by a hair more than the travel so an edge never peeks through.
  const pad = `-${(amount * 100 + 2).toFixed(2)}%`

  return (
    <div ref={frameRef} className={cn('relative overflow-hidden', className)}>
      <div
        ref={layerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: pad, bottom: pad }}
      >
        {children}
      </div>
    </div>
  )
}
