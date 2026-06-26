import { Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { SiteData } from '@/lib/getSiteSettings'

/**
 * Single slim utility strip — the ONLY thing above the floating nav.
 *
 * Merges what used to be two stacked bars (red emergency promo + blue NAP/phone)
 * into one line: NAP on the left (the client's #1 requirement, always visible),
 * the same-day-emergency angle + click-to-call on the right (inline, no longer
 * its own red bar). All values come from the editable Site Settings global.
 */
export const TopBar: React.FC<{ site: SiteData }> = ({ site }) => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between gap-3 py-2.5 text-xs sm:text-sm">
        {/* Left — NAP (always visible) */}
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-0.5">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0 opacity-80" />
            <span className="truncate opacity-95">{site.address.full}</span>
          </span>
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <Clock className="size-3.5 shrink-0 opacity-80" />
            <span className="opacity-95">Open 6 days a week · New patients welcome</span>
          </span>
        </div>

        {/* Right — emergency angle (inline) + click-to-call */}
        <div className="flex shrink-0 items-center gap-3">
          {site.announcement.enabled && (
            <>
              <Link
                href={site.announcement.link}
                className="hidden items-center gap-1 font-medium underline-offset-2 transition-opacity hover:underline hover:opacity-90 sm:inline-flex"
              >
                <span aria-hidden>🦷</span>
                Same-day emergency care
                <span aria-hidden>→</span>
              </Link>
              <span className="hidden opacity-40 sm:inline" aria-hidden>
                ·
              </span>
            </>
          )}
          <Link
            href={site.phoneHref}
            className="inline-flex items-center gap-1.5 font-bold transition-opacity hover:opacity-90"
          >
            Call {site.phone}
          </Link>
        </div>
      </div>
    </div>
  )
}
