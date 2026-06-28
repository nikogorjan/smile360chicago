'use client'

import { Phone } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

/**
 * Sticky bottom action bar (mobile only). A single tap-to-call button showing the
 * number — the highest-value action for a dental practice on a phone.
 */
export const MobileCTA: React.FC<{ phone: string; phoneHref: string }> = ({
  phone,
  phoneHref,
}) => {
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
      <Link
        href={phoneHref}
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-brand py-3 text-sm font-bold text-brand-foreground"
      >
        <Phone className="size-4" />
        Call {phone}
      </Link>
    </div>
  )
}
