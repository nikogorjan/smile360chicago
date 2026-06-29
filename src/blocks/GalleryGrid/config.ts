import type { Block } from 'payload'

import { backgroundField } from '../_shared/fields'

export const GalleryGrid: Block = {
  slug: 'galleryGridBlock',
  interfaceName: 'GalleryGridBlock',
  imageURL: '/block-previews/gallery.svg',
  imageAltText: 'Filterable grid of before/after smile cases',
  labels: { singular: 'Smile Gallery Grid', plural: 'Smile Gallery Grids' },
  fields: [backgroundField],
}
