import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  imageURL: '/block-previews/stats.svg',
  imageAltText: 'Row of key statistics',
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
  ],
}
