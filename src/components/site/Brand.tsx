import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { practice } from '@/lib/practice'

/**
 * Smile360 brand lockup — a rounded gradient badge with a tooth + 360 arc,
 * paired with the wordmark. Works in both light and dark themes.
 */
export const Brand: React.FC<{ className?: string; compact?: boolean }> = ({
  className,
  compact,
}) => {
  return (
    <Link
      href="/"
      aria-label={`${practice.name} — home`}
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="size-6 text-white" fill="none" aria-hidden>
          <path
            d="M12 4.2c-1.6-1.1-3-1.5-4.3-1.2C5.4 3.6 4 5.7 4 8.4c0 2 .5 3.6 1 5.3.5 1.7.7 3.4 1 4.8.3 1.4.8 2.3 1.6 2.3.9 0 1.1-1 1.4-2.4.2-1.1.4-2.2 1-2.2s.8 1.1 1 2.2c.3 1.4.5 2.4 1.4 2.4.8 0 1.3-.9 1.6-2.3.3-1.4.5-3.1 1-4.8.5-1.7 1-3.3 1-5.3 0-2.7-1.4-4.8-3.7-5.4C15 2.7 13.6 3.1 12 4.2Z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-white ring-2 ring-accent" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            Smile<span className="text-brand">360</span>
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Chicago Dental
          </span>
        </span>
      )}
    </Link>
  )
}
