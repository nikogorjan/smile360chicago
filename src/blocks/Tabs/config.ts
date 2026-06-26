import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const Tabs: Block = {
  slug: 'tabsBlock',
  interfaceName: 'TabsBlock',
  labels: { singular: 'Tabs Showcase', plural: 'Tabs Showcases' },
  imageURL: '/block-previews/bento.svg',
  imageAltText: 'Interactive tabbed feature showcase',
  fields: [
    ...sectionHeaderFields,
    {
      name: 'tabs',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Tab', plural: 'Tabs' },
      admin: { description: 'A vertical tab selector that swaps the content panel.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'icon', type: 'text', admin: { width: '50%', description: 'lucide-react icon name' } },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        {
          name: 'bullets',
          type: 'array',
          labels: { singular: 'Point', plural: 'Points' },
          fields: [{ name: 'item', type: 'text' }],
        },
        {
          type: 'row',
          fields: [
            { name: 'stat', type: 'text', admin: { width: '50%', description: 'e.g. "20k+"' } },
            { name: 'statLabel', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },
    backgroundField,
  ],
}
