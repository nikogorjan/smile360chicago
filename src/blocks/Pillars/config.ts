import type { Block } from 'payload'

export const Pillars: Block = {
  slug: 'pillarsBlock',
  interfaceName: 'PillarsBlock',
  imageURL: '/block-previews/pillars.svg',
  imageAltText: 'Horizontal expanding accordion of pillars',
  labels: { singular: 'Pillars Accordion', plural: 'Pillars Accordions' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'pillars',
      type: 'array',
      minRows: 4,
      maxRows: 7,
      labels: { singular: 'Pillar', plural: 'Pillars' },
      admin: {
        description: 'Numbered automatically (01, 02…) on the site — no need to type a number.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
