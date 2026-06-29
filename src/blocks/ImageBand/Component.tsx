import Image from 'next/image'
import React from 'react'

import type { ImageBandBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/primitives'
import { stockPhotos } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

/** Responsive band heights — shorter on mobile so it never feels overly tall. */
const heightClass: Record<string, string> = {
  medium: 'h-[36vh] sm:h-[44vh]',
  large: 'h-[46vh] sm:h-[60vh]',
  full: 'h-[58vh] sm:h-[74vh]',
}

/**
 * Full-width image band — a single edge-to-edge photo (e.g. the practice building).
 * Full-bleed (NOT inside the 1600px container, no inset, no rounded corners), object-cover
 * cropped at any width with a fixed responsive height, and lazy-loaded. Optional overlay
 * text (eyebrow + heading) renders over a subtle dark scrim; leave it empty for just the
 * photo. Static for now — no parallax / zoom.
 */
export const ImageBandBlock: React.FC<Props> = ({ image, alt, caption, height, overlayText }) => {
  const hasImage = image && typeof image !== 'string'
  const h = heightClass[height || 'large'] || heightClass.large
  const eyebrow = overlayText?.eyebrow
  const heading = overlayText?.heading
  const hasOverlay = Boolean(eyebrow || heading)

  return (
    <section className={cn('relative w-full overflow-hidden', h)}>
      {/* Full-bleed cover photo (lazy-loaded) */}
      {hasImage ? (
        <Media
          resource={image}
          alt={alt || undefined}
          fill
          size="100vw"
          loading="lazy"
          imgClassName="object-cover"
          className="absolute inset-0"
        />
      ) : (
        <Image
          src={stockPhotos.officeBright}
          alt={alt || ''}
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      )}

      {/* Optional overlay text over a subtle dark scrim for legibility */}
      {hasOverlay && (
        <>
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
              {heading && (
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {heading}
                </h2>
              )}
            </div>
          </div>
        </>
      )}

      {/* Optional small caption */}
      {caption && (
        <p className="absolute bottom-3 right-4 z-10 text-xs text-white/85 [text-shadow:0_1px_3px_rgb(0_0_0/0.6)]">
          {caption}
        </p>
      )}
    </section>
  )
}
