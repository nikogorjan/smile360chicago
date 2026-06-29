import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField } from '../_shared/fields'

export const SplitFeature: Block = {
  slug: 'splitFeatureBlock',
  interfaceName: 'SplitFeatureBlock',
  labels: { singular: 'Split Feature', plural: 'Split Features' },
  imageURL: '/block-previews/split-feature.svg',
  imageAltText: 'Image beside text with a checklist',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Shown beside the text. If empty, a branded panel is used.' },
    },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image on right', value: 'right' },
        { label: 'Image on left', value: 'left' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'bullets',
      type: 'array',
      labels: { singular: 'Bullet', plural: 'Bullets' },
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      type: 'collapsible',
      label: 'Floating stat (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'statValue', type: 'text', admin: { width: '40%' } },
            { name: 'statLabel', type: 'text', admin: { width: '60%' } },
          ],
        },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    backgroundField,
  ],
}
