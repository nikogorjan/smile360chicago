import { Navigation } from 'lucide-react'
import React from 'react'

import type { MapBandBlock as Props } from '@/payload-types'
import { practice } from '@/lib/practice'
import { cn } from '@/utilities/ui'
import { spacingClass } from '../_shared/surface'

const heightClass: Record<string, string> = {
  medium: 'h-[38vh] sm:h-[46vh]',
  large: 'h-[48vh] sm:h-[58vh]',
  tall: 'h-[60vh] sm:h-[72vh]',
}

// Negative top margin that cancels the bottom padding of the block above, so the map's top
// gap matches its own 16px side inset. Panels use pb-10/pb-14; full sections use pb-20/pb-28.
const pullClass: Record<string, string> = {
  none: '',
  panel: '-mt-10 sm:-mt-14',
  section: '-mt-20 md:-mt-28',
}

export const MapBandBlock: React.FC<Props> = ({
  mapAddress,
  height,
  tightenTop,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const address = mapAddress || practice.address.full
  const h = heightClass[height || 'large'] || heightClass.large
  const pull = pullClass[tightenTop || 'none'] || ''
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <section
      className={cn(
        'relative',
        pull,
        spacingClass({ paddingTop, paddingBottom, topGap, bottomGap }),
      )}
    >
      {/* Small even inset all around → the map floats as a rounded card, full-width */}
      <div className="p-3 sm:p-4">
        <div
          className={cn('relative overflow-hidden rounded-[8px] border border-border bg-muted', h)}
        >
          <iframe
            title="Practice location map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-sm font-semibold text-foreground shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
          >
            <Navigation className="size-3.5 text-brand" />
            Get directions
          </a>
        </div>
      </div>
    </section>
  )
}
