import type { Block } from 'payload'

import { spacingFields } from '../_shared/fields'

export const Stats: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  imageURL: '/block-previews/stats.webp',
  imageAltText: 'Row of headline numbers in cards',
  labels: { singular: 'Stats Bar', plural: 'Stats Bars' },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    spacingFields,
  ],
}
