import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const PageHero: Block = {
  slug: 'pageHeroBlock',
  interfaceName: 'PageHeroBlock',
  imageURL: '/block-previews/page-hero.svg',
  imageAltText: 'Centered page header with title and buttons',
  labels: { singular: 'Page Hero', plural: 'Page Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'brand',
      options: [
        { label: 'Brand glow', value: 'brand' },
        { label: 'Emergency (coral)', value: 'emergency' },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
  ],
}
