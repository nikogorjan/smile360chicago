import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const GalleryCases: CollectionConfig = {
  slug: 'gallery-cases',
  labels: { singular: 'Smile Case', plural: 'Smile Gallery' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'treatment', 'consentOnFile'], group: 'Content' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'treatment', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'beforeImage', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
        { name: 'afterImage', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
      ],
    },
    {
      name: 'consentOnFile',
      type: 'checkbox',
      label: 'Patient photo consent on file',
      admin: { description: 'Required before publishing real before/after photos.' },
    },
  ],
}
