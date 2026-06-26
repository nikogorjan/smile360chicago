import { ArrowUpRight, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { ServicesGridBlock as Props } from '@/payload-types'
import { Section, SectionHeading, buttonPrimary, cardSurface } from '@/components/site/primitives'
import { getServices } from '@/lib/queries'
import { getServicePhoto } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

export const ServicesGridBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  source,
  limit,
}) => {
  let services = await getServices()
  if (source === 'featured') services = services.filter((s) => s.featured)
  services = services.slice(0, limit || 6)

  return (
    <Section>
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow={eyebrow || undefined}
          title={heading || ''}
          description={description || undefined}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* tall intro card — light surface, cobalt as accent only */}
          <div className={cn(cardSurface, 'flex flex-col justify-between gap-10 p-8')}>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-brand">
              <Plus className="size-6" />
            </span>
            <div>
              <p className="font-display font-semibold text-3xl leading-tight tracking-tight text-foreground">
                Gentle care for every smile
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Preventive, cosmetic, restorative and emergency dentistry — all in one calm, modern
                place.
              </p>
              <Link href="/contact" className={cn(buttonPrimary, 'mt-6')}>
                Book appointment
              </Link>
            </div>
          </div>

          {/* service photo cards */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={cn(cardSurface, 'group relative aspect-[3/2] overflow-hidden')}
              >
                <Image
                  src={getServicePhoto(service.slug, index)}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 right-3 inline-flex items-center justify-between gap-1.5 rounded-xl bg-card px-4 py-2.5 text-sm font-semibold text-foreground">
                  {service.name}
                  <ArrowUpRight className="size-4 shrink-0 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
