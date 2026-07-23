import React from 'react'

import type { MastheadBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon } from '@/components/site/primitives'
import { ScrollParallax } from '@/components/site/ScrollParallax'
import { renderRichHeading } from '../_shared/richHeading'
import { spacingClass } from '../_shared/surface'
import { cn } from '@/utilities/ui'

// Literal object-position classes (Tailwind must see the full class names). The mobile
// focus applies at the base breakpoint; the desktop focus overrides it at md+.
const MOBILE_POS: Record<string, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  'top-left': 'object-left-top',
  'top-right': 'object-right-top',
  'bottom-left': 'object-left-bottom',
  'bottom-right': 'object-right-bottom',
}
const DESKTOP_POS: Record<string, string> = {
  center: 'md:object-center',
  top: 'md:object-top',
  bottom: 'md:object-bottom',
  left: 'md:object-left',
  right: 'md:object-right',
  'top-left': 'md:object-left-top',
  'top-right': 'md:object-right-top',
  'bottom-left': 'md:object-left-bottom',
  'bottom-right': 'md:object-right-bottom',
}

/**
 * About-page hero — mirrors the home hero: a full-bleed image card with a little
 * inset padding all around (p-3/p-4), the same tall height (92svh, clamped
 * 640–960px) and 8px radius, a tall dark gradient rising from the bottom, and the
 * content anchored bottom-left in the page container. The image settles from a
 * slight zoom on load.
 */
export const MastheadBlock: React.FC<Props> = ({
  facts,
  heading,
  lead,
  image,
  imageFocus,
  imageFocusMobile,
  caption,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const hasImage = image && typeof image !== 'string'
  // Content sits on the (dark) image — render the accent as the inverted underline.
  const headingEl = renderRichHeading(heading, true)
  const objectPos = cn(
    MOBILE_POS[imageFocusMobile || 'center'] || MOBILE_POS.center,
    DESKTOP_POS[imageFocus || 'center'] || DESKTOP_POS.center,
  )

  return (
    <section
      className={cn('relative', spacingClass({ paddingTop, paddingBottom, topGap, bottomGap }))}
    >
      <div className="p-3 sm:p-4">
        <div className="relative h-[92svh] max-h-[960px] min-h-[640px] overflow-hidden rounded-[8px]">
          {hasImage ? (
            <ScrollParallax className="absolute inset-0" amount={0.05}>
              <Media
                resource={image}
                fill
                imgClassName={cn(
                  'object-cover motion-safe:animate-[hero-zoom_1.6s_ease-out]',
                  objectPos,
                )}
                className="absolute inset-0"
              />
            </ScrollParallax>
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-primary">
              <DynamicIcon name="Image" className="size-12 text-white/30" />
            </div>
          )}

          {/* Strong dark gradient across the whole image (kept readable on light photos) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 via-45% to-black/15" />

          {caption && (
            <span className="absolute left-5 top-5 z-10 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur">
              {caption}
            </span>
          )}

          {/* Content — bottom-left, in the page container */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 sm:pb-14 lg:pb-20">
            <div className="container">
              <div className="max-w-3xl text-white">
                {headingEl && (
                  <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                    {headingEl}
                  </h1>
                )}

                {lead && (
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{lead}</p>
                )}

                {facts && facts.length > 0 && (
                  <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
                    {facts.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        {i > 0 && <span className="size-1 rounded-full bg-white/40" />}
                        {f.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
