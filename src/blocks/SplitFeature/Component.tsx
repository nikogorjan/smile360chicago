import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { SplitFeatureBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Section, SectionHeading } from '@/components/site/primitives'
import { resolveHref } from '@/lib/nav'
import { cn } from '@/utilities/ui'

export const SplitFeatureBlock: React.FC<Props> = ({
  image,
  imageSide,
  eyebrow,
  heading,
  body,
  bullets,
  statValue,
  statLabel,
  links,
  background,
}) => {
  const hasImage = image && typeof image !== 'string'
  const imageLeft = imageSide === 'left'
  const cta = links?.[0]?.link

  return (
    <Section tone={(background as 'default') || 'default'}>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Media */}
        <div className={cn('relative', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-sm">
            {hasImage ? (
              <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0" />
            ) : (
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand/15 via-secondary to-accent/15">
                <svg viewBox="0 0 24 24" className="size-24 text-brand/30" fill="currentColor" aria-hidden>
                  <path d="M12 4.2c-1.6-1.1-3-1.5-4.3-1.2C5.4 3.6 4 5.7 4 8.4c0 2 .5 3.6 1 5.3.5 1.7.7 3.4 1 4.8.3 1.4.8 2.3 1.6 2.3.9 0 1.1-1 1.4-2.4.2-1.1.4-2.2 1-2.2s.8 1.1 1 2.2c.3 1.4.5 2.4 1.4 2.4.8 0 1.3-.9 1.6-2.3.3-1.4.5-3.1 1-4.8.5-1.7 1-3.3 1-5.3 0-2.7-1.4-4.8-3.7-5.4C15 2.7 13.6 3.1 12 4.2Z" />
                </svg>
              </div>
            )}
          </div>
          {statValue && (
            <div className="glass absolute -bottom-5 right-6 w-44 rounded-2xl p-4 shadow-xl">
              <p className="text-3xl font-semibold text-brand">{statValue}</p>
              {statLabel && <p className="text-xs text-muted-foreground">{statLabel}</p>}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn(imageLeft ? 'lg:order-2' : 'lg:order-1')}>
          <SectionHeading
            align="left"
            eyebrow={eyebrow || undefined}
            title={heading}
            description={body || undefined}
          />
          {bullets && bullets.length > 0 && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span className="text-sm font-medium text-foreground">{b.item}</span>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <Link
              href={resolveHref(cta)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </Section>
  )
}
