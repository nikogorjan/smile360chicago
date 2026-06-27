'use client'

import {
  Anchor,
  ChevronDown,
  HeartPulse,
  LayoutGrid,
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
import type { NavItem } from '@/lib/practice'
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
}> = ({ nav, phone, phoneHref, logo }) => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

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
            <Link href="/" aria-label="Smile360 Chicago — home" className="flex shrink-0 items-center">
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
                    <Link key={item.label} href={item.href} className={triggerClass(isActive(item.href))}>
                      {item.label}
                    </Link>
                  )
                }
                const wide = item.children.length > 4
                return (
                  <div key={item.label} className="group relative">
                    <Link href={item.href} className={triggerClass(isActive(item.href))}>
                      {item.label}
                      <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div
                        className={cn(
                          'rounded-md border border-border bg-popover p-1 shadow-xl',
                          wide ? 'relative grid w-136 grid-cols-2 gap-x-2 gap-y-1' : 'w-80',
                        )}
                      >
                        {wide && (
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-border"
                          />
                        )}
                        {item.children.map((child) => {
                          const Icon = iconForLabel(child.label)
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 rounded-[6px] p-3 transition-colors hover:bg-foreground/5"
                            >
                              <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-brand/10 text-brand">
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
                )
              })}
            </nav>
          </div>

          {/* RIGHT — actions (desktop) */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href={phoneHref}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <ButtonLabel>
                <Phone className="size-4" />
                Call {phone}
              </ButtonLabel>
            </Link>
          </div>

          {/* RIGHT — actions (mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={phoneHref}
              aria-label={`Call ${phone}`}
              className="grid size-10 place-items-center rounded-sm border border-border bg-background text-brand"
            >
              <Phone className="size-4" />
            </Link>
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
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity',
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
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="mb-1">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'size-4 transition-transform',
                        openGroup === item.label && 'rotate-180',
                      )}
                    />
                  </button>
                  {openGroup === item.label && (
                    <div className="ml-3 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
          <div className="border-t border-border p-4">
            <Link
              href={phoneHref}
              className="flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="size-4" />
              Call {phone}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
