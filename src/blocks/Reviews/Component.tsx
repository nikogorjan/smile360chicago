import React from 'react'

import type { ReviewsBlock as Props } from '@/payload-types'
import { getTestimonials } from '@/lib/queries'
import { ReviewsCarousel } from './ReviewsCarousel'

export const ReviewsBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  limit,
  paddingTop,
  paddingBottom,
}) => {
  let reviews = await getTestimonials()
  if (limit) reviews = reviews.slice(0, limit)

  return (
    <ReviewsCarousel
      eyebrow={eyebrow || undefined}
      heading={heading || undefined}
      description={description || undefined}
      reviews={reviews}
      paddingTop={paddingTop || undefined}
      paddingBottom={paddingBottom || undefined}
    />
  )
}
