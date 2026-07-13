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
}) => {
  const invert = surfaceInvert(surface)
  const statementEl = renderRichHeading(statement, invert)

  return (
    <SectionShell
      surface={surface}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      containerClassName="text-center"
    >
      <div className="mx-auto max-w-4xl">
        {eyebrow && (
          <div className="mb-6 flex justify-center">
            <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>
          </div>
        )}
        {statementEl && (
          <p
            className={cn(
              'text-balance font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {statementEl}
          </p>
        )}
        {footnote && (
          <p className={cn('mx-auto mt-8 max-w-xl text-base', invert ? 'text-white/70' : 'text-muted-foreground')}>
            {footnote}
          </p>
        )}
      </div>
    </SectionShell>
  )
}
