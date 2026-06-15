import { ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { DynamicIcon, StarRating } from '@/components/site/primitives'
import type { Service, TeamMember, Testimonial } from '@/lib/practice'
import { cn } from '@/utilities/ui'

export const ServiceCard: React.FC<{ service: Service; featured?: boolean }> = ({
  service,
  featured,
}) => (
  <Link
    href={`/services/${service.slug}`}
    className={cn(
      'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl',
      featured && 'ring-1 ring-brand/20',
    )}
  >
    {service.category === 'Emergency' && (
      <span className="absolute right-4 top-4 rounded-full bg-emergency/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-emergency">
        Same-day
      </span>
    )}
    <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
      <DynamicIcon name={service.icon} className="size-6" />
    </span>
    <h3 className="mt-5 text-lg font-semibold text-foreground">{service.name}</h3>
    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.excerpt}</p>
    <div className="mt-4 flex items-center justify-between">
      {service.from && (
        <span className="text-sm font-bold text-foreground">
          <span className="text-xs font-medium text-muted-foreground">from </span>
          {service.from}
        </span>
      )}
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
)

export const ReviewCard: React.FC<{ t: Testimonial; className?: string }> = ({ t, className }) => (
  <figure
    className={cn(
      'flex break-inside-avoid flex-col rounded-2xl border border-border bg-card p-6 shadow-sm',
      className,
    )}
  >
    <div className="flex items-center justify-between">
      <StarRating value={t.rating} />
      <Quote className="size-6 text-brand/20" />
    </div>
    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
      “{t.quote}”
    </blockquote>
    <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
      <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">
        {t.initials}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-foreground">{t.author}</span>
        <span className="block text-xs text-muted-foreground">
          {t.treatment} · via {t.source}
        </span>
      </span>
    </figcaption>
  </figure>
)

const memberInitials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

export const TeamCard: React.FC<{ m: TeamMember }> = ({ m }) => (
  <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-brand/15 via-secondary to-accent/15">
      <span className="grid size-24 place-items-center rounded-full bg-card text-3xl font-semibold text-brand shadow-sm">
        {memberInitials(m.name)}
      </span>
      {m.credentials && (
        <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-brand backdrop-blur">
          {m.credentials}
        </span>
      )}
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold text-foreground">{m.name}</h3>
      <p className="text-sm font-semibold text-brand">{m.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {m.specialties.map((s) => (
          <li
            key={s}
            className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-semibold text-secondary-foreground"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
