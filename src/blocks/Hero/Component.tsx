import { CalendarCheck, CheckCircle2, Phone, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { StarRating } from '@/components/site/primitives'
import { resolveHref } from '@/lib/nav'
import { practice } from '@/lib/practice'

type TextNode = { type?: string; text?: string; format?: number; $?: { style?: string } }
type LexNode = { type?: string; children?: TextNode[] }

/** Render the rich-text heading inline inside an <h1>, honoring the "Cursive"
 *  text-state (brand script + blue) and bold, while keeping a single <h1>. */
const renderHeading = (data: unknown): React.ReactNode => {
  const root = (data as { root?: { children?: LexNode[] } })?.root
  if (!root?.children) return null
  const out: React.ReactNode[] = []
  root.children.forEach((block, bi) => {
    ;(block.children || []).forEach((n, i) => {
      if (n.type !== 'text' || !n.text) return
      let el: React.ReactNode = n.text
      if (n.format && n.format & 1) el = <strong>{el}</strong>
      if (n.$?.style === 'cursive') {
        out.push(
          <span
            key={`${bi}-${i}`}
            className="text-brand [font-family:var(--font-script)] text-[1.06em]"
          >
            {el}
          </span>,
        )
      } else {
        out.push(<React.Fragment key={`${bi}-${i}`}>{el}</React.Fragment>)
      }
    })
  })
  return out
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  eyebrow,
  heading,
  subheading,
  showRating,
  pills,
  links,
}) => {
  const [primary, secondary] = links || []

  return (
    <section className="relative overflow-hidden bg-brand-glow">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="container relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div className="reveal">
          {eyebrow && (
            <span className="eyebrow">
              <Sparkles className="size-3.5" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {renderHeading(heading)}
          </h1>
          {subheading && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {subheading}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primary?.link && (
              <Link
                href={resolveHref(primary.link)}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-brand-foreground shadow-lg shadow-brand/20 transition-transform hover:-translate-y-0.5 hover:shadow-xl"
              >
                <CalendarCheck className="size-5" />
                {primary.link.label}
              </Link>
            )}
            {secondary?.link && (
              <Link
                href={resolveHref(secondary.link)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-base font-bold text-foreground backdrop-blur transition-colors hover:border-brand hover:text-brand"
              >
                <Phone className="size-5" />
                {secondary.link.label}
              </Link>
            )}
          </div>

          {showRating && (
            <div className="mt-8 flex items-center gap-3">
              <StarRating value={5} />
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{practice.rating.value}</span> from{' '}
                {practice.rating.count}+ Google reviews
              </p>
            </div>
          )}

          {pills && pills.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {pills.map((p, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80"
                >
                  <CheckCircle2 className="size-4 text-brand" />
                  {p.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Decorative visual */}
        <div className="relative reveal [animation-delay:120ms]">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand via-brand to-accent opacity-90" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-dot-grid opacity-20" />
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full p-10 text-white/15" fill="none" aria-hidden>
              <path
                d="M40 90c0 40 25 70 60 70s60-30 60-70c0-18-12-28-28-24-12 3-18 10-32 10s-20-7-32-10c-16-4-28 6-28 24Z"
                fill="currentColor"
              />
            </svg>
            <div className="glass animate-float absolute -left-4 top-10 w-56 rounded-2xl p-4 shadow-xl sm:-left-8">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-brand/15 text-brand">
                  <CalendarCheck className="size-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs text-muted-foreground">Next available</p>
                  <p className="text-sm font-bold text-foreground">Today · 2:30 PM</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-success">
                <span className="size-2 rounded-full bg-success" />
                Accepting new patients
              </div>
            </div>
            <div className="glass animate-float absolute -right-3 bottom-16 w-44 rounded-2xl p-4 shadow-xl [animation-delay:1.5s] sm:-right-6">
              <StarRating value={5} />
              <p className="mt-1.5 text-2xl font-semibold text-foreground">{practice.rating.value}/5</p>
              <p className="text-xs text-muted-foreground">{practice.rating.count}+ happy smiles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
