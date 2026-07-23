import { Clock, Mail, MapPin, Phone, Siren } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { AppointmentBlock as Props } from '@/payload-types'
import { CmsForm } from '@/components/sections/CmsForm'
import { Section, SectionHeading } from '@/components/site/primitives'
import { getSiteData } from '@/lib/getSiteSettings'
import { cn } from '@/utilities/ui'

/** One hairline-divided row in the contact rail — icon, small label, value. No card. */
const Row: React.FC<{
  icon: React.ReactNode
  label: string
  href?: string
  emergency?: boolean
  children: React.ReactNode
}> = ({ icon, label, href, emergency, children }) => {
  const body = (
    <>
      <span
        className={cn(
          'mt-0.5 grid size-9 shrink-0 place-items-center rounded-sm',
          emergency ? 'bg-emergency/10 text-emergency' : 'bg-brand/10 text-brand',
        )}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block text-base font-bold leading-snug text-foreground">
          {children}
        </span>
      </span>
    </>
  )

  return (
    <li className="border-b border-border/70 last:border-b-0">
      {href ? (
        <a href={href} className="flex gap-4 py-5 transition-colors hover:text-brand">
          {body}
        </a>
      ) : (
        <div className="flex gap-4 py-5">{body}</div>
      )}
    </li>
  )
}

export const AppointmentBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  form,
  showContactInfo,
  background,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const site = await getSiteData()
  // The relationship arrives populated (an object) at the default depth; guard for the
  // ID-only shape so a shallow query can't crash the page.
  const formDoc = form && typeof form === 'object' ? form : null

  return (
    <Section
      tone={(background as 'default') || 'default'}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      topGap={topGap}
      bottomGap={bottomGap}
    >
      <div className="container">
        {(eyebrow || heading || description) && (
          // Left-aligned: the content below is an asymmetric split, and a centred header
          // over it reads as two unrelated compositions.
          <SectionHeading
            align="left"
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}

        {/* ONE panel holds both columns. Previously this was five bordered cards beside a
            sixth — the eye had nowhere to land, and the two columns ended at different
            heights. The divider is a hairline on the shared edge, so it reads as one surface. */}
        <div
          className={cn(
            'mt-12 overflow-hidden rounded-[8px] border border-border bg-card',
            showContactInfo && 'lg:grid lg:grid-cols-[0.8fr_1.2fr]',
          )}
        >
          {showContactInfo && (
            <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <ul>
                <Row icon={<Phone className="size-4" />} label="Call us" href={site.phoneHref}>
                  {site.phone}
                </Row>
                <Row
                  icon={<Siren className="size-4" />}
                  label="Dental emergency"
                  href={site.emergencyPhoneHref}
                  emergency
                >
                  {site.emergencyPhone}
                </Row>
                <Row icon={<Mail className="size-4" />} label="Email" href={`mailto:${site.email}`}>
                  <span className="break-all">{site.email}</span>
                </Row>
                <Row icon={<MapPin className="size-4" />} label="Visit us">
                  {site.address.full}
                  <Link
                    href={site.mapUrl}
                    target="_blank"
                    className="mt-1 block text-sm font-semibold text-brand hover:underline"
                  >
                    Get directions →
                  </Link>
                </Row>
                <Row icon={<Clock className="size-4" />} label="Office hours">
                  {/* Fixed day column + a real gap, rather than `justify-between` — which left
                      the times crowding the day names and pushed the short "Closed" out to the
                      far edge, out of line with every other row. */}
                  {/* Extra top margin here only: every other row is a single line under its
                      label, but this one opens a 7-row table and needs the separation. */}
                  <ul className="mt-3 space-y-1.5 text-sm font-medium">
                    {site.hours.map((h) => (
                      <li key={h.day} className="grid grid-cols-[2.5rem_1fr] gap-x-14 tabular-nums">
                        <span className="text-muted-foreground">{h.day.slice(0, 3)}</span>
                        <span className={h.closed ? 'text-muted-foreground' : 'text-foreground'}>
                          {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Row>
              </ul>
            </div>
          )}

          <div className={cn('p-6 sm:p-8', !showContactInfo && 'mx-auto w-full max-w-2xl')}>
            {formDoc ? (
              <CmsForm form={formDoc} bare />
            ) : (
              <p className="text-sm text-muted-foreground">
                No form selected. Pick one in this block’s <strong>Form</strong> field.
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
