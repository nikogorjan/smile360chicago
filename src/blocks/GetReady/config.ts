import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * "Before your first visit" — one or two checklist columns (e.g. what to bring) as clean
 * cards. Add a photo (Image) and a single column renders as a split card: the checklist on
 * one side, the photo filling the other so it never feels empty. With two columns and no
 * image it falls back to the side-by-side card grid (mark a column to emphasise it in cobalt
 * and hang the CTA on it). Defaults to the grey band so the cards read clearly.
 */
export const GetReady: Block = {
  slug: 'getReadyBlock',
  interfaceName: 'GetReadyBlock',
  imageURL: '/block-previews/get-ready.webp',
  imageAltText: 'Checklist beside an edge-to-edge photo',
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
            {
              name: 'icon',
              type: 'text',
              admin: { width: '30%', description: 'lucide icon (e.g. ClipboardList, Laptop).' },
            },
            { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'highlight',
              type: 'checkbox',
              admin: { width: '20%', description: 'Emphasise in cobalt + show the CTA here.' },
            },
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional photo shown beside the checklist so a single column never feels empty.',
      },
    },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.image),
        description: 'Which side the photo sits on (desktop).',
      },
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    surfaceFieldWith('muted'),
    spacingFields,
  ],
}
