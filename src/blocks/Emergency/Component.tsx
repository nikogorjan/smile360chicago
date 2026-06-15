import { Clock, Phone, Siren } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { EmergencyBlock as Props } from '@/payload-types'
import { getSiteData } from '@/lib/getSiteSettings'

export const EmergencyBlock: React.FC<Props> = async ({
  heading,
  text,
  callLabel,
  secondaryLabel,
  secondaryHref,
}) => {
  const site = await getSiteData()
  return (
    <section className="bg-emergency text-emergency-foreground">
      <div className="container flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left lg:py-14">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15">
            <Siren className="size-6 animate-pulse" />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{heading}</h2>
            {text && (
              <p className="mt-1.5 max-w-xl text-sm text-emergency-foreground/85 sm:text-base">
                {text}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={site.emergencyPhoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-emergency shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Phone className="size-5" />
            {callLabel || 'Call now'}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              <Clock className="size-5" />
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
