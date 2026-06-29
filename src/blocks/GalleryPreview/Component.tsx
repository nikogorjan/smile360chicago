import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { GalleryPreviewBlock as Props } from '@/payload-types'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/site/primitives'
import { SmileCaseCard } from '@/components/site/SmileCaseCard'
import { resolveHref } from '@/lib/nav'
import { getGalleryCases } from '@/lib/queries'

/**
 * Homepage smile-gallery preview — the latest before/after cases that have real photos,
 * each as a draggable comparison slider, plus a "view full gallery" button. Server
 * component; the cases come from the gallery-cases collection (newest first). Hidden if
 * no cases have photos yet.
 */
export const GalleryPreviewBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  limit,
  links,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const all = await getGalleryCases({ sort: '-createdAt' })
  const cases = all.filter((c) => c.before && c.after).slice(0, limit || 3)
  if (!cases.length) return null

  const cta = links?.[0]?.link

  return (
    <Section tone={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow={eyebrow || undefined}
          title={heading || ''}
          description={description || undefined}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <SmileCaseCard key={c.title} c={c} />
          ))}
        </div>

        {cta && (
          <div className="mt-10 flex justify-center">
            <Link
              href={resolveHref(cta)}
              className={buttonVariants({ variant: 'outline', className: 'font-bold' })}
            >
              <ButtonLabel>
                {cta.label}
                <ArrowRight className="size-4" />
              </ButtonLabel>
            </Link>
          </div>
        )}
      </div>
    </Section>
  )
}
