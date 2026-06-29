import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'question', defaultColumns: ['question', 'category'], group: 'Content' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['General', 'Insurance', 'Emergency', 'Treatments'],
      defaultValue: 'General',
    },
  ],
}
