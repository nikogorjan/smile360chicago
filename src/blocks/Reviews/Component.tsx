import React from 'react'

import type { ReviewsBlock as Props } from '@/payload-types'
import { getTestimonials } from '@/lib/queries'
import { ReviewsCarousel } from './ReviewsCarousel'

export const ReviewsBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  limit,
  hideTestimonials,
  videoUrl,
  videoEyebrow,
  videoHeading,
  videoDescription,
  videoText,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  // Nothing left to show: cards hidden and no video → render nothing (no empty section).
  if (hideTestimonials && !videoUrl) return null

  let reviews: Awaited<ReturnType<typeof getTestimonials>> = []
  if (!hideTestimonials) {
    reviews = await getTestimonials()
    if (limit) reviews = reviews.slice(0, limit)
  }

  return (
    <ReviewsCarousel
      eyebrow={eyebrow || undefined}
      heading={heading || undefined}
      description={description || undefined}
      reviews={reviews}
      hideTestimonials={!!hideTestimonials}
      videoUrl={videoUrl || undefined}
      videoEyebrow={videoEyebrow || undefined}
      videoHeading={videoHeading || undefined}
      videoDescription={videoDescription || undefined}
      videoText={videoText || undefined}
      paddingTop={paddingTop || undefined}
      paddingBottom={paddingBottom || undefined}
      topGap={topGap || undefined}
      bottomGap={bottomGap || undefined}
    />
  )
}
