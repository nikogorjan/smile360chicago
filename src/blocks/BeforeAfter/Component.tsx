import React from 'react'

import type { BeforeAfterBlock as Props } from '@/payload-types'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { getGalleryCases } from '@/lib/queries'

export const BeforeAfterBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  ctaLabel,
  ctaHref,
  background,
}) => {
  const cases = await getGalleryCases()
  return (
    <BeforeAfter
      cases={cases}
      eyebrow={eyebrow || undefined}
      heading={heading || undefined}
      description={description || undefined}
      ctaLabel={ctaLabel || undefined}
      ctaHref={ctaHref || undefined}
      tone={(background as 'muted') || 'muted'}
    />
  )
}
