import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * A personal, signed letter from the founder — the founder's words set beside an
 * oversized quote mark, with a photo, a circular portrait and a signature + role.
 * Warmer and more editorial than a portrait+bio split. Defaults to the white panel surface.
 */
export const FounderLetter: Block = {
  slug: 'founderLetterBlock',
  interfaceName: 'FounderLetterBlock',
  imageURL: '/block-previews/founder-letter.webp',
  imageAltText: 'Signed letter from the dentist beside a portrait',
  labels: { singular: 'Founder Letter', plural: 'Founder Letters' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'A note from our founder' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: {
        description: 'Optional heading. Select a phrase, then Style → Brand blue to accent it.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      admin: {
        description:
          'The founder’s words. Leave a blank line between paragraphs — each renders as its own paragraph, shown beside an oversized quote mark.',
      },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Small circular portrait shown beside the signature.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Large photo shown on the opposite side of the letter (e.g. the founder). If empty, a branded panel shows.',
      },
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
    {
      type: 'row',
      fields: [
        {
          name: 'signature',
          type: 'text',
          admin: { width: '50%', description: 'e.g. “Dr. Mustafa Salam”.' },
        },
        {
          name: 'role',
          type: 'text',
          admin: { width: '50%', description: 'e.g. “Founder & Lead Dentist · DMD”.' },
        },
      ],
    },
    surfaceFieldWith('panel'),
    spacingFields,
  ],
}
