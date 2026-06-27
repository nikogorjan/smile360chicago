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
        {
          name: 'checklist',
          type: 'array',
          maxRows: 6,
          labels: { singular: 'Item', plural: 'Items' },
          admin: { description: 'Short bullet points (up to 6) — shown in two columns.' },
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          type: 'group',
          name: 'stat',
          label: 'Stat callout (optional)',
          fields: [
            { name: 'value', type: 'text', admin: { description: 'e.g. "98%"' } },
            { name: 'caption', type: 'text', admin: { description: 'Short supporting line.' } },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'insurance',
      label: 'Insurance marquee (bottom of section)',
      fields: [
        {
          name: 'heading',
          type: 'text',
          admin: { description: 'Shown above the scrolling provider logos.' },
        },
        {
          name: 'plans',
          type: 'array',
          labels: { singular: 'Plan', plural: 'Plans' },
          admin: { description: 'Provider names in the marquee. Leave empty to use the defaults.' },
          fields: [{ name: 'name', type: 'text' }],
        },
      ],
    },
  ],
}
