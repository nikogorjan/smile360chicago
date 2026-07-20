import type { Block } from 'payload'

/**
 * A full-width live map that floats as a rounded card — inset by a small even padding
 * (p-3/p-4) with 8px rounded corners and a floating "Get directions" chip. A clean,
 * map-forward block for the Contact and About pages.
 */
export const MapBand: Block = {
  slug: 'mapBandBlock',
  interfaceName: 'MapBandBlock',
  labels: { singular: 'Map Band', plural: 'Map Bands' },
  fields: [
    {
      name: 'mapAddress',
      type: 'text',
      admin: { description: 'Address for the map. Leave empty to use the practice address.' },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Tall', value: 'tall' },
      ],
    },
    {
      name: 'tightenTop',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'After a white panel block (e.g. First visit)', value: 'panel' },
        { label: 'After a full section (e.g. Appointment form)', value: 'section' },
      ],
      admin: {
        description:
          'Pull the map up to absorb the bottom padding of the block above it, so the gap on top matches the small even margin on the sides.',
      },
    },
  ],
}
