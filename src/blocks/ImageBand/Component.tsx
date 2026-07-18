import Image from 'next/image'
import React from 'react'

import type { ImageBandBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow } from '@/components/site/primitives'
import { ScrollParallax } from '@/components/site/ScrollParallax'
import { stockPhotos } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

/** Responsive band heights — shorter on mobile so it never feels overly tall. */
const heightClass: Record<string, string> = {
  medium: 'h-[36vh] sm:h-[44vh]',
  large: 'h-[46vh] sm:h-[60vh]',
  full: 'h-[58vh] sm:h-[74vh]',
}

/**
 * Image band — a single practice photo (e.g. the practice building). Rather than full-bleed,
 * it floats as an inset card: a small even padding all around (p-3/p-4) and 8px rounded,
 * clipped corners (matching the hero images and the "Our Promise" panel). Object-cover
 * cropped at any width with a fixed responsive height, and lazy-loaded. Optional overlay
 * text (eyebrow + heading) renders over a subtle dark scrim; leave it empty for just the
 * photo. The photo drifts with scroll (parallax).
 */
export const ImageBandBlock: React.FC<Props> = ({ image, alt, caption, height, overlayText }) => {
  const hasImage = image && typeof image !== 'string'
  const h = heightClass[height || 'large'] || heightClass.large
  const eyebrow = overlayText?.eyebrow
  const heading = overlayText?.heading
  const hasOverlay = Boolean(eyebrow || heading)

  return (
    <section className="relative">
      {/* Small even inset all around → the photo floats as a rounded card, not full-bleed */}
      <div className="p-3 sm:p-4">
        <div className={cn('relative overflow-hidden rounded-[8px]', h)}>
          {/* Cover photo (lazy-loaded), drifting with scroll */}
          <ScrollParallax className="absolute inset-0" amount={0.1}>
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
          </ScrollParallax>

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
        </div>
      </div>
    </section>
  )
}
