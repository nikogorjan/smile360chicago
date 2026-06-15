import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const FeatureGrid: Block = {
  slug: 'featureGridBlock',
  interfaceName: 'FeatureGridBlock',
  imageURL: '/block-previews/feature-grid.svg',
  imageAltText: 'Grid of feature cards with icons',
  labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'lucide-react icon name, e.g. "HeartHandshake".' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    backgroundField,
  ],
}
