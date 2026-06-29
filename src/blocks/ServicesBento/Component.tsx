import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { ServicesBentoBlock as Props } from '@/payload-types'
import { SectionHeading, buttonSecondary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { getServices, getServicesByIds } from '@/lib/queries'
import { getServicePhoto } from '@/lib/stockImages'
import { resolveHref } from '@/lib/nav'
import { cn } from '@/utilities/ui'

type Tile = { slug: string; name: string; imageUrl: string }

const idOf = (v: unknown): string =>
  typeof v === 'object' && v ? String((v as { id?: string | number }).id ?? '') : String(v ?? '')

/**
 * Balanced bento mosaic (computed, not per-tile): a fixed 4-column grid with one
 * consistent row height, where every row is [wide (2 cols) + normal + normal] and the
 * wide tile alternates left/right per row — so each row fills exactly 4 columns with no
 * orphan cells, and no tall tiles to leave height holes. Only used when the count
 * divides into clean rows of three; otherwise the grid falls back to uniform equal-size
 * tiles (a partial final row, never a mid-grid hole).
 */
const isMosaic = (n: number) => n >= 3 && n % 3 === 0
const isWide = (i: number, n: number): boolean => {
  if (!isMosaic(n)) return false
  const row = Math.floor(i / 3)
  const col = i % 3
  return col === (row % 2 === 0 ? 0 : 2) // wide on the left of even rows, right of odd rows
}

/**
 * Services bento — server component. A rounded inset white panel that floats on the gray
 * page like the hero media (same horizontal inset + 8px radius), with its header + grid
 * sitting in the standard 1600px content container. Each tile: full-bleed image with a
 * LIGHT frosted-blue duotone at rest (image clearly reads through) that blooms to full
 * colour on hover/focus — pure CSS, with a prefers-reduced-motion guard. A white pill
 * label (navy name + unified arrow chip) sits bottom-left. No gold in this section.
 */
export const ServicesBentoBlock: React.FC<Props> = async ({ eyebrow, heading, tiles, links }) => {
  const ids = (tiles || []).map((t) => idOf(t.service)).filter(Boolean)
  const list = ids.length ? await getServicesByIds(ids) : await getServices()

  const rows: Tile[] = list.map((s, i) => ({
    slug: s.slug,
    name: s.name,
    imageUrl: getServicePhoto(s.slug, i),
  }))

  if (!rows.length) return null

  const n = rows.length
  const cta = links?.[0]?.link

  return (
    <section>
      {/* No outer vertical padding — the panel's own (larger) padding handles the
          spacing; the horizontal inset still floats it like the hero media. */}
      <div className="px-3 sm:px-4">
        <div className="rounded-[8px] bg-card py-20 md:py-28">
          {/* Same 1600px centred content container as every other section */}
          <div className="container">
            {/* Header — eyebrow + heading (left), optional view-all button (top-right) */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                align="left"
                eyebrow={eyebrow || undefined}
                title={heading || ''}
                className="max-w-2xl"
              />
              {cta && (
                <Link href={resolveHref(cta)} className={cn(buttonSecondary, 'shrink-0')}>
                  <ButtonLabel>
                    {cta.label}
                    <ArrowUpRight className="size-4" />
                  </ButtonLabel>
                </Link>
              )}
            </div>

            {/* Balanced bento grid — one row height, wide tiles fill every row */}
            <div className="mt-8 grid auto-rows-[13rem] grid-cols-1 gap-3 sm:auto-rows-[20rem] sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-4">
              {rows.map((s, i) => (
                <Link
                  key={s.slug || i}
                  href={`/services/${s.slug}`}
                  aria-label={s.name}
                  className={cn(
                    'group/tile relative block h-full overflow-hidden rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                    isWide(i, n) && 'sm:col-span-2',
                  )}
                >
                  {/* Full-bleed image — LIGHT frosted-blue duotone at rest → full colour on
                      hover/focus. Reduced motion: full colour, no transition. */}
                  <Image
                    src={s.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover brightness-[0.96] grayscale-[0.45] transition-[filter] duration-500 ease-out group-hover/tile:brightness-100 group-hover/tile:grayscale-0 group-focus-visible/tile:brightness-100 group-focus-visible/tile:grayscale-0 motion-reduce:brightness-100 motion-reduce:grayscale-0 motion-reduce:transition-none"
                  />
                  {/* Light brand-blue tint completing the duotone (image still reads through) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-brand opacity-25 transition-opacity duration-500 group-hover/tile:opacity-0 group-focus-visible/tile:opacity-0 motion-reduce:opacity-0 motion-reduce:transition-none"
                  />
                  {/* White pill label (navy name + unified arrow chip), bottom-left */}
                  <span className="absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-sm bg-card py-2 pl-4 pr-2">
                    <span className="truncate text-base font-medium leading-tight text-foreground">
                      {s.name}
                    </span>
                    <span
                      aria-hidden
                      className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-brand/10 text-brand transition-colors duration-300 group-hover/tile:bg-brand group-hover/tile:text-white group-focus-visible/tile:bg-brand group-focus-visible/tile:text-white motion-reduce:transition-none"
                    >
                      {/* Arrow swap (matches the Services row): resting arrow exits
                          top-right while a second slides in from the bottom-left. */}
                      <ArrowUpRight
                        aria-hidden
                        className="size-[1.1rem] [grid-area:1/1] transition-transform duration-300 ease-out group-hover/tile:-translate-y-[150%] group-hover/tile:translate-x-[150%] group-focus-visible/tile:-translate-y-[150%] group-focus-visible/tile:translate-x-[150%] motion-reduce:transition-none"
                      />
                      <ArrowUpRight
                        aria-hidden
                        className="size-[1.1rem] -translate-x-[150%] translate-y-[150%] [grid-area:1/1] transition-transform duration-300 ease-out group-hover/tile:translate-x-0 group-hover/tile:translate-y-0 group-focus-visible/tile:translate-x-0 group-focus-visible/tile:translate-y-0 motion-reduce:transition-none"
                      />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
