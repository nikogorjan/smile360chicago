import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { ServicesGridBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { ServiceCard } from '@/components/site/cards'
import { getServices } from '@/lib/queries'

export const ServicesGridBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  align,
  source,
  limit,
  showViewAll,
  background,
}) => {
  let services = await getServices()
  if (source === 'featured') services = services.filter((s) => s.featured)
  if (limit) services = services.slice(0, limit)

  return (
    <Section tone={(background as 'default') || 'default'}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} featured={s.featured} />
          ))}
        </div>
        {showViewAll && (
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              View all services
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </Section>
  )
}
