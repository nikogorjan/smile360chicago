import { CalendarCheck, Clock, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { FinalCtaBlock as Props } from '@/payload-types'
import { getSiteData } from '@/lib/getSiteSettings'

export const FinalCtaBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  primaryLabel,
  primaryHref,
  showMap,
}) => {
  const site = await getSiteData()
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              {eyebrow && (
                <span className="eyebrow border-white/30 bg-white/10 text-white">{eyebrow}</span>
              )}
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
              {description && (
                <p className="mt-3 max-w-md text-primary-foreground/80">{description}</p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={primaryHref || '/contact'}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-primary shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <CalendarCheck className="size-5" />
                  {primaryLabel || 'Book Appointment'}
                </Link>
                <Link
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="size-5" />
                  {site.phone}
                </Link>
              </div>
              <div className="mt-8 space-y-2.5 text-sm text-primary-foreground/85">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" />
                  {site.address.full}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0" />
                  Open 6 days a week · Same-day emergencies
                </p>
              </div>
            </div>
            {showMap && (
              <div className="relative min-h-[20rem] bg-secondary">
                <iframe
                  title={`Map to ${site.practiceName}`}
                  src={site.mapEmbed}
                  className="absolute inset-0 size-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
