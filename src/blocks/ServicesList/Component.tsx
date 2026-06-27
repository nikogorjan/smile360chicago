import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { ServicesListBlock as Props } from '@/payload-types'
import { Section, SectionHeading, buttonSecondary } from '@/components/site/primitives'
import { ButtonLabel } from '@/components/ui/button'
import { getServices, getServicesByIds } from '@/lib/queries'
import { getServicePhoto } from '@/lib/stockImages'
import { resolveHref } from '@/lib/nav'
import { cn } from '@/utilities/ui'
import { ServicesListRows, type ServiceRow } from './ServicesListRows'

/**
 * Services editorial list — server component. Pulls from the Services collection
 * via a relationship picker (preserving the chosen order); if none are selected
 * it falls back to all services. Renders a heading with an optional top-right
 * button, then hands the rows to the client <ServicesListRows>, which adds the
 * scroll-driven single-active-row highlight.
 */
export const ServicesListBlock: React.FC<Props> = async ({ eyebrow, heading, services, links }) => {
  const ids = (services || [])
    .map((s) => (typeof s === 'object' && s ? String(s.id) : String(s)))
    .filter(Boolean)

  const list = ids.length ? await getServicesByIds(ids) : await getServices()

  if (!list.length) return null

  const rows: ServiceRow[] = list.map((s, i) => ({
    slug: s.slug,
    name: s.name,
    excerpt: s.excerpt,
    category: s.category,
    imageUrl: getServicePhoto(s.slug, i),
  }))

  const cta = links?.[0]?.link

  return (
    <Section>
      <div className="container">
        {/* Heading (left) + optional button (top-right) */}
        <div className="flex flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          {heading ? (
            <SectionHeading
              align="left"
              eyebrow={eyebrow || undefined}
              title={heading}
              className="max-w-2xl"
            />
          ) : (
            <div />
          )}
          {cta && (
            <Link href={resolveHref(cta)} className={cn(buttonSecondary, 'shrink-0')}>
              <ButtonLabel>
                {cta.label}
                <ArrowUpRight className="size-4" />
              </ButtonLabel>
            </Link>
          )}
        </div>

        <ServicesListRows rows={rows} />
      </div>
    </Section>
  )
}
