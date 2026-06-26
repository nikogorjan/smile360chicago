import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Section, SectionHeading, buttonPrimary, cardSurface } from '@/components/site/primitives'
import type { BeforeAfterBlock as Props } from '@/payload-types'
import { getGalleryCases } from '@/lib/queries'
import { getPatientPhoto } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

/**
 * The gallery-cases collection carries copy only (title / treatment /
 * description) — it never supplies a before AND an after photo. Rather than fake
 * a transformation by pairing two mismatched stock photos, we render a single,
 * polished results showcase: one bright patient portrait, a caption pill, and
 * the CTA to the full smile gallery. (If a real upload pair is ever wired into
 * the data layer, swap the showcase for a drag-to-compare slider here.)
 */
export const BeforeAfterBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  background,
}) => {
  const cases = await getGalleryCases()

  const resolvedDescription =
    description ||
    'From single-visit whitening to digitally designed veneers, our results speak for themselves — every smile shaped around the person behind it.'
  const resolvedCtaLabel = ctaLabel || 'Explore the smile gallery'
  const resolvedCtaHref = ctaHref || '/smile-gallery'

  const treatments = Array.from(
    new Set(cases.map((c) => c.treatment).filter(Boolean)),
  ).slice(0, 6)

  return (
    <Section tone={background}>
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Editorial column */}
        <div className="lg:py-4">
          <SectionHeading
            align="left"
            eyebrow={eyebrow || 'Real results'}
            title={heading || 'See the *difference* a Smile360 smile makes'}
            description={resolvedDescription}
          />

          {treatments.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {treatments.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          {resolvedCtaLabel && resolvedCtaHref && (
            <Link href={resolvedCtaHref} className={cn(buttonPrimary, 'mt-10')}>
              {resolvedCtaLabel}
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        {/* Results showcase — believable empty state (no faked before/after). */}
        <div className="relative">
          <figure className={cn(cardSurface, 'relative aspect-[4/5] w-full overflow-hidden')}>
            <Image
              src={getPatientPhoto(1)}
              alt="A smiling Smile360 Chicago patient after treatment"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground">
              Real patients
            </span>
          </figure>
        </div>
      </div>
    </Section>
  )
}
