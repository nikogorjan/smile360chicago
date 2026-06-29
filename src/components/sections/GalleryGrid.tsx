'use client'

import React, { useMemo, useState } from 'react'

import { Section } from '@/components/site/primitives'
import { SmileCaseCard } from '@/components/site/SmileCaseCard'
import type { GalleryCase } from '@/lib/practice'
import { cn } from '@/utilities/ui'

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
            <SmileCaseCard key={c.title} c={c} />
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
