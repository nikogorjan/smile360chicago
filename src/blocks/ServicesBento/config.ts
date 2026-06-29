import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const ServicesBento: Block = {
  slug: 'servicesBentoBlock',
  interfaceName: 'ServicesBentoBlock',
  imageURL: '/block-previews/bento.svg',
  imageAltText: 'Bento grid of service tiles with images',
  labels: { singular: 'Services Bento', plural: 'Services Bentos' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our services' },
    { name: 'heading', type: 'text', defaultValue: 'Explore our services' },
    {
      name: 'tiles',
      type: 'array',
      labels: { singular: 'Tile', plural: 'Tiles' },
      admin: {
        initCollapsed: true,
        description:
          'Pick services and set each tile size for the bento rhythm. Leave empty to show all services at normal size.',
      },
      fields: [
        { name: 'service', type: 'relationship', relationTo: 'services', required: true },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'normal',
          admin: { description: 'Wide spans 2 columns; Tall spans 2 rows (desktop/tablet).' },
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Wide (2 columns)', value: 'wide' },
            { label: 'Tall (2 rows)', value: 'tall' },
          ],
        },
      ],
    },
    linkGroup({
      appearances: false,
      overrides: {
        label: 'Top-right button (optional)',
        maxRows: 1,
        admin: {
          description: 'Optional “View all services” button shown top-right of the heading.',
        },
      },
    }),
  ],
}
