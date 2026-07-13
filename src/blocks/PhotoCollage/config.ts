import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceField } from '../_shared/fields'

/**
 * An art-directed collage of candid practice photos in varied, deliberately offset
 * rounded frames (rounded-3xl) with optional captions — atmosphere, not before/after
 * results. Rounded framing is the deliberate feature here.
 */
export const PhotoCollage: Block = {
  slug: 'photoCollageBlock',
  interfaceName: 'PhotoCollageBlock',
  imageURL: '/block-previews/media-banner.svg',
  imageAltText: 'A collage of candid photos in rounded frames',
  labels: { singular: 'Photo Collage', plural: 'Photo Collages' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it in cobalt.' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: { description: 'Mix sizes (wide, tall, big) for an offset, editorial collage.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', admin: { width: '60%' } },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Wide (2 cols)', value: 'wide' },
                { label: 'Tall (2 rows)', value: 'tall' },
                { label: 'Big (2×2)', value: 'big' },
              ],
              admin: { width: '40%' },
            },
          ],
        },
        { name: 'caption', type: 'text', admin: { description: 'Optional caption over the photo.' } },
      ],
    },
    surfaceField,
    spacingFields,
  ],
}
