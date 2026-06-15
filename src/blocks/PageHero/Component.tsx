import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { PageHeroBlock as Props } from '@/payload-types'
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
          : 'relative overflow-hidden border-b border-border bg-brand-glow'
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-25 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
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
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{heading}</h1>
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
                          ? 'inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emergency transition-transform hover:-translate-y-0.5'
                          : 'inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5'
                        : emergency
                          ? 'inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10'
                          : 'inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-brand hover:text-brand'
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
