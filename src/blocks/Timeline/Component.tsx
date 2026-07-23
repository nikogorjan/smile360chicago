import React from 'react'

import type { TimelineBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { TimelineSteps } from './TimelineSteps'

/** `bare` renders just the content (no Section/container) for use inside a shared Panel. */
export const TimelineBlock: React.FC<Props & { bare?: boolean }> = ({
  eyebrow,
  heading,
  description,
  align,
  items,
  background,
  bare,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const list = items || []

  const content = (
    <>
      {(eyebrow || heading || description) && (
        <SectionHeading
          align={align === 'left' ? 'left' : 'center'}
          eyebrow={eyebrow || undefined}
          title={heading || ''}
          description={description || undefined}
        />
      )}

      <TimelineSteps items={list} />
    </>
  )

  if (bare) return content

  return (
    <Section
      tone={background}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      topGap={topGap}
      bottomGap={bottomGap}
    >
      <div className="container">{content}</div>
    </Section>
  )
}
