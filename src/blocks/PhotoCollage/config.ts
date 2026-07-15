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
      admin: { description: 'A clean, aligned grid of photos — 3 across on desktop, 2 on tablet.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text', admin: { description: 'Optional caption over the photo.' } },
      ],
    },
    surfaceField,
    spacingFields,
  ],
}
