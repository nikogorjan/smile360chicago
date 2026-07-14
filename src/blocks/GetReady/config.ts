import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * "Before your first visit" — up to two checklist columns (e.g. what to bring, and what
 * to do online) as clean cards. Mark a column to emphasise it in cobalt and hang the CTA
 * on it. Defaults to the grey band so the cards read clearly.
 */
export const GetReady: Block = {
  slug: 'getReadyBlock',
  interfaceName: 'GetReadyBlock',
  labels: { singular: 'Get Ready', plural: 'Get Ready Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Before you arrive' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it.' },
    },
    { name: 'intro', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'text', admin: { width: '30%', description: 'lucide icon (e.g. ClipboardList, Laptop).' } },
            { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'highlight', type: 'checkbox', admin: { width: '20%', description: 'Emphasise in cobalt + show the CTA here.' } },
          ],
        },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Item', plural: 'Items' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    surfaceFieldWith('muted'),
    spacingFields,
  ],
}
