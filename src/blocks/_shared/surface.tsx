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
 * Padding maps to the same presets as the `Section` primitive so the CMS Spacing
 * controls behave consistently. Every value is theme-aware via CSS-var tokens.
 */
const PAD_T = { none: 'pt-0', sm: 'pt-10 md:pt-14', md: 'pt-20 md:pt-28', lg: 'pt-28 md:pt-36' } as const
const PAD_B = { none: 'pb-0', sm: 'pb-10 md:pb-14', md: 'pb-20 md:pb-28', lg: 'pb-28 md:pb-36' } as const
type Pad = keyof typeof PAD_T

export const surfaceInvert = (surface?: string | null): boolean => surface === 'brand'

export const SectionShell: React.FC<
  React.PropsWithChildren<{
    surface?: string | null
    paddingTop?: string | null
    paddingBottom?: string | null
    className?: string
    containerClassName?: string
    id?: string
  }>
> = ({ surface, paddingTop, paddingBottom, className, containerClassName, id, children }) => {
  const pt = PAD_T[(paddingTop as Pad) ?? 'md'] || PAD_T.md
  const pb = PAD_B[(paddingBottom as Pad) ?? 'md'] || PAD_B.md

  if (surface === 'panel') {
    return (
      <section id={id} className={cn('px-3 sm:px-4', className)}>
        <div className={cn('rounded-[8px] bg-card', pt, pb)}>
          <div className={cn('container', containerClassName)}>{children}</div>
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
    <section id={id} className={cn(pt, pb, band, className)}>
      <div className={cn('container', containerClassName)}>{children}</div>
    </section>
  )
}
