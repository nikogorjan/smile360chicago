import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const Bento: Block = {
  slug: 'bentoBlock',
  interfaceName: 'BentoBlock',
  labels: { singular: 'Bento Grid', plural: 'Bento Grids' },
  imageURL: '/block-previews/bento.svg',
  imageAltText: 'Asymmetric grid of mixed-size tiles',
  fields: [
    ...sectionHeaderFields,
    {
      name: 'tiles',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Tile', plural: 'Tiles' },
      admin: { description: 'Mix sizes and tones for an asymmetric, magazine-style layout.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              type: 'select',
              defaultValue: 'normal',
              admin: { width: '50%' },
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Wide (2 cols)', value: 'wide' },
                { label: 'Tall (2 rows)', value: 'tall' },
                { label: 'Large (2x2)', value: 'large' },
              ],
            },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'card',
              admin: { width: '50%' },
              options: [
                { label: 'Card', value: 'card' },
                { label: 'Brand', value: 'brand' },
                { label: 'Accent', value: 'accent' },
                { label: 'Image', value: 'image' },
              ],
            },
          ],
        },
        { name: 'icon', type: 'text', admin: { description: 'lucide-react icon name' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Used when tone is "Image".' },
        },
        { name: 'stat', type: 'text', admin: { description: 'Optional big stat, e.g. "20k+"' } },
      ],
    },
    backgroundField,
  ],
}
