import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * A single, bold new-patient offer, styled as a cobalt "pass" with a rotated gold seal
 * and a perforated divider — the page's conversion hook. One offer, one action.
 * Defaults to the open canvas so the cobalt card pops.
 */
export const OfferSpotlight: Block = {
  slug: 'offerSpotlightBlock',
  interfaceName: 'OfferSpotlightBlock',
  imageURL: '/block-previews/offer-spotlight.webp',
  imageAltText: 'Cobalt offer panel with a gold seal',
  labels: { singular: 'Offer Spotlight', plural: 'Offer Spotlights' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'New patient special' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: {
        description: 'The offer, e.g. “$99 exam, X-rays & cleaning”. Style a phrase for emphasis.',
      },
    },
    {
      name: 'subline',
      type: 'textarea',
      admin: { description: 'One line on who it’s for / what’s included.' },
    },
    {
      name: 'seal',
      type: 'text',
      defaultValue: 'New patients only',
      admin: { description: 'Short text inside the gold seal.' },
    },
    {
      name: 'finePrint',
      type: 'text',
      admin: { description: 'Small print — restrictions, expiry.' },
    },
    {
      name: 'sealIcon',
      type: 'text',
      defaultValue: 'BadgePercent',
      admin: { description: 'lucide icon shown in the seal.' },
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    surfaceFieldWith('canvas'),
    spacingFields,
  ],
}
