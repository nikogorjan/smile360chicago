import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField, spacingFields } from '../_shared/fields'

export const GalleryPreview: Block = {
  slug: 'galleryPreviewBlock',
  interfaceName: 'GalleryPreviewBlock',
  labels: { singular: 'Gallery Preview', plural: 'Gallery Previews' },
  imageURL: '/block-previews/team.svg',
  imageAltText: 'A few latest smile-gallery before/after cases with a view-all button',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Smile gallery' },
    { name: 'heading', type: 'text', defaultValue: 'Real smiles, real results' },
    { name: 'description', type: 'textarea' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 6,
      admin: { description: 'How many of the latest before/after cases to show (3 recommended).' },
    },
    linkGroup({
      appearances: false,
      overrides: { maxRows: 1, admin: { description: '“View full gallery” link (e.g. /smile-gallery).' } },
    }),
    backgroundField,
    spacingFields,
  ],
}
