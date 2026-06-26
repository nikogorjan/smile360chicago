import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { PageHeroBlock as Props } from '@/payload-types'
import { buttonVariants } from '@/components/ui/button'
import { resolveHref } from '@/lib/nav'

export const PageHeroBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  variant,
  links,
}) => {
  const emergency = variant === 'emergency'
  return (
    <section
      className={
        emergency
          ? 'relative overflow-hidden border-b border-border bg-emergency text-emergency-foreground'
          : 'relative overflow-hidden border-b border-border bg-cream'
      }
    >
      <div className="container relative py-14 lg:py-20">
        <div className="mx-auto max-w-3xl text-center reveal">
          {eyebrow && (
            <span
              className={
                emergency
                  ? 'inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider'
                  : 'eyebrow'
              }
            >
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{heading}</h1>
          {description && (
            <p
              className={
                emergency
                  ? 'mt-4 text-lg leading-relaxed text-emergency-foreground/90'
                  : 'mt-4 text-lg leading-relaxed text-muted-foreground'
              }
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
                    {i > 0 && <Phone className="size-4" />}
                    {l.link.label}
                  </Link>
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
