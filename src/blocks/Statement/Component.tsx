import React from 'react'

import type { StatementBlock as Props } from '@/payload-types'
import { Eyebrow, Section } from '@/components/site/primitives'
import { toneClasses } from '../_shared/tone'
import { withHighlight } from '../_shared/highlight'
import { cn } from '@/utilities/ui'

export const StatementBlock: React.FC<Props> = ({
  eyebrow,
  statement,
  highlight,
  subline,
  attribution,
  align,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const { wrapper, invert } = toneClasses(background)
  const centered = align !== 'left'

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} className={wrapper}>
      <div className={cn('container', centered && 'text-center')}>
        <div className={cn('max-w-4xl', centered && 'mx-auto')}>
          {eyebrow && (
            <Eyebrow tone={invert ? 'dark' : 'light'} className="mb-5">
              {eyebrow}
            </Eyebrow>
          )}

          {statement && (
            <p
              className={cn(
                'font-display text-pretty text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-5xl',
                invert ? 'text-white' : 'text-foreground',
              )}
            >
              {withHighlight(statement, highlight, invert ? 'text-white/60' : 'text-brand')}
            </p>
          )}

          {subline && (
            <p
              className={cn(
                'mt-6 max-w-2xl text-lg leading-relaxed',
                centered && 'mx-auto',
                invert ? 'text-white/75' : 'text-muted-foreground',
              )}
            >
              {subline}
            </p>
          )}

          {attribution && (
            <p
              className={cn(
                'mt-8 text-xs font-semibold uppercase tracking-[0.18em]',
                invert ? 'text-white/60' : 'text-muted-foreground',
              )}
            >
              {attribution}
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}
