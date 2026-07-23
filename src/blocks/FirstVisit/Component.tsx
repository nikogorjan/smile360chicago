import React from 'react'

import type { FirstVisitBlock as Props } from '@/payload-types'
import { Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'
import { FirstVisitSteps } from './FirstVisitSteps'

export const FirstVisitBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  steps,
  surface,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const stepList = steps || []

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} topGap={topGap} bottomGap={bottomGap}>
      {/* Centred header */}
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}

        {headingEl && (
          <h2
            className={cn(
              'mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {headingEl}
          </h2>
        )}

        {intro && (
          <p className={cn('mt-4 text-base leading-relaxed', invert ? 'text-white/80' : 'text-muted-foreground')}>
            {intro}
          </p>
        )}
      </div>

      {/* Connected step journey — the line draws in on scroll (client) */}
      {stepList.length > 0 && <FirstVisitSteps steps={stepList} invert={invert} />}
    </SectionShell>
  )
}
