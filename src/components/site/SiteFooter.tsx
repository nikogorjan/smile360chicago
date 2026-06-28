import { ArrowRight, Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Brand } from './Brand'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import type { SiteData } from '@/lib/getSiteSettings'
import type { NavItem } from '@/lib/practice'
import { services } from '@/lib/practice'

export const SiteFooter: React.FC<{ site: SiteData; nav: NavItem[] }> = ({ site, nav }) => {
  return (
    <footer className="mt-auto">
      {/* Transparent inset wrapper — its horizontal + bottom padding is the only thing
          that pushes the navy panel off the viewport edges, so the page background shows
          through on the left, right, and bottom. ~24px for now (fine-tune later). */}
      <div className="bg-transparent px-6 pb-6">
        {/* The navy background, rounded corners (all four — it floats) and overflow-hidden
            ALL live on THIS inset element (never a full-width parent), so the colour can
            only paint inside the inset box. `data-theme="dark"` + `.site-footer` stay on
            one element so the content renders dark-themed and the navy tracks the theme. */}
        <div
          data-theme="dark"
          className="site-footer overflow-hidden rounded-[8px] text-white"
        >
          {/* CTA strip */}
          <div className="border-b border-white/10">
            <div className="container flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white/80">
                  New patients welcome
                </span>
                <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ready for a healthier, brighter smile?
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: 'white', size: 'clear', className: 'px-6 py-3.5 font-bold' })}
                >
                  <ButtonLabel>
                    Book Appointment
                    <ArrowRight className="size-4" />
                  </ButtonLabel>
                </Link>
                <Link
                  href={site.phoneHref}
                  className={buttonVariants({ variant: 'outlineWhite', size: 'clear', className: 'px-6 py-3.5 font-bold' })}
                >
                  <ButtonLabel>
                    <Phone className="size-4" />
                    {site.phone}
                  </ButtonLabel>
                </Link>
              </div>
            </div>
          </div>

          {/* columns */}
          <div className="container grid grid-cols-2 gap-8 py-14 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2">
              <Brand
                lightSrc={site.logo.lightUrl}
                darkSrc={site.logo.darkUrl}
                alt={site.logo.alt}
                className="h-14 w-auto rounded-xl sm:h-16"
              />
              <p className="mt-4 max-w-xs text-sm text-white/65">{site.description}</p>
              <div className="mt-5 space-y-2 text-sm">
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/70 transition-colors hover:text-brand"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  {site.address.full}
                </a>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 text-white/70 transition-colors hover:text-brand"
                >
                  <Phone className="size-4 shrink-0 text-brand" />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-white/70 transition-colors hover:text-brand"
                >
                  <Mail className="size-4 shrink-0 text-brand" />
                  {site.email}
                </a>
              </div>
              <div className="mt-5 flex gap-2">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-sm border border-white/15 bg-white/5 text-white transition-colors hover:border-brand hover:text-brand"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid size-9 place-items-center rounded-sm border border-white/15 bg-white/5 text-white transition-colors hover:border-brand hover:text-brand"
                >
                  <Facebook className="size-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {nav
                  .filter((n) => n.href !== '/')
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-white/65 transition-colors hover:text-brand"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {services.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-white/65 transition-colors hover:text-brand"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-white">
                <Clock className="size-4 text-brand" />
                Hours
              </h3>
              <ul className="mt-4 space-y-1.5 text-sm">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-2 text-white/65">
                    <span>{h.day.slice(0, 3)}</span>
                    <span className={h.closed ? 'text-white/40' : 'font-medium text-white'}>
                      {h.closed ? 'Closed' : `${h.open}–${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* bottom bar */}
          <div className="border-t border-white/10">
            <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
              <p>
                © {new Date().getFullYear()} {site.legalName}. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="/privacy" className="transition-colors hover:text-brand">
                  Privacy Policy
                </Link>
                <Link href="/accessibility" className="transition-colors hover:text-brand">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
