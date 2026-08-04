'use client'

import {
  Anchor,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  LayoutGrid,
  Instagram,
  Menu,
  Phone,
  Siren,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Brand } from './Brand'
import { ThemeToggle } from './ThemeToggle'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { practice, type NavItem } from '@/lib/practice'
import { cn } from '@/utilities/ui'

/** Pick a relevant icon for a dropdown item from its label. */
const iconForLabel = (label = ''): React.ComponentType<{ className?: string }> => {
  const l = label.toLowerCase()
  if (l.includes('team') || l.includes('meet')) return Users
  if (l.includes('review')) return Star
  if (l.includes('emergency') || l.includes('toothache')) return Siren
  if (l.includes('clean') || l.includes('checkup')) return Sparkles
  if (l.includes('whiten')) return Sun
  if (l.includes('invisalign') || l.includes('align') || l.includes('smile')) return Smile
  if (l.includes('implant')) return Anchor
  if (l.includes('all service') || l.includes('browse') || l.includes('service')) return LayoutGrid
  if (l.includes('practice') || l.includes('story') || l.includes('about')) return HeartPulse
  return Stethoscope
}

/**
 * Solid top nav (Turnkey-style): logo + links on the left, actions on the right,
 * on a sticky theme-aware bar. Items with children open a rich rounded dropdown
 * panel — each entry is an icon + label + short description (two columns for the
 * longer menus). Theme-aware so light and dark both work.
 */
export const SiteHeader: React.FC<{
  nav: NavItem[]
  ctaLabel: string
  phone: string
  phoneHref: string
  logo?: { lightUrl: string | null; darkUrl: string | null; alt: string } | null
  instagram?: string | null
}> = ({ nav, phone, phoneHref, logo, instagram }) => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  // Which nav group's sub-panel is showing on mobile (drill-down). null = main level.
  const [submenu, setSubmenu] = useState<string | null>(null)
  // Which desktop dropdown is open. Hover/focus controlled (not pure CSS :hover)
  // so it can be force-closed on navigation — otherwise the panel stays open
  // after a client-side route change because the pointer is still over it.
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    if (!mobileOpen) setSubmenu(null)
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const triggerClass = (active: boolean) =>
    cn(
      'inline-flex h-9 items-center gap-1 rounded-sm px-2 text-[13px] font-medium transition-colors hover:bg-foreground/5 min-[1100px]:px-3 min-[1100px]:text-sm',
      active ? 'text-foreground' : 'text-foreground/75 hover:text-foreground',
    )

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-18.75 items-center justify-between gap-4">
          {/* LEFT — logo + nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              aria-label="Smile360 Chicago — home"
              className="flex shrink-0 items-center"
            >
              <Image
                src={logo?.lightUrl || '/smile360-new-logo.png'}
                alt={logo?.alt || 'Smile360 Chicago'}
                width={1254}
                height={1254}
                priority
                className="size-11 rounded-sm dark:hidden"
              />
              <Image
                src={logo?.darkUrl || logo?.lightUrl || '/smile360-new-logo.png'}
                alt={logo?.alt || 'Smile360 Chicago'}
                width={1254}
                height={1254}
                priority
                className="hidden size-11 rounded-sm dark:block"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex min-[1100px]:gap-2">
              {nav.map((item) => {
                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={triggerClass(isActive(item.href))}
                    >
                      {item.label}
                    </Link>
                  )
                }
                // Services mega-menu: a branded promo rail beside a 2-column grid
                // of service tiles. Hover/focus controlled so it closes on nav.
                const open = openMenu === item.label
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    onFocus={() => setOpenMenu(item.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null)
                    }}
                  >
                    {/* Trigger only — does not navigate (opens on hover/focus). */}
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={open}
                      className={triggerClass(isActive(item.href))}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'size-3.5 text-muted-foreground transition-transform',
                          open && 'rotate-180',
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        'absolute left-0 top-full z-50 w-176 pt-3 transition-all duration-200 ease-out',
                        open
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible translate-y-1 opacity-0',
                      )}
                    >
                      <div className="grid grid-cols-[15rem_1fr] overflow-hidden rounded-[10px] border border-border bg-popover shadow-2xl">
                        {/* Left — branded promo rail */}
                        <div className="relative flex flex-col justify-between overflow-hidden bg-primary p-6 text-primary-foreground">
                          <div
                            aria-hidden
                            className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-white/10 blur-3xl"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute -bottom-14 -left-8 size-40 rounded-full bg-gold/20 blur-3xl"
                          />
                          <div className="relative">
                            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">
                              Our services
                            </span>
                            <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">
                              Care for every smile
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/75">
                              From same-day emergencies to a full smile makeover — expert care, all
                              under one roof.
                            </p>
                            <div className="mt-4 flex items-center gap-1.5 text-xs text-white/80">
                              <Star className="size-3.5 fill-gold text-gold" />
                              <span>
                                {practice.rating.value} · {practice.rating.count}+ Google reviews
                              </span>
                            </div>
                          </div>
                          <div className="relative mt-6">
                            <Link
                              href={phoneHref}
                              className={buttonVariants({
                                variant: 'white',
                                size: 'sm',
                                className: 'w-full font-bold',
                              })}
                            >
                              <ButtonLabel>
                                <Phone className="size-4" />
                                Call {phone}
                              </ButtonLabel>
                            </Link>
                          </div>
                        </div>

                        {/* Right — services grid */}
                        <div className="grid grid-cols-2 gap-1 p-3">
                          {item.children.map((child) => {
                            const Icon = iconForLabel(child.label)
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group/item flex items-start gap-3 rounded-[8px] p-3 transition-colors hover:bg-brand/5"
                              >
                                <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-brand/10 text-brand transition-colors group-hover/item:bg-brand group-hover/item:text-white">
                                  <Icon className="size-5" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold text-foreground">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </nav>
          </div>

          {/* RIGHT — actions (desktop) */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-9 place-items-center rounded-sm border border-border text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <Instagram className="size-4" />
              </a>
            )}
            <Link href={phoneHref} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              <ButtonLabel>
                <Phone className="size-4" />
                Call {phone}
              </ButtonLabel>
            </Link>
          </div>

          {/* RIGHT — actions (mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle className="size-10" />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-sm border border-border text-foreground"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <div
        className={cn(
          'fixed inset-0 z-60 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 w-full bg-foreground/40 backdrop-blur-sm transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col border-l border-border bg-background transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Brand lightSrc={logo?.lightUrl} darkSrc={logo?.darkUrl} alt={logo?.alt} />
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-sm border border-border"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
          {/* Body — a drill-down: the main list, with each group's sub-panel
              sliding in from the right on top of it (with a Back button). */}
          <div className="relative flex-1 overflow-hidden">
            {/* Level 1 — main menu */}
            <nav className="absolute inset-0 overflow-y-auto px-3 py-4">
              {nav.map((item) =>
                item.children ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSubmenu(item.label)}
                    className="mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-foreground/5"
                  >
                    {item.label}
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-foreground/5 hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Level 2 — one sliding sub-panel per group with children */}
            {nav
              .filter((item) => item.children)
              .map((group) => (
                <div
                  key={group.label}
                  aria-hidden={submenu !== group.label}
                  className={cn(
                    'absolute inset-0 overflow-y-auto bg-background px-3 py-4 transition-transform duration-300 ease-out',
                    submenu === group.label
                      ? 'translate-x-0'
                      : 'pointer-events-none translate-x-full',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSubmenu(null)}
                    className="mb-2 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-foreground/5"
                  >
                    <ChevronLeft className="size-4 text-muted-foreground" />
                    {group.label}
                  </button>
                  {group.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-foreground/5 hover:text-brand"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 border-t border-border p-4">
            <Link
              href={phoneHref}
              className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="size-4" />
              Call {phone}
            </Link>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-12 shrink-0 place-items-center rounded-sm border border-border text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <Instagram className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
