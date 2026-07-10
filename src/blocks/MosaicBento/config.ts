import type { Block } from 'payload'

import { backgroundField, spacingFields } from '../_shared/fields'

/**
 * Asymmetric mosaic of mixed tiles — photo tiles (rounded, with a label chip),
 * solid cobalt/muted/soft "value" tiles (icon + title + body), and big stat
 * tiles. Inspired by the Maven + ClinicHub bentos, in Smile360's card language.
 * Each tile controls its own size (normal / wide / tall) and tone.
 */
export const MosaicBento: Block = {
  slug: 'mosaicBentoBlock',
  interfaceName: 'MosaicBentoBlock',
  imageURL: '/block-previews/split-feature.svg',
  imageAltText: 'Asymmetric mosaic of photo, value and stat tiles',
  labels: { singular: 'Mosaic Bento', plural: 'Mosaic Bentos' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'highlight',
      type: 'text',
      admin: { description: 'Optional phrase inside the heading to accent in cobalt.' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'tiles',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Tile', plural: 'Tiles' },
      admin: {
        description:
          'Mix photo / value / stat tiles. Vary sizes (wide, tall) for an editorial mosaic.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'value',
              options: [
                { label: 'Value (icon + text)', value: 'value' },
                { label: 'Photo', value: 'photo' },
                { label: 'Stat (big number)', value: 'stat' },
              ],
              admin: { width: '34%' },
            },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Wide (2 cols)', value: 'wide' },
                { label: 'Tall (2 rows)', value: 'tall' },
              ],
              admin: { width: '33%' },
            },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Card (white)', value: 'default' },
                { label: 'Muted', value: 'muted' },
                { label: 'Brand (cobalt)', value: 'brand' },
                { label: 'Soft glow', value: 'glow' },
              ],
              admin: { width: '33%', description: 'Ignored for photo tiles.' },
            },
          ],
        },
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Value tiles: lucide-react icon name (e.g. ShieldCheck).' },
        },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea', admin: { description: 'Value tiles: short supporting line.' } },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Photo tiles only.' },
        },
        {
          name: 'label',
          type: 'text',
          admin: { description: 'Photo tiles: small chip label over the image (e.g. “Reception”).' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'statValue',
              type: 'text',
              admin: { width: '40%', description: 'Stat tiles: the big number (e.g. “20k+”).' },
            },
            {
              name: 'statLabel',
              type: 'text',
              admin: { width: '60%', description: 'Stat tiles: caption under the number.' },
            },
          ],
        },
      ],
    },
    backgroundField,
    spacingFields,
  ],
}
