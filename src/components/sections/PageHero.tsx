import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Eyebrow } from '@/components/site/primitives'

/**
 * Shared interior-page header for the hand-coded routes (service detail, blog).
 * Mirrors the PageHero block: brand-dot eyebrow, serif display heading, navy body,
 * open on the page canvas — consistent with the homepage system. No motion.
 */
export const PageHero: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumb?: { label: string; href: string }[]
  children?: React.ReactNode
}> = ({ eyebrow, title, description, breadcrumb, children }) => {
  return (
    <section>
      <div className="container py-16 sm:py-20 lg:py-24">
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center gap-1 text-xs text-muted-foreground"
          >
            {breadcrumb.map((b, i) => (
              <React.Fragment key={b.href}>
                {i > 0 && <ChevronRight className="size-3" />}
                <Link href={b.href} className="transition-colors hover:text-brand">
                  {b.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-5 text-pretty font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  )
}
