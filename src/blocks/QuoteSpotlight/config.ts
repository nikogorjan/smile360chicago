import type { Block } from 'payload'

export const QuoteSpotlight: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  labels: { singular: 'Quote Spotlight', plural: 'Quote Spotlights' },
  imageURL: '/block-previews/quote.svg',
  imageAltText: 'Large single testimonial with oversized type',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'author', type: 'text', admin: { width: '50%' } },
        { name: 'role', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional background photo. If empty, a brand background is used.' },
    },
  ],
}
