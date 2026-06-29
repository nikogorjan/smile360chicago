import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const Appointment: Block = {
  slug: 'appointmentBlock',
  interfaceName: 'AppointmentBlock',
  imageURL: '/block-previews/appointment.svg',
  imageAltText: 'Appointment request form with contact info column',
  labels: { singular: 'Appointment Form', plural: 'Appointment Forms' },
  fields: [
    ...sectionHeaderFields,
    {
      name: 'showContactInfo',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the phone / address / hours column next to the form.' },
    },
    backgroundField,
  ],
}
