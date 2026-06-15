import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const BeforeAfter: Block = {
  slug: 'beforeAfterBlock',
  interfaceName: 'BeforeAfterBlock',
  imageURL: '/block-previews/before-after.svg',
  imageAltText: 'Interactive before-and-after slider with copy',
  labels: { singular: 'Before/After Slider', plural: 'Before/After Sliders' },
  fields: [
    ...sectionHeaderFields,
    { name: 'ctaLabel', type: 'text', defaultValue: 'Explore the full smile gallery' },
    { name: 'ctaHref', type: 'text', defaultValue: '/smile-gallery' },
    backgroundField,
  ],
}
