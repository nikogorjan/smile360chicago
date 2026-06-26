import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { practice } from '@/lib/practice'

/**
 * Brand lockup — the official Smile360 Chicago logo (transparent PNG, works on
 * the white header and the dark footer alike). Size via the `className` height.
 */
const DEFAULT_LOGO = '/smile360-new-logo.png'

export const Brand: React.FC<{
  className?: string
  priority?: boolean
  /** CMS logo URLs; both fall back to the bundled default when empty. */
  lightSrc?: string | null
  darkSrc?: string | null
  alt?: string | null
}> = ({ className, priority, lightSrc, darkSrc, alt }) => {
  const base = 'h-11 w-auto rounded-xl sm:h-12'
  const light = lightSrc || DEFAULT_LOGO
  const dark = darkSrc || lightSrc || DEFAULT_LOGO
  return (
    <Link
      href="/"
      aria-label={`${practice.name} — home`}
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={light}
        alt={alt || practice.name}
        width={1254}
        height={1254}
        priority={priority}
        className={cn(base, className, 'dark:hidden')}
      />
      <Image
        src={dark}
        alt={alt || practice.name}
        width={1254}
        height={1254}
        priority={priority}
        className={cn(base, className, 'hidden dark:block')}
      />
    </Link>
  )
}
