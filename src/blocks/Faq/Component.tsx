import React from 'react'

import type { FaqBlock as Props } from '@/payload-types'
import { getSiteData } from '@/lib/getSiteSettings'
import { getFaqs } from '@/lib/queries'
import type { Faq as FaqType } from '@/lib/practice'
import { FaqAccordion } from './FaqAccordion'

export const FaqBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  category,
  limit,
  showCall,
  background,
}) => {
  const cat = category && category !== 'all' ? (category as FaqType['category']) : undefined
  let items = await getFaqs(cat)
  if (limit) items = items.slice(0, limit)
  const site = showCall ? await getSiteData() : null

  // Surfaces are restricted to the allowed palette: white (default) or cream.
  // Any pale-blue / glow / brand choice maps to a warm cream so the hairline
  // dividers stay legible — never a light-blue tint.
  const tone: 'default' | 'cream' = background === 'default' ? 'default' : 'cream'

  return (
    <FaqAccordion
      items={items}
      eyebrow={eyebrow || undefined}
      heading={heading || undefined}
      description={description || undefined}
      phone={site?.phone}
      phoneHref={site?.phoneHref}
      tone={tone}
    />
  )
}
