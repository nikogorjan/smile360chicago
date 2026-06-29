import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { EmergencyBlock as Props } from '@/payload-types'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Eyebrow, Section, emphasize } from '@/components/site/primitives'
import { practice } from '@/lib/practice'

/**
 * Emergency CTA — a "living beacon". An edgeless radial bloom radiates from the red
 * "Call now" button: a warm coral core (tint of --emergency) at the very centre,
 * transitioning out through a brand-blue bloom and fading to the page; 2–3 faint
 * concentric signal rings broadcast outward; a tight red halo lifts the call button.
 * The whole beacon breathes with a slow, subtle pulse — wrapped in `motion-safe:` so
 * reduced-motion users get the full glow, static. Content stays centred and accessible.
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
      <div className="container relative isolate">
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

          {/* Button row — the beacon radiates from here */}
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Living beacon: glow layers + concentric signal rings, centred on the buttons
                and painted behind all content (isolate + -z-10). Breathes slowly; static
                under reduced motion. */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[34rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 sm:w-[56rem]"
            >
              {/* Inner wrapper does the breathing (scale + opacity) around the centre */}
              <span className="relative block size-full motion-safe:animate-[beacon-pulse_7s_ease-in-out_infinite]">
                {/* outer brand-blue bloom */}
                <span className="absolute inset-0 m-auto size-[74%] rounded-full bg-brand/[0.16] blur-[80px]" />
                {/* warm coral core — the heat at the buttons */}
                <span className="absolute inset-0 m-auto size-[34%] rounded-full bg-emergency/[0.20] blur-[55px]" />
                {/* tight red halo lifting the call button off the surface */}
                <span className="absolute inset-0 m-auto size-[20%] rounded-full bg-emergency/[0.28] blur-[30px]" />
                {/* concentric signal rings broadcasting outward */}
                <span className="absolute inset-0 m-auto size-[40%] rounded-full border border-emergency/[0.18]" />
                <span className="absolute inset-0 m-auto size-[58%] rounded-full border border-brand/[0.12]" />
                <span className="absolute inset-0 m-auto size-[78%] rounded-full border border-brand/[0.08]" />
              </span>
            </span>

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
