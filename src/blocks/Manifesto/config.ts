import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * A calm, bold philosophy band — one oversized serif statement with a cobalt accent
 * phrase, centered, on a full-width cobalt surface. A confident pause between
 * sections (the opposite of the coral Emergency CTA). Defaults to the brand band.
 */
export const Manifesto: Block = {
  slug: 'manifestoBlock',
  interfaceName: 'ManifestoBlock',
  imageURL: '/block-previews/manifesto.webp',
  imageAltText: 'Oversized statement type on a full-width band',
  labels: { singular: 'Manifesto', plural: 'Manifestos' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'statement',
      type: 'richText',
      editor: headingEditor,
      required: true,
      admin: {
        description: 'The one big line. Select a phrase, then Style → Brand blue to accent it.',
      },
    },
    {
      name: 'footnote',
      type: 'text',
      admin: { description: 'Optional small line below the statement.' },
    },
    surfaceFieldWith('brand'),
    spacingFields,
  ],
}
