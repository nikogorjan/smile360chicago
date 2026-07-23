import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields, spacingFields } from '../_shared/fields'

export const Appointment: Block = {
  slug: 'appointmentBlock',
  interfaceName: 'AppointmentBlock',
  imageURL: '/block-previews/appointment.webp',
  imageAltText: 'Appointment request form with a contact column',
  labels: { singular: 'Appointment Form', plural: 'Appointment Forms' },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description:
          'Which form to show. Build and edit the fields, confirmation message and email routing under Forms.',
      },
    },
    {
      name: 'showContactInfo',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the phone / address / hours column next to the form.' },
    },
    backgroundField,
    spacingFields,
  ],
}
