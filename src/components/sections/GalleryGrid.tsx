'use client'

import { MoveHorizontal } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

import { Section } from '@/components/site/primitives'
import type { GalleryCase } from '@/lib/practice'
import { cn } from '@/utilities/ui'

/** Draggable before/after comparison — handle centred at the start; drag to reveal more
 *  of the before or after photo. Drag is user-driven (no auto motion to guard). */
const CaseSlider: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const [pos, setPos] = useState(50)
  const sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden bg-muted">
      {/* after — full */}
      <Image src={after} alt="After" fill sizes={sizes} className="object-cover" />
      {/* before — clipped to the slider position */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt="Before" fill sizes={sizes} className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-foreground/70 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-background">
        Before
      </span>
      <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full bg-brand px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-brand-foreground">
        After
      </span>

      {/* divider + drag handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand ring-1 ring-black/10">
          <MoveHorizontal className="size-4" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 z-20 size-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

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

/** Illustrative split shown for cases that don't have real photos uploaded yet. */
const PlaceholderPair: React.FC = () => (
  <div className="relative grid aspect-[4/3] grid-cols-2">
    <div className="relative flex items-center justify-center bg-secondary">
      <span className="absolute left-2 top-2 rounded-full bg-foreground/70 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-background">
        Before
      </span>
      <Tooth dull />
    </div>
    <div className="relative flex items-center justify-center bg-secondary">
      <span className="absolute right-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[0.6rem] font-bold uppercase text-brand-foreground">
        After
      </span>
      <Tooth />
    </div>
  </div>
)

const Case: React.FC<{ c: GalleryCase }> = ({ c }) => (
  <figure className="group overflow-hidden rounded-[8px] border border-border bg-card transition-colors hover:border-foreground/20">
    {c.before && c.after ? <CaseSlider before={c.before} after={c.after} /> : <PlaceholderPair />}
    <figcaption className="p-4">
      <span className="text-xs font-bold text-brand">{c.treatment}</span>
      <h3 className="mt-1 text-sm font-semibold text-foreground">{c.title}</h3>
      {c.description && <p className="mt-1 text-xs leading-snug text-muted-foreground">{c.description}</p>}
    </figcaption>
  </figure>
)

export const GalleryGrid: React.FC<{ cases: GalleryCase[] }> = ({ cases: galleryCases }) => {
  const treatments = useMemo(
    () => ['All', ...Array.from(new Set(galleryCases.map((c) => c.treatment)))],
    [galleryCases],
  )
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? galleryCases : galleryCases.filter((c) => c.treatment === filter)
  const anyPhotos = galleryCases.some((c) => c.before && c.after)

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
            <Case key={c.title} c={c} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {anyPhotos
            ? 'Drag the slider on any case to compare before & after.'
            : 'Illustrative placeholders. Real before-and-after patient photos (with consent on file) will be added before launch.'}
        </p>
      </div>
    </Section>
  )
}
