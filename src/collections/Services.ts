import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'from'], group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Preventive', 'Cosmetic', 'Restorative', 'Orthodontics', 'Emergency'],
    },
    { name: 'icon', type: 'text', admin: { description: 'lucide-react icon name, e.g. "Sparkles"' } },
    { name: 'excerpt', type: 'textarea' },
    { name: 'from', type: 'text', label: 'Starting price (e.g. "$99")' },
    { name: 'featured', type: 'checkbox' },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    { name: 'body', type: 'richText' },
    slugField({ useAsSlug: 'name' }),
  ],
}
