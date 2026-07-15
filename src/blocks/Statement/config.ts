import type { Block } from 'payload'

import { backgroundField, spacingFields } from '../_shared/fields'

/**
 * Oversized editorial statement — one punchy mission line with a single cobalt
 * accent phrase (Maven-style), an optional supporting sentence and an optional
 * small attribution. A calm pause between richer sections.
 */
export const Statement: Block = {
  slug: 'statementBlock',
  interfaceName: 'StatementBlock',
  imageAltText: 'Large editorial statement line',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the statement.' } },
    {
      name: 'statement',
      type: 'textarea',
      required: true,
      admin: { description: 'The big editorial line — keep it short and punchy.' },
    },
    {
      name: 'highlight',
      type: 'text',
      admin: { description: 'Optional phrase inside the statement to accent in cobalt.' },
    },
    {
      name: 'subline',
      type: 'textarea',
      admin: { description: 'Optional supporting sentence below the statement.' },
    },
    {
      name: 'attribution',
      type: 'text',
      admin: { description: 'Optional small credit line, e.g. “Mustafa — Founder”.' },
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
    },
    backgroundField,
    spacingFields,
  ],
}
