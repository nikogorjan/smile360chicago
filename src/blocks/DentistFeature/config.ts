import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField, spacingFields } from '../_shared/fields'

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
      name: 'quote',
      type: 'textarea',
      admin: { description: 'Optional short personal quote from the dentist, shown under the bio.' },
    },
    linkGroup({
      appearances: false,
      overrides: { maxRows: 1, admin: { description: 'Call-to-action (e.g. Book Appointment).' } },
    }),
    backgroundField,
    spacingFields,
  ],
}
