'use client'

import React, { useMemo, useState } from 'react'

import { Section } from '@/components/site/primitives'
import type { GalleryCase } from '@/lib/practice'
import { cn } from '@/utilities/ui'

const MiniCase: React.FC<{ title: string; treatment: string; description: string }> = ({
  title,
  treatment,
  description,
}) => (
  <figure className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="relative grid aspect-[5/3] grid-cols-2">
      <div className="relative flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
        <span className="absolute left-2 top-2 rounded-full bg-foreground/70 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-background">
          Before
        </span>
        <Tooth dull />
      </div>
      <div className="relative flex items-center justify-center bg-gradient-to-br from-brand/15 via-background to-accent/15">
        <span className="absolute right-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[0.6rem] font-bold uppercase text-brand-foreground">
          After
        </span>
        <Tooth />
      </div>
    </div>
    <figcaption className="p-4">
      <span className="text-xs font-bold text-brand">{treatment}</span>
      <h3 className="mt-1 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </figcaption>
  </figure>
)

const Tooth: React.FC<{ dull?: boolean }> = ({ dull }) => (
  <svg viewBox="0 0 80 80" className="w-1/2" aria-hidden>
    <path
      d="M20 28c0 22 12 40 20 40s20-18 20-40c0-8-6-12-13-9-5 2-7 4-7 4s-2-2-7-4c-7-3-13 1-13 9Z"
      fill={dull ? 'oklch(85% 0.05 85)' : 'oklch(98% 0.01 220)'}
      stroke={dull ? 'oklch(72% 0.05 80)' : 'oklch(85% 0.03 220)'}
      strokeWidth="2"
    />
  </svg>
)

export const GalleryGrid: React.FC<{ cases: GalleryCase[] }> = ({ cases: galleryCases }) => {
  const treatments = useMemo(
    () => ['All', ...Array.from(new Set(galleryCases.map((c) => c.treatment)))],
    [galleryCases],
  )
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? galleryCases : galleryCases.filter((c) => c.treatment === filter)

  return (
    <Section>
      <div className="container">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {treatments.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                filter === t
                  ? 'border-brand bg-brand text-brand-foreground'
                  : 'border-border bg-card text-foreground hover:border-brand hover:text-brand',
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <MiniCase key={c.title} {...c} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Illustrative placeholders. Real before-and-after patient photos (with consent on file) will
          be added before launch.
        </p>
      </div>
    </Section>
  )
}
