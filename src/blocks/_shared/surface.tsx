import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Section shell for the About-page blocks. Renders one of four "surfaces":
 *  - canvas : open on the page canvas (transparent)
 *  - panel  : the white rounded inset card that floats on the canvas — identical
 *             to the homepage Panel (px-3/px-4 inset, rounded-[8px] bg-card, big py)
 *  - muted  : full-width grey band
 *  - brand  : full-width cobalt band (white text — `surfaceInvert` returns true)
 *
 * `paddingTop`/`paddingBottom` control the space inside the section (or card).
 * `bottomGap` adds extra margin BELOW the whole section (e.g. to lift the last
 * block off the footer). `backdrop` renders a FULL-BLEED decorative layer behind
 * the content — clipped to the section/card edges, not the inner 1600px container —
 * so background effects fill the band instead of being sliced at the container.
 */
const PAD_T = { none: 'pt-0', xs: 'pt-6', sm: 'pt-10 md:pt-14', md: 'pt-20 md:pt-28', lg: 'pt-28 md:pt-36' } as const
const PAD_B = { none: 'pb-0', xs: 'pb-6', sm: 'pb-10 md:pb-14', md: 'pb-20 md:pb-28', lg: 'pb-28 md:pb-36' } as const
const MB = { none: '', xs: 'mb-6', sm: 'mb-10', md: 'mb-16', lg: 'mb-28', xl: 'mb-40' } as const
type Pad = keyof typeof PAD_T
type Gap = keyof typeof MB

export const surfaceInvert = (surface?: string | null): boolean => surface === 'brand'

export const SectionShell: React.FC<
  React.PropsWithChildren<{
    surface?: string | null
    paddingTop?: string | null
    paddingBottom?: string | null
    bottomGap?: string | null
    backdrop?: React.ReactNode
    className?: string
    containerClassName?: string
    id?: string
  }>
> = ({
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
  backdrop,
  className,
  containerClassName,
  id,
  children,
}) => {
  const pt = PAD_T[(paddingTop as Pad) ?? 'md'] || PAD_T.md
  const pb = PAD_B[(paddingBottom as Pad) ?? 'md'] || PAD_B.md
  const mb = MB[(bottomGap as Gap) ?? 'none'] || ''

  if (surface === 'panel') {
    // The outer `pb` baseline + optional `mb` (Gap below) let the white card float
    // above whatever follows (e.g. the footer) instead of butting flush against it.
    return (
      <section id={id} className={cn('px-3 pb-10 sm:px-4 sm:pb-14', mb, className)}>
        <div className={cn('relative overflow-hidden rounded-[8px] bg-card', pt, pb)}>
          {backdrop}
          <div className={cn('container relative', containerClassName)}>{children}</div>
        </div>
      </section>
    )
  }

  const band =
    surface === 'brand'
      ? 'bg-primary text-primary-foreground'
      : surface === 'muted'
        ? 'bg-muted'
        : ''

  return (
    <section id={id} className={cn('relative', backdrop && 'overflow-hidden', pt, pb, mb, band, className)}>
      {backdrop}
      <div className={cn('container relative', containerClassName)}>{children}</div>
    </section>
  )
}
