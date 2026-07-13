import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * A personal, signed letter from the founder — drop-cap opening, first-person prose,
 * a circular portrait and a signature + role. Warmer and more editorial than a
 * portrait+bio split. Defaults to the white panel surface.
 */
export const FounderLetter: Block = {
  slug: 'founderLetterBlock',
  interfaceName: 'FounderLetterBlock',
  imageURL: '/block-previews/team.svg',
  imageAltText: 'A personal signed letter from the founder',
  labels: { singular: 'Founder Letter', plural: 'Founder Letters' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'A note from our founder' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Optional heading. Select a phrase, then Style → Brand blue to accent it.' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The letter. Separate paragraphs with a blank line — the first letter becomes a cobalt drop-cap.',
      },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Circular portrait of the founder.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'signature', type: 'text', admin: { width: '50%', description: 'e.g. “Dr. Mustafa Salam”.' } },
        { name: 'role', type: 'text', admin: { width: '50%', description: 'e.g. “Founder & Lead Dentist · DMD”.' } },
      ],
    },
    surfaceFieldWith('panel'),
    spacingFields,
  ],
}
