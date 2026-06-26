import { Star } from 'lucide-react'
import * as Icons from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

/* ---------------------------------------------------------------------------
 * Smile360 design system primitives — "Cobalt & White" (ClinicHub-premium).
 *
 * Architecture:
 *  - Canvas = cool near-white (bg-background, set on <body>). Cards/panels are
 *    white (bg-card). SOLID cobalt (bg-primary / Panel tone="brand") is reserved
 *    for AT MOST TWO sections — the Emergency band + the Final CTA. Everywhere
 *    else cobalt is an ACCENT only (text-brand, bg-primary/10 chips, blue numbers).
 *  - ONE card style: rounded-2xl + border-border + bg-card + soft shadow that
 *    lifts on hover (see `Card` / `cardSurface`). Big radius, bold sans headings.
 *  - Palette: cobalt + navy + white + neutral gray. Gold ONLY on rating stars.
 *    No new accent hues; red only in the Emergency band. No italics.
 * ------------------------------------------------------------------------- */

/** The one card surface, as a class string — use for image cards / clickable
 *  wrappers where the <Card> element isn't convenient. Pair with `overflow-hidden`
 *  for image-fill tiles or `p-6 md:p-8` for padded content cards. */
export const cardSurface =
  'rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md'

export const DynamicIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Cmp = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[name]
  const Comp = Cmp || Icons.Stethoscope
  return <Comp className={className} />
}

/** Strip the *asterisk* emphasis markers — the client does NOT want italics,
 *  so marked words simply render as plain text. */
export function emphasize(text: React.ReactNode): React.ReactNode {
  if (typeof text !== 'string') return text
  return text.replace(/\*/g, '')
}

/** Vertical-rhythm wrapper. Transparent (cream canvas shows through) — color
 *  comes from <Panel> and cards, not from section backgrounds. */
export const Section: React.FC<
  React.PropsWithChildren<{ className?: string; id?: string; tone?: string | null; tight?: boolean }>
> = ({ children, className, id, tight }) => (
  <section id={id} className={cn(tight ? 'py-10 md:py-14' : 'py-20 md:py-28', className)}>
    {children}
  </section>
)

/** The one card style for the whole site (§4): rounded-2xl, hairline border,
 *  subtle shadow that lifts on hover, consistent padding. Dark-mode aware. */
export const Card: React.FC<
  React.PropsWithChildren<{ className?: string }> & React.HTMLAttributes<HTMLDivElement>
> = ({ className, children, ...rest }) => (
  <div
    className={cn(
      'rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)

/** Shared pill button styles (§5). */
export const buttonPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
export const buttonSecondary =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-foreground/5'

/** A large rounded panel that floats on the cream canvas (inset with padding).
 *  This is the signature container — hero, cobalt CTA bands, photo banners. */
export const Panel: React.FC<
  React.PropsWithChildren<{
    tone?: 'card' | 'brand' | 'dark'
    className?: string
    innerClassName?: string
    id?: string
  }>
> = ({ tone = 'card', className, innerClassName, id, children }) => (
  <div id={id} className={cn('px-3 sm:px-5 lg:px-6')}>
    <div
      className={cn(
        'mx-auto w-full max-w-[94rem] overflow-hidden rounded-none',
        tone === 'brand' && 'bg-primary text-primary-foreground',
        tone === 'dark' && 'bg-[oklch(20%_0.04_262deg)] text-white',
        tone === 'card' && 'bg-card ring-1 ring-border',
        className,
        innerClassName,
      )}
    >
      {children}
    </div>
  </div>
)

/** Small uppercase label. Cobalt + leading dot on light; white on dark. */
export const Eyebrow: React.FC<
  React.PropsWithChildren<{ tone?: 'light' | 'dark'; className?: string }>
> = ({ children, tone = 'light', className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]',
      tone === 'dark' ? 'text-white/70' : 'text-brand',
      className,
    )}
  >
    <span className={cn('h-1.5 w-1.5 rounded-full', tone === 'dark' ? 'bg-white/60' : 'bg-brand')} />
    {children}
  </span>
)

export const SectionHeading: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  tone?: 'light' | 'dark'
  invert?: boolean
}> = ({ eyebrow, title, description, align = 'center', className, tone, invert }) => {
  const dark = invert || tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={dark ? 'dark' : 'light'} className="mb-3">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'font-display text-pretty text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.25rem]',
          dark ? 'text-white' : 'text-foreground',
        )}
      >
        {typeof title === 'string' ? emphasize(title) : title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            dark ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

/** Hairline-ruled list (Halo). Each row: optional number/icon, label, value. */
export type SpecItem = {
  num?: string
  icon?: string
  label: React.ReactNode
  value?: React.ReactNode
  active?: boolean
}
export const SpecList: React.FC<{ items: SpecItem[]; tone?: 'light' | 'dark'; className?: string }> = ({
  items,
  tone = 'light',
  className,
}) => {
  const dark = tone === 'dark'
  return (
    <ul className={cn('w-full', className)}>
      {items.map((it, i) => (
        <li
          key={i}
          className={cn('flex items-center gap-4 border-t py-4', dark ? 'border-white/15' : 'border-border')}
        >
          {it.num != null && (
            <span className={cn('w-5 shrink-0 text-sm tabular-nums', dark ? 'text-white/50' : 'text-muted-foreground')}>
              {it.num}
            </span>
          )}
          {it.icon && (
            <span
              className={cn(
                'grid size-9 shrink-0 place-items-center rounded-full',
                dark ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
              )}
            >
              <DynamicIcon name={it.icon} className="size-4" />
            </span>
          )}
          <span
            className={cn(
              'flex-1 text-base',
              it.active
                ? dark
                  ? 'font-semibold text-white'
                  : 'font-semibold text-foreground'
                : dark
                  ? 'text-white/70'
                  : 'text-foreground/80',
            )}
          >
            {it.label}
          </span>
          {it.value != null && (
            <span className={cn('shrink-0 text-sm', dark ? 'text-white/60' : 'text-muted-foreground')}>
              {it.value}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

/** Circular progress ring with a big serif value (Maven). */
export const StatRing: React.FC<{
  value: React.ReactNode
  label: React.ReactNode
  percent?: number
  tone?: 'light' | 'dark'
  className?: string
}> = ({ value, label, percent = 72, tone = 'light', className }) => {
  const dark = tone === 'dark'
  const r = 62
  const c = 2 * Math.PI * r
  const dash = (Math.max(0, Math.min(100, percent)) / 100) * c
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <div className="relative">
        <svg viewBox="0 0 140 140" className="size-44 -rotate-90 sm:size-52 lg:size-56">
          <circle cx="70" cy="70" r={r} fill="none" strokeWidth="5" className={dark ? 'stroke-white/15' : 'stroke-border'} />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-primary"
            strokeDasharray={`${dash} ${c}`}
          />
        </svg>
        <span
          className={cn(
            'absolute inset-0 grid place-items-center text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl',
            dark ? 'text-white' : 'text-foreground',
          )}
        >
          {value}
        </span>
      </div>
      <span
        className={cn(
          'mt-5 max-w-[12rem] text-sm font-medium sm:text-base',
          dark ? 'text-white/70' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </div>
  )
}

export const StarRating: React.FC<{ value?: number; className?: string }> = ({ value = 5, className }) => (
  <div className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={cn('size-4', i < value ? 'fill-gold text-gold' : 'text-muted-foreground/30')} />
    ))}
  </div>
)
