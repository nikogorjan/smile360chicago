import React from 'react'

import type { ManifestoBlock as Props } from '@/payload-types'
import { Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const ManifestoBlock: React.FC<Props> = ({
  eyebrow,
  statement,
  footnote,
  surface,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  // Render the cobalt statement as an inset rounded card (floats with 8px corners +
  // padding), rather than a full-bleed band — a "brand" surface maps to "brandPanel".
  const effectiveSurface = surface === 'brand' ? 'brandPanel' : surface
  const invert = surfaceInvert(effectiveSurface)
  const statementEl = renderRichHeading(statement, invert)

  // Full-bleed depth layer — concentric focus rings + a soft central glow. Rendered
  // as the section backdrop, so it fills the whole cobalt band and is clipped only
  // at the band's own edges (never sliced at the 1600px container). The circles are
  // centred via grid (so the pulse's scale doesn't fight a translate) and breathe
  // with the shared `beacon-pulse` keyframe — reduced-motion-safe, slightly out of
  // sync so it feels alive rather than mechanical.
  const backdrop = (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="col-start-1 row-start-1 size-[54rem] rounded-full border border-white/[0.06] motion-safe:animate-[beacon-pulse_9s_ease-in-out_infinite]" />
      <div className="col-start-1 row-start-1 size-[38rem] rounded-full border border-white/[0.09] motion-safe:animate-[beacon-pulse_7s_ease-in-out_infinite]" />
      <div className="col-start-1 row-start-1 size-[26rem] rounded-full bg-white/[0.07] blur-[90px] motion-safe:animate-[beacon-pulse_8s_ease-in-out_infinite]" />
    </div>
  )

  return (
    <SectionShell
      surface={effectiveSurface}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      topGap={topGap} bottomGap={bottomGap}
      backdrop={backdrop}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center py-4 text-center md:py-10">
        {eyebrow && (
          <div className="mb-8">
            <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>
          </div>
        )}
        {statementEl && (
          <p
            className={cn(
              'text-balance font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {statementEl}
          </p>
        )}
        {footnote && (
          <p
            className={cn(
              'mx-auto mt-10 max-w-md text-sm font-semibold uppercase tracking-[0.18em]',
              invert ? 'text-white/55' : 'text-muted-foreground',
            )}
          >
            {footnote}
          </p>
        )}
      </div>
    </SectionShell>
  )
}
