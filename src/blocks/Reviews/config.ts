import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const Reviews: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  imageURL: '/block-previews/reviews.svg',
  imageAltText: 'Patient review cards with star ratings',
  labels: { singular: 'Reviews', plural: 'Reviews' },
  fields: [
    ...sectionHeaderFields,
    { name: 'limit', type: 'number', admin: { description: 'Max reviews to show.' } },
    backgroundField,
  ],
}
