import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * "Why Smile360" comparison — a two-column table pitting the practice against the
 * usual busy-practice experience, positively framed. Each row: a criterion, the
 * Smile360 answer (checked, cobalt-highlighted column) vs. the usual (muted).
 */
export const Comparison: Block = {
  slug: 'comparisonBlock',
  interfaceName: 'ComparisonBlock',
  imageURL: '/block-previews/comparison.webp',
  imageAltText: 'Side-by-side comparison table with a cobalt column',
  labels: { singular: 'Comparison', plural: 'Comparisons' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Why Smile360' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it.' },
    },
    { name: 'intro', type: 'textarea' },
    {
      type: 'row',
      fields: [
        {
          name: 'ourLabel',
          type: 'text',
          defaultValue: 'At Smile360',
          admin: { width: '50%', description: 'Header for the highlighted (your) column.' },
        },
        {
          name: 'theirLabel',
          type: 'text',
          defaultValue: 'The usual dental visit',
          admin: { width: '50%', description: 'Header for the comparison column.' },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Row', plural: 'Rows' },
      admin: {
        initCollapsed: true,
        description: 'Each row: what you’re comparing, then the Smile360 answer vs. the usual.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'What’s being compared, e.g. “Your dentist”, “Pace”, “Emergencies”.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ours',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'The Smile360 answer.' },
            },
            {
              name: 'theirs',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'The usual answer.' },
            },
          ],
        },
      ],
    },
    surfaceFieldWith('canvas'),
    spacingFields,
  ],
}
