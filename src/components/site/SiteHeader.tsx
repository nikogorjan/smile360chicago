'use client'

import { CalendarCheck, ChevronDown, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Brand } from './Brand'
import { ThemeToggle } from './ThemeToggle'
import type { NavItem } from '@/lib/practice'
import { cn } from '@/utilities/ui'

export const SiteHeader: React.FC<{
  nav: NavItem[]
  ctaLabel: string
  phone: string
  phoneHref: string
}> = ({ nav, ctaLabel, phone, phoneHref }) => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change + lock body scroll while open.
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

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-background/85 backdrop-blur-md shadow-sm'
            : 'bg-background/60 backdrop-blur-sm',
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-18">
        <Brand priority />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-secondary hover:text-brand',
                    isActive(item.href) ? 'text-brand' : 'text-foreground/80',
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                      >
                        <span className="block text-sm font-semibold text-foreground">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="block text-xs text-muted-foreground">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-secondary hover:text-brand',
                  isActive(item.href) ? 'text-brand' : 'text-foreground/80',
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop actions (phone lives in the top banner) */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
          >
            <CalendarCheck className="size-4" />
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <Link
            href={phoneHref}
            aria-label="Call us"
            className="grid size-9 place-items-center rounded-full bg-brand text-brand-foreground"
          >
            <Phone className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-full border border-border text-foreground"
          >
            <Menu className="size-5" />
          </button>
        </div>
        </div>
      </header>

      {/* Mobile slide-in menu (rendered outside <header> so the blurred header
          doesn't trap this fixed overlay inside its containing block) */}
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
            'absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Brand />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-full border border-border"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="mb-1">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroup(openGroup === item.label ? null : item.label)
                    }
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
                          className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-brand"
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
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary hover:text-brand"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="space-y-2 border-t border-border p-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
            >
              <CalendarCheck className="size-4" />
              Book Appointment
            </Link>
            <Link
              href={phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground"
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
