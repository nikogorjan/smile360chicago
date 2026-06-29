import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const ServicesGrid: Block = {
  slug: 'servicesGridBlock',
  interfaceName: 'ServicesGridBlock',
  imageURL: '/block-previews/services-grid.svg',
  imageAltText: 'Grid of service cards pulled from the Services collection',
  labels: { singular: 'Services Grid', plural: 'Services Grids' },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'source',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All services', value: 'all' },
        { label: 'Featured only', value: 'featured' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: { description: 'Max number of services to show (leave blank for all).' },
    },
    { name: 'showViewAll', type: 'checkbox', defaultValue: true },
    backgroundField,
  ],
}
