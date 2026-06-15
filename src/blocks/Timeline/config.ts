import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const Timeline: Block = {
  slug: 'timelineBlock',
  interfaceName: 'TimelineBlock',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  imageURL: '/block-previews/timeline.svg',
  imageAltText: 'Vertical alternating timeline of steps',
  fields: [
    ...sectionHeaderFields,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Step', plural: 'Steps' },
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'lucide-react icon name' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    backgroundField,
  ],
}
