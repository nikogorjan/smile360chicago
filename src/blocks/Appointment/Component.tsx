import { Clock, Mail, MapPin, Phone, Siren } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { AppointmentBlock as Props } from '@/payload-types'
import { AppointmentForm } from '@/components/sections/AppointmentForm'
import { Section, SectionHeading } from '@/components/site/primitives'
import { getSiteData } from '@/lib/getSiteSettings'

export const AppointmentBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  showContactInfo,
  background,
}) => {
  const site = await getSiteData()
  return (
    <Section tone={(background as 'default') || 'default'}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {showContactInfo && (
            <div className="space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Call us</span>
                  <span className="block text-lg font-bold text-foreground">{site.phone}</span>
                </span>
              </a>
              <a
                href={site.emergencyPhoneHref}
                className="flex items-center gap-4 rounded-2xl border border-emergency/30 bg-emergency/5 p-5 transition-colors hover:border-emergency"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-emergency/10 text-emergency">
                  <Siren className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Dental emergency?</span>
                  <span className="block text-lg font-bold text-foreground">
                    {site.emergencyPhone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Email</span>
                  <span className="block text-lg font-bold text-foreground">{site.email}</span>
                </span>
              </a>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-muted-foreground">Visit us</span>
                  <span className="block font-bold text-foreground">{site.address.full}</span>
                  <Link
                    href={site.mapUrl}
                    target="_blank"
                    className="mt-1 inline-block text-sm font-semibold text-brand hover:underline"
                  >
                    Get directions →
                  </Link>
                </span>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                  <Clock className="size-4 text-brand" />
                  Office hours
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-muted-foreground">
                      <span>{h.day}</span>
                      <span className={h.closed ? '' : 'font-medium text-foreground'}>
                        {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className={showContactInfo ? '' : 'lg:col-span-2 lg:mx-auto lg:max-w-2xl'}>
            <AppointmentForm />
          </div>
        </div>
      </div>
    </Section>
  )
}
