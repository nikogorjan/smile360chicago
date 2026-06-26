'use client'

import { CalendarCheck, Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

/**
 * Sticky bottom action bar (mobile only). Call + Book are the two highest-value
 * actions for a dental practice on a phone — kept one tap away at all times.
 */
export const MobileCTA: React.FC<{ phoneHref: string }> = ({ phoneHref }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2">
        <Link
          href={phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-border bg-background py-3 text-sm font-bold text-foreground"
        >
          <Phone className="size-4 text-brand" />
          Call
        </Link>
        <Link
          href="/contact"
          className="flex flex-[1.4] items-center justify-center gap-2 rounded-sm bg-brand py-3 text-sm font-bold text-brand-foreground"
        >
          <CalendarCheck className="size-4" />
          Book Appointment
        </Link>
      </div>
    </div>
  )
}
