import type { Block } from 'payload'

/**
 * A full-bleed, edge-to-edge live map band (no container, no card) with a floating
 * "Get directions" chip. A clean, map-forward close for the contact page.
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
  ],
}
