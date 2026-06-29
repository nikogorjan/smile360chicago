import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField } from '../_shared/fields'

export const DentistFeature: Block = {
  slug: 'dentistFeatureBlock',
  interfaceName: 'DentistFeatureBlock',
  labels: { singular: 'Dentist Feature', plural: 'Dentist Features' },
  imageURL: '/block-previews/team.svg',
  imageAltText: 'A single dentist portrait beside their bio, credentials and specialty chips',
  fields: [
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait of the dentist. If empty, a stock photo is used.' },
    },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Portrait on left', value: 'left' },
        { label: 'Portrait on right', value: 'right' },
      ],
    },
    { name: 'eyebrow', type: 'text', defaultValue: 'Meet your dentist' },
    { name: 'heading', type: 'text', required: true },
    { name: 'name', type: 'text', admin: { description: 'e.g. Dr. Mustafa Salam, DMD' } },
    { name: 'credentials', type: 'text', admin: { description: 'e.g. Lead Dentist & Founder' } },
    { name: 'bio', type: 'textarea' },
    {
      name: 'specialties',
      type: 'array',
      labels: { singular: 'Specialty', plural: 'Specialties' },
      admin: { description: 'Short pill chips, e.g. Cosmetic Dentistry, Invisalign®, Implants.' },
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      type: 'collapsible',
      label: 'Proof badge (optional)',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'statValue', type: 'text', admin: { width: '40%', description: 'e.g. 4.9★' } },
            {
              name: 'statLabel',
              type: 'text',
              admin: { width: '60%', description: 'e.g. 487+ Google reviews' },
            },
          ],
        },
      ],
    },
    linkGroup({
      appearances: false,
      overrides: { maxRows: 1, admin: { description: 'Call-to-action (e.g. Book Appointment).' } },
    }),
    backgroundField,
  ],
}
