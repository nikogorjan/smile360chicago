import type { Block } from 'payload'

import { backgroundField, spacingFields } from '../_shared/fields'

/**
 * A row of circular progress rings with a big value + caption each — a distinctive
 * "by the numbers" treatment (Maven "improving care"). Uses the site's StatRing
 * primitive. Theme-aware, with background + spacing controls.
 */
export const MetricRings: Block = {
  slug: 'metricRingsBlock',
  interfaceName: 'MetricRingsBlock',
  imageURL: '/block-previews/stats.svg',
  imageAltText: 'Row of circular progress rings with numbers',
  labels: { singular: 'Metric Rings', plural: 'Metric Rings' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'highlight',
      type: 'text',
      admin: { description: 'Optional phrase inside the heading to accent in cobalt.' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'metrics',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Metric', plural: 'Metrics' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '30%', description: 'e.g. “4.9★” or “20k+”.' } },
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'percent',
              type: 'number',
              defaultValue: 75,
              admin: { width: '20%', description: 'Ring fill 0–100.' },
            },
          ],
        },
      ],
    },
    backgroundField,
    spacingFields,
  ],
}
