import React from 'react'

import type { FaqBlock as Props } from '@/payload-types'
import { Faq } from '@/components/sections/Faq'
import { getSiteData } from '@/lib/getSiteSettings'
import { getFaqs } from '@/lib/queries'
import type { Faq as FaqType } from '@/lib/practice'

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

  return (
    <Faq
      items={items}
      eyebrow={eyebrow || undefined}
      heading={heading || undefined}
      description={description || undefined}
      phone={site?.phone}
      phoneHref={site?.phoneHref}
      tone={(background as 'default') || 'default'}
    />
  )
}
