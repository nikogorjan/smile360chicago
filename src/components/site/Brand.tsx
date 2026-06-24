import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { practice } from '@/lib/practice'

/**
 * Brand lockup — the official Smile360 Chicago logo (transparent PNG, works on
 * the white header and the dark footer alike). Size via the `className` height.
 */
export const Brand: React.FC<{ className?: string; priority?: boolean }> = ({
  className,
  priority,
}) => {
  return (
    <Link
      href="/"
      aria-label={`${practice.name} — home`}
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src="/smile360-new-logo.png"
        alt={practice.name}
        width={1254}
        height={1254}
        priority={priority}
        className={cn('h-11 w-auto rounded-xl sm:h-12', className)}
      />
    </Link>
  )
}
