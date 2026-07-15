import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * New-patient welcome hero — a split, editorial hero (not the full-bleed home/About
 * hero): welcome copy + reassurance chips on one side, a tall parallax photo on the
 * other. Warmer and lower-pressure than a marketing hero. Defaults to the open canvas.
 */
export const NewPatientHero: Block = {
  slug: 'newPatientHeroBlock',
  interfaceName: 'NewPatientHeroBlock',
  labels: { singular: 'New Patient Hero', plural: 'New Patient Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'New patients' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it in cobalt.' },
    },
    { name: 'lead', type: 'textarea', admin: { description: 'One or two welcoming sentences.' } },
    {
      name: 'chips',
      type: 'array',
      labels: { singular: 'Reassurance chip', plural: 'Reassurance chips' },
      maxRows: 4,
      admin: { description: 'Short trust badges, e.g. “Most insurance accepted”.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'text', admin: { width: '35%', description: 'lucide icon (e.g. ShieldCheck, Clock, HeartHandshake).' } },
            { name: 'text', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Tall photo (e.g. the reception or a welcoming face). Drifts with scroll.' },
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
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
    surfaceFieldWith('canvas'),
    spacingFields,
  ],
}
