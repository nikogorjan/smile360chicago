import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * "Comfort commitments" — a calming, reassurance-first grid for the New Patients page.
 * A short header plus the specific things that make a visit easy (gentle care, sedation
 * options, breaks anytime, judgment-free, cozy extras, unhurried time). Each item is a
 * soft icon-top cell. Sits on a white panel by default. Directly disarms dental anxiety.
 */
export const Comfort: Block = {
  slug: 'comfortBlock',
  interfaceName: 'ComfortBlock',
  labels: { singular: 'Comfort', plural: 'Comfort Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'You’re in good hands' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it.' },
    },
    { name: 'intro', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Comfort', plural: 'Comforts' },
      admin: { description: 'The things that make a visit easy. 3 or 6 read best.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: { width: '35%', description: 'lucide icon (e.g. Feather, Wind, Hand, Headphones).' },
            },
            { name: 'title', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    surfaceFieldWith('panel'),
    spacingFields,
  ],
}
