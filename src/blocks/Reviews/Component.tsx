import React from 'react'

import type { ReviewsBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { ReviewCard } from '@/components/site/cards'
import { getTestimonials } from '@/lib/queries'

export const ReviewsBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  align,
  limit,
  background,
}) => {
  let reviews = await getTestimonials()
  if (limit) reviews = reviews.slice(0, limit)

  return (
    <Section tone={(background as 'default') || 'default'}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {reviews.map((t) => (
            <ReviewCard key={t.author} t={t} />
          ))}
        </div>
      </div>
    </Section>
  )
}
