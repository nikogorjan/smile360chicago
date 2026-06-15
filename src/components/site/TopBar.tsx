import { Clock, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { SiteData } from '@/lib/getSiteSettings'

/**
 * Top utility banner — the client's #1 requirement.
 * Always-visible bar with the phone number (click-to-call), address and hours.
 * All values come from the editable Site Settings global.
 */
export const TopBar: React.FC<{ site: SiteData }> = ({ site }) => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex h-auto flex-col items-center justify-between gap-1 py-1.5 text-xs sm:h-9 sm:flex-row sm:py-0">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-0.5">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0 opacity-80" />
            <span className="opacity-95">{site.address.full}</span>
          </span>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <Clock className="size-3.5 shrink-0 opacity-80" />
            <span className="opacity-95">Open 6 days a week · New patients welcome</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={site.phoneHref}
            className="group inline-flex items-center gap-1.5 font-bold transition-opacity hover:opacity-90"
          >
            <span className="grid size-5 place-items-center rounded-full bg-primary-foreground/15 transition-transform group-hover:scale-110">
              <Phone className="size-3" />
            </span>
            <span>Call {site.phone}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
