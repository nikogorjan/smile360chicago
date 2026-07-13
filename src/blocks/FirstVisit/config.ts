import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * "Your first visit" — a warm, reassuring step journey shown as a connected timeline.
 * Answers the question a new patient has right before booking ("what's it actually
 * like to come here?"). Defaults to the white panel surface so it reads as a calm,
 * card-like breather between busier sections.
 */
export const FirstVisit: Block = {
  slug: 'firstVisitBlock',
  interfaceName: 'FirstVisitBlock',
  labels: { singular: 'First Visit', plural: 'First Visit Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Your first visit' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it in cobalt.' },
    },
    { name: 'intro', type: 'textarea', admin: { description: 'Optional sentence under the heading.' } },
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      maxRows: 5,
      labels: { singular: 'Step', plural: 'Steps' },
      admin: { description: '2–5 steps, shown left-to-right as a connected journey.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: {
                width: '35%',
                description: 'lucide icon (e.g. CalendarCheck, Coffee, Stethoscope, Sparkles).',
              },
            },
            { name: 'title', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    surfaceFieldWith('panel'),
    spacingFields,
  ],
}
