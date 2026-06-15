import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown items',
          admin: {
            initCollapsed: true,
            description: 'Optional. Add items here to turn this into a dropdown menu.',
          },
          fields: [
            link({ appearances: false }),
            { name: 'description', type: 'text', label: 'Short description' },
          ],
        },
      ],
      maxRows: 7,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Book Now',
      admin: { description: 'Label for the primary header button.' },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
