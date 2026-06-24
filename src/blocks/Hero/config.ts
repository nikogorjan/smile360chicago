import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const Hero: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  imageURL: '/block-previews/hero.svg',
  imageAltText: 'Large homepage hero with headline, buttons and a visual',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'richText',
      required: true,
      admin: {
        description: 'The hero headline. Select words and choose "Cursive" to accent them.',
      },
    },
    { name: 'subheading', type: 'textarea' },
    { name: 'showRating', type: 'checkbox', defaultValue: true },
    {
      name: 'pills',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      maxRows: 4,
      fields: [{ name: 'label', type: 'text' }],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
  ],
}
