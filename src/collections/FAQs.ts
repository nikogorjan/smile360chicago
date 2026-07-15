import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'isGeneral'], group: 'Content' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'isGeneral',
      type: 'checkbox',
      label: 'General FAQ',
      defaultValue: false,
      admin: {
        description:
          'Show this FAQ in general spots (the homepage and the FAQ block). For a service-specific FAQ, leave this off and use the Services field below instead.',
      },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description:
          'Assign this FAQ to the service page(s) it should appear on. Leave empty for a general FAQ.',
      },
    },
  ],
}
