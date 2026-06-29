import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { PageHeroBlock as Props } from '@/payload-types'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Eyebrow } from '@/components/site/primitives'
import { resolveHref } from '@/lib/nav'
import { cn } from '@/utilities/ui'

/**
 * Interior-page header. Matches the homepage system: a centered eyebrow (brand dot),
 * a serif display heading (font-display), navy body, and the shared button styles —
 * sitting open on the page canvas like a homepage section header. The `emergency`
 * variant becomes a floating red rounded panel (8px radius, inset), the one place
 * emergency red is allowed. No motion, so nothing to guard.
 */
export const PageHeroBlock: React.FC<Props> = ({ eyebrow, heading, description, variant, links }) => {
  const emergency = variant === 'emergency'

  const content = (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow &&
        (emergency ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
            {eyebrow}
          </span>
        ) : (
          <Eyebrow>{eyebrow}</Eyebrow>
        ))}

      <h1
        className={cn(
          'mt-5 text-pretty font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]',
          emergency ? 'text-white' : 'text-foreground',
        )}
      >
        {heading}
      </h1>

      {description && (
        <p
          className={cn(
            'mx-auto mt-5 max-w-2xl text-lg leading-relaxed',
            emergency ? 'text-white/85' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}

      {links && links.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l, i) =>
            l.link ? (
              <Link
                key={i}
                href={resolveHref(l.link)}
                className={
                  i === 0
                    ? emergency
                      ? buttonVariants({ variant: 'white', className: 'font-bold text-emergency' })
                      : buttonVariants({ variant: 'default', className: 'font-bold' })
                    : emergency
                      ? buttonVariants({ variant: 'outlineWhite', className: 'font-bold' })
                      : buttonVariants({ variant: 'outline', className: 'font-bold' })
                }
              >
                <ButtonLabel>
                  {i > 0 && <Phone className="size-4" />}
                  {l.link.label}
                </ButtonLabel>
              </Link>
            ) : null,
          )}
        </div>
      )}
    </div>
  )

  if (emergency) {
    return (
      <section className="px-3 pt-6 sm:px-4">
        <div className="overflow-hidden rounded-[8px] bg-emergency text-emergency-foreground">
          <div className="container py-16 sm:py-20">{content}</div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="container py-16 sm:py-20 lg:py-24">{content}</div>
    </section>
  )
}
