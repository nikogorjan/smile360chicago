import React from 'react'

import type { FounderLetterBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const FounderLetterBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  body,
  portrait,
  signature,
  role,
  surface,
  paddingTop,
  paddingBottom,
}) => {
  const invert = surfaceInvert(surface)
  const hasPortrait = portrait && typeof portrait !== 'string'
  const headingEl = renderRichHeading(heading, invert)
  const paras = (body || '')
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <div className="mx-auto max-w-3xl">
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

        <div className={cn('mt-8 space-y-5 text-lg leading-relaxed', invert ? 'text-white/85' : 'text-foreground/85')}>
          {paras.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.7] first-letter:text-brand'
                  : undefined
              }
            >
              {p}
            </p>
          ))}
        </div>

        {(signature || role || hasPortrait) && (
          <div className="mt-10 flex items-center gap-4">
            {hasPortrait && (
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-border">
                <Media resource={portrait} fill imgClassName="object-cover" className="absolute inset-0" />
              </div>
            )}
            <div>
              {signature && (
                <p className={cn('font-display text-2xl leading-none', invert ? 'text-white' : 'text-foreground')}>
                  {signature}
                </p>
              )}
              {role && (
                <p
                  className={cn(
                    'mt-1.5 text-xs font-semibold uppercase tracking-[0.18em]',
                    invert ? 'text-white/60' : 'text-muted-foreground',
                  )}
                >
                  {role}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  )
}
