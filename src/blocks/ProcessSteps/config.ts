import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const ProcessSteps: Block = {
  slug: 'processBlock',
  interfaceName: 'ProcessBlock',
  imageURL: '/block-previews/process.svg',
  imageAltText: 'Numbered process steps',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Step', plural: 'Steps' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    backgroundField,
  ],
}
