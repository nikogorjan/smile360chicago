import React from 'react'

import type { FounderLetterBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
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
  image,
  imageSide,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const hasPortrait = portrait && typeof portrait !== 'string'
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'
  const headingEl = renderRichHeading(heading, invert)
  const paras = (body || '')
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Letter content */}
        <div className={cn('max-w-xl', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
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

        {/* Photo */}
        <div className={cn('group relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-border">
            {hasImage ? (
              <Media
                resource={image}
                fill
                imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
                <DynamicIcon name="Image" className="size-10 opacity-40" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
