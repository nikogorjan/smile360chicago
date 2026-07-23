import type { Block } from 'payload'

import { spacingFields } from '../_shared/fields'

export const Emergency: Block = {
  slug: 'emergencyBlock',
  interfaceName: 'EmergencyBlock',
  imageURL: '/block-previews/emergency.webp',
  imageAltText: 'High-contrast emergency call-to-action band',
  labels: { singular: 'Emergency Band', plural: 'Emergency Bands' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Got a toothache? Just come to us.' },
    {
      name: 'text',
      type: 'textarea',
      defaultValue:
        'Toothache, broken or knocked-out tooth, swelling? Don’t wait it out. We keep same-day slots open every day — fast relief, gentle hands.',
    },
    { name: 'callLabel', type: 'text', defaultValue: 'Call now' },
    { name: 'secondaryLabel', type: 'text', defaultValue: 'Same-day care' },
    { name: 'secondaryHref', type: 'text', defaultValue: '/emergency-dentist' },
    spacingFields,
  ],
}
