import React from 'react'

import type { FounderLetterBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { ScrollParallax } from '@/components/site/ScrollParallax'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const FounderLetterBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  quote,
  portrait,
  signature,
  role,
  image,
  imageSide,
  surface,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const hasPortrait = portrait && typeof portrait !== 'string'
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'
  const headingEl = renderRichHeading(heading, invert)
  // Split on any run of newlines so paragraphs separate whether the founder pressed
  // Enter once or twice between them.
  const quoteParas = (quote || '')
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} topGap={topGap} bottomGap={bottomGap}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Content */}
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

          {/* The founder's words, with an oversized quote mark. Renders paragraphs at
              a readable body size (works for a short pull-quote or a longer note). */}
          {quoteParas.length > 0 && (
            <figure className="relative mt-6">
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -left-2 -top-6 select-none font-display text-6xl leading-none',
                  invert ? 'text-white/15' : 'text-brand/15',
                )}
              >
                &ldquo;
              </span>
              <blockquote
                className={cn(
                  'relative space-y-4 pl-2 text-base leading-relaxed md:text-xl',
                  invert ? 'text-white/90' : 'text-foreground/90',
                )}
              >
                {quoteParas.map((p, i) => (
                  <p key={i}>{p.replace(/\*/g, '')}</p>
                ))}
              </blockquote>
            </figure>
          )}

          {(signature || role || hasPortrait) && (
            <div className="mt-9 flex items-center gap-4">
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

        {/* Photo — drifts with scroll (parallax), no hover scale */}
        <div className={cn('relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          {hasImage ? (
            <ScrollParallax className="aspect-[4/5] rounded-[8px] border border-border" amount={0.06}>
              <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
            </ScrollParallax>
          ) : (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-border">
              <div className="absolute inset-0 grid place-items-center bg-brand-soft text-brand">
                <DynamicIcon name="Image" className="size-10 opacity-40" />
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
