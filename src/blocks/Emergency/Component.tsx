import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { EmergencyBlock as Props } from '@/payload-types'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Eyebrow, Section, emphasize } from '@/components/site/primitives'
import { practice } from '@/lib/practice'

/**
 * Emergency CTA — an edgeless "soft-glow moment" (Maven-style): no flat panel. A large,
 * blurred radial glow (pale brand blue with a faint gold core) blooms behind centred
 * content and fades into the page; a couple of very faint orbital arcs add detail. Text
 * is dark for strong contrast on the light glow, and the red "Call now" stays the urgent
 * primary. Responsive — the glow scales and content stacks on mobile.
 */
export const EmergencyBlock: React.FC<Props> = ({
  heading,
  text,
  callLabel,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <Section className="relative overflow-hidden">
      {/* Soft radial glow — pale brand blue, blurred + edgeless */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[90vw] max-w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.14] blur-[90px]"
      />
      {/* Faint gold core for warmth */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[54vw] max-w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.10] blur-[72px]"
      />
      {/* Faint orbital arcs */}
      <svg
        aria-hidden
        viewBox="0 0 900 460"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120vw] max-w-[62rem] -translate-x-1/2 -translate-y-1/2 text-brand/[0.10]"
      >
        <ellipse
          cx="450"
          cy="230"
          rx="430"
          ry="195"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-9 450 230)"
        />
        <ellipse
          cx="450"
          cy="230"
          rx="320"
          ry="125"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(8 450 230)"
        />
      </svg>

      {/* Centred content floating on the glow */}
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Dental emergency?</Eyebrow>

          <h2 className="mt-5 text-pretty font-semibold text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            {emphasize(heading)}
          </h2>

          {text && (
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {text}
            </p>
          )}

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Same-day slots kept open daily — open 6 days a week.
          </p>

          {/* Buttons — red Call now (urgent primary) + Same-day care, centred */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={practice.phoneHref}
              className={buttonVariants({
                variant: 'emergency',
                size: 'lg',
                className: 'w-full gap-3 text-base sm:w-auto',
              })}
            >
              <ButtonLabel>
                <Phone className="size-5" />
                <span>
                  {callLabel || 'Call now'}
                  <span className="ml-2 font-bold tracking-tight">{practice.phone}</span>
                </span>
              </ButtonLabel>
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'w-full text-base sm:w-auto',
                })}
              >
                <ButtonLabel>{secondaryLabel}</ButtonLabel>
              </Link>
            )}
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            In severe pain after hours? Call 911 or visit the nearest ER.
          </p>
        </div>
      </div>
    </Section>
  )
}
