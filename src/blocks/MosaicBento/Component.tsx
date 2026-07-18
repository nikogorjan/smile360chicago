import React from 'react'

import type { MosaicBentoBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow, Section } from '@/components/site/primitives'
import { toneClasses } from '../_shared/tone'
import { withHighlight } from '../_shared/highlight'
import { cn } from '@/utilities/ui'

type Tile = NonNullable<Props['tiles']>[number]

/** Per-tile surface — solid tones fall back to the white card look. */
function tileTone(tone?: string | null): { cls: string; invert: boolean } {
  switch (tone) {
    case 'brand':
      return { cls: 'bg-primary text-primary-foreground', invert: true }
    case 'muted':
      return { cls: 'bg-muted', invert: false }
    case 'glow':
      return { cls: 'bg-brand-soft', invert: false }
    default:
      return { cls: 'border border-border bg-card', invert: false }
  }
}

const spanClass = (size?: string | null) =>
  size === 'wide' ? 'sm:col-span-2' : size === 'tall' ? 'lg:row-span-2' : ''

const TileInner: React.FC<{ tile: Tile }> = ({ tile }) => {
  // Photo tile — rounded image with a gradient scrim + label chip.
  if (tile.type === 'photo') {
    const hasImage = tile.image && typeof tile.image !== 'string'
    return (
      <div className="group relative h-full w-full overflow-hidden">
        {hasImage ? (
          <Media
            resource={tile.image}
            fill
            imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
            className="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
            <DynamicIcon name="Image" className="size-8 opacity-40" />
          </div>
        )}
        {tile.label && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-card px-3.5 py-1.5 text-sm font-medium text-foreground">
              {tile.label}
            </span>
          </>
        )}
      </div>
    )
  }

  const { invert } = tileTone(tile.tone)

  // Stat tile — big centered number.
  if (tile.type === 'stat') {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        {tile.statValue && (
          <p
            className={cn(
              'font-display text-5xl font-bold leading-none tracking-tight lg:text-6xl',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {tile.statValue}
          </p>
        )}
        {tile.statLabel && (
          <p className={cn('mt-3 max-w-[14rem] text-sm', invert ? 'text-white/75' : 'text-muted-foreground')}>
            {tile.statLabel}
          </p>
        )}
      </div>
    )
  }

  // Value tile — icon top, title + body bottom.
  return (
    <div className="flex h-full flex-col p-6 md:p-7">
      {tile.icon && (
        <span
          className={cn(
            'grid size-11 shrink-0 place-items-center rounded-sm',
            invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
          )}
        >
          <DynamicIcon name={tile.icon} className="size-5" />
        </span>
      )}
      <div className="mt-auto pt-8">
        {tile.title && (
          <h3
            className={cn(
              'font-display text-xl font-semibold leading-tight',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {tile.title}
          </h3>
        )}
        {tile.body && (
          <p className={cn('mt-2 text-sm leading-relaxed', invert ? 'text-white/75' : 'text-muted-foreground')}>
            {tile.body}
          </p>
        )}
      </div>
    </div>
  )
}

export const MosaicBentoBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  highlight,
  description,
  tiles,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const { wrapper, invert } = toneClasses(background)
  const items = tiles || []

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} className={wrapper}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <div className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'} className="mb-3">{eyebrow}</Eyebrow>}
            {heading && (
              <h2
                className={cn(
                  'font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl',
                  invert ? 'text-white' : 'text-foreground',
                )}
              >
                {withHighlight(heading, highlight, invert ? 'text-white/60' : 'text-brand')}
              </h2>
            )}
            {description && (
              <p className={cn('mt-4 text-lg leading-relaxed', invert ? 'text-white/75' : 'text-muted-foreground')}>
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[248px] lg:grid-flow-dense lg:grid-cols-3">
          {items.map((tile, i) => {
            const { cls } = tileTone(tile.tone)
            const isPhoto = tile.type === 'photo'
            return (
              <div
                key={i}
                className={cn(
                  'min-h-[220px] overflow-hidden rounded-2xl transition-colors',
                  spanClass(tile.size),
                  isPhoto ? 'border border-border' : cls,
                )}
              >
                <TileInner tile={tile} />
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
