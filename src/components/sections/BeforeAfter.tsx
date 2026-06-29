'use client'

import { MoveHorizontal } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import { Section, SectionHeading } from '@/components/site/primitives'
import type { GalleryCase } from '@/lib/practice'

const SmilePanel: React.FC<{ variant: 'before' | 'after' }> = ({ variant }) => {
  const after = variant === 'after'
  return (
    <div
      className={
        after
          ? 'flex size-full items-center justify-center bg-secondary'
          : 'flex size-full items-center justify-center bg-secondary'
      }
    >
      <svg viewBox="0 0 220 140" className="w-2/3" aria-hidden>
        <path
          d="M30 50c0 38 30 70 80 70s80-32 80-70c0-12-10-20-22-16-14 5-22 12-58 12s-44-7-58-12c-12-4-22 4-22 16Z"
          fill={after ? 'oklch(98% 0.01 220)' : 'oklch(82% 0.03 80)'}
          stroke={after ? 'oklch(85% 0.03 220)' : 'oklch(70% 0.04 80)'}
          strokeWidth="2"
        />
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x={48 + i * 20}
            y={70}
            width="16"
            height="28"
            rx="5"
            fill={after ? 'white' : 'oklch(85% 0.05 85)'}
          />
        ))}
      </svg>
      <span
        className={`absolute ${after ? 'right-3' : 'left-3'} top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${after ? 'bg-brand text-brand-foreground' : 'bg-foreground/70 text-background'}`}
      >
        {after ? 'After' : 'Before'}
      </span>
    </div>
  )
}

export const BeforeAfter: React.FC<{
  cases: GalleryCase[]
  eyebrow?: string
  heading?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  tone?: 'default' | 'muted' | 'brand' | 'glow'
}> = ({
  cases,
  eyebrow = 'Real results',
  heading = 'See the difference a Smile360 smile makes',
  description = 'Drag the slider to reveal a real-world transformation. From whitening and bonding to full smile makeovers, our before-and-afters speak for themselves.',
  ctaLabel = 'Explore the full smile gallery',
  ctaHref = '/smile-gallery',
  tone = 'muted',
}) => {
  const [pos, setPos] = useState(50)

  return (
    <Section tone={tone}>
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" eyebrow={eyebrow} title={heading} description={description} />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cases.slice(0, 6).map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-card p-3">
                <p className="text-xs font-bold text-brand">{c.treatment}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{c.title}</p>
              </div>
            ))}
          </div>
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-border shadow-xl">
            <div className="absolute inset-0">
              <SmilePanel variant="after" />
            </div>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <SmilePanel variant="before" />
            </div>
            <div
              className="absolute inset-y-0 z-10 w-0.5 bg-white ring-1 ring-black/10"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-lg">
                <MoveHorizontal className="size-5" />
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Reveal before and after"
              className="absolute inset-0 z-20 size-full cursor-ew-resize opacity-0"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
