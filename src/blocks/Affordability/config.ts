import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * Insurance & payment reassurance — a small grid of "worry-killer" cards (we file for
 * you, financing, no surprise bills) plus an optional row of accepted-plan chips.
 * Defaults to the open canvas.
 */
export const Affordability: Block = {
  slug: 'affordabilityBlock',
  interfaceName: 'AffordabilityBlock',
  labels: { singular: 'Affordability', plural: 'Affordability Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Insurance & payment' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it.' },
    },
    { name: 'intro', type: 'textarea' },
    {
      name: 'points',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Point', plural: 'Points' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'text', admin: { width: '35%', description: 'lucide icon (e.g. ShieldCheck, CreditCard, ReceiptText).' } },
            { name: 'title', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'insurers',
      type: 'array',
      labels: { singular: 'Plan', plural: 'Plans' },
      admin: { description: 'Accepted-plan names, shown as small chips.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'insurersLabel', type: 'text', defaultValue: 'Accepting most major plans' },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    surfaceFieldWith('canvas'),
    spacingFields,
  ],
}
