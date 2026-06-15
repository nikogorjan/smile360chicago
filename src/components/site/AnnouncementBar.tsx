'use client'

import { Siren, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const KEY = 'smile360-announce-dismissed'

/**
 * Dismissible promo bar driven by Site Settings. Leads with the emergency /
 * toothache angle to capture high-intent visitors immediately.
 */
export const AnnouncementBar: React.FC<{
  enabled: boolean
  text: string
  link: string
}> = ({ enabled, text, link }) => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    setHidden(window.localStorage.getItem(KEY) === '1')
  }, [])

  if (!enabled || hidden) return null

  return (
    <div className="relative bg-emergency text-emergency-foreground">
      <div className="container flex items-center justify-center gap-2 py-2 pr-8 text-center text-xs font-semibold sm:text-sm">
        <Siren className="size-4 shrink-0 animate-pulse" />
        <span>
          {text}{' '}
          <Link href={link} className="underline underline-offset-2 hover:no-underline">
            Same-day emergency care →
          </Link>
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(KEY, '1')
          setHidden(true)
        }}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors hover:bg-white/15"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
