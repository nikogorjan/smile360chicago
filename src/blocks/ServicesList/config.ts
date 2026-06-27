import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const ServicesList: Block = {
  slug: 'servicesListBlock',
  interfaceName: 'ServicesListBlock',
  imageURL: '/block-previews/services-list.svg',
  imageAltText: 'Editorial list of services with thumbnails and arrows',
  labels: { singular: 'Services List', plural: 'Services Lists' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Pick which services to show, in order. Leave empty to show all services.',
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        label: 'Top-right button (optional)',
        maxRows: 1,
        admin: { description: 'Optional “View all services” button shown top-right of the heading.' },
      },
    }),
  ],
}
