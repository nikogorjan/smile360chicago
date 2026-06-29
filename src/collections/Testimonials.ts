import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Review', plural: 'Patient Reviews' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'author', defaultColumns: ['author', 'treatment', 'rating'], group: 'Content' },
  fields: [
    { name: 'author', type: 'text', required: true },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
    },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'treatment', type: 'text' },
    { name: 'source', type: 'select', options: ['Google', 'In-office'], defaultValue: 'Google' },
    { name: 'featured', type: 'checkbox' },
  ],
}
