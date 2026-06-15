import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Team Member', plural: 'Team' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role'], group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'credentials', type: 'text', label: 'Credentials (e.g. DDS, FAGD)' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'specialties', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
