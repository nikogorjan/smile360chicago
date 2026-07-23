import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields, spacingFields } from '../_shared/fields'

export const Reviews: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  imageURL: '/block-previews/reviews.webp',
  imageAltText: 'Carousel of patient review cards',
  labels: { singular: 'Reviews', plural: 'Reviews' },
  fields: [
    ...sectionHeaderFields,
    { name: 'limit', type: 'number', admin: { description: 'Max reviews to show.' } },
    backgroundField,
    spacingFields,
  ],
}
