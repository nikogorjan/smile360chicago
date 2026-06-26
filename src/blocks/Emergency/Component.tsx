import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { EmergencyBlock as Props } from '@/payload-types'
import { Eyebrow, Panel, Section, emphasize } from '@/components/site/primitives'
import { practice } from '@/lib/practice'

export const EmergencyBlock: React.FC<Props> = ({
  heading,
  text,
  callLabel,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <Section>
      <Panel tone="brand">
        <div className="grid items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-16 lg:py-20">
          {/* Left: editorial message */}
          <div className="max-w-xl">
            <Eyebrow tone="dark">Dental emergency?</Eyebrow>
            <h2 className="mt-5 text-pretty font-semibold text-4xl leading-[1.03] tracking-normal text-white sm:text-5xl lg:text-[3.25rem]">
              {emphasize(heading)}
            </h2>
            {text && (
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>
            )}
            <p className="mt-6 text-sm font-medium text-white/70">
              Same-day slots kept open daily — open 6 days a week.
            </p>
          </div>

          {/* Right: CTA stack */}
          <div className="flex flex-col gap-3 lg:items-end">
            <Link
              href={practice.phoneHref}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-emergency px-7 py-3.5 text-base font-semibold text-emergency-foreground transition-colors duration-300 hover:bg-emergency/90 sm:w-auto"
            >
              <Phone className="size-5" />
              <span>
                {callLabel || 'Call now'}
                <span className="ml-2 font-bold tracking-tight">{practice.phone}</span>
              </span>
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10 sm:w-auto"
              >
                {secondaryLabel}
              </Link>
            )}
            <p className="mt-1 text-center text-xs text-white/60 lg:text-right">
              In severe pain after hours? Call 911 or visit the nearest ER.
            </p>
          </div>
        </div>
      </Panel>
    </Section>
  )
}
