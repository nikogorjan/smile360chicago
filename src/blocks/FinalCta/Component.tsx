import { CalendarCheck, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { FinalCtaBlock as Props } from '@/payload-types'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Eyebrow, Panel, Section, emphasize } from '@/components/site/primitives'
import { getSiteData } from '@/lib/getSiteSettings'
import { practice } from '@/lib/practice'

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
    <Section>
      <Panel tone="brand">
        <div className="grid items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-20">
          {/* LEFT — editorial text */}
          <div className="max-w-xl">
            {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
            <h2 className="mt-5 text-pretty text-4xl leading-[1.03] tracking-normal text-white sm:text-5xl lg:text-[3.25rem]">
              {emphasize(heading)}
            </h2>
            {description && (
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={primaryHref || '/contact'}
                className={buttonVariants({ variant: 'white', size: 'lg' })}
              >
                <ButtonLabel>
                  <CalendarCheck className="size-5" />
                  {primaryLabel || 'Book Appointment'}
                </ButtonLabel>
              </Link>
              <Link
                href={site.phoneHref}
                className={buttonVariants({ variant: 'outlineWhite', size: 'lg' })}
              >
                <ButtonLabel>
                  <Phone className="size-5" />
                  {site.phone}
                </ButtonLabel>
              </Link>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-white/60">
              No-pressure visits · Same-day emergencies welcome
            </p>
          </div>

          {/* RIGHT — map card */}
          {showMap && (
            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-card ring-1 ring-white/10">
                <iframe
                  title={`Map to ${site.practiceName}`}
                  src={practice.mapEmbed}
                  className="size-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-start gap-x-6 gap-y-2 text-sm leading-relaxed text-white/70">
                <span className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-white/70" />
                  <Link href={site.mapUrl} className="transition-colors hover:text-white">
                    {site.address.full}
                  </Link>
                </span>
                <Link
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-white/80"
                >
                  <Phone className="size-4" />
                  {site.phone}
                </Link>
              </div>
            </div>
          )}
        </div>
      </Panel>
    </Section>
  )
}
