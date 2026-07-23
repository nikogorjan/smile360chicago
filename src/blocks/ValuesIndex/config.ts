import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceField } from '../_shared/fields'

/**
 * Values as a numbered editorial index — hairline-ruled rows (01, 02, …) with a big
 * serif value name, a one-line description and an icon. Pure typography, no cards —
 * a deliberate contrast to the homepage's Pillars grid.
 */
export const ValuesIndex: Block = {
  slug: 'valuesIndexBlock',
  interfaceName: 'ValuesIndexBlock',
  imageURL: '/block-previews/values-index.webp',
  imageAltText: 'Numbered index of practice values in columns',
  labels: { singular: 'Values Index', plural: 'Values Indexes' },
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
      labels: { singular: 'Value', plural: 'Values' },
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'lucide-react icon name.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'text', admin: { description: 'One short supporting line.' } },
      ],
    },
    surfaceField,
    spacingFields,
  ],
}
