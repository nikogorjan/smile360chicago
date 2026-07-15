import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField, spacingFields } from '../_shared/fields'

/**
 * Photo-led interior hero: eyebrow + big serif heading (with one cobalt accent
 * word) + intro on one side, a large rounded portrait on the other with a
 * floating rating card (ClinicHub-style). Trust chips + up to two CTAs.
 * Theme-aware, with background + spacing controls.
 */
export const AboutHero: Block = {
  slug: 'aboutHeroBlock',
  interfaceName: 'AboutHeroBlock',
  imageURL: '/block-previews/split-feature.svg',
  imageAltText: 'Photo-led page header with rating card, trust chips and buttons',
  labels: { singular: 'About Hero', plural: 'About Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the heading.' } },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'highlight',
      type: 'text',
      admin: { description: 'Optional phrase inside the heading to accent in cobalt.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'One or two sentences under the heading.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Portrait-orientation photo (e.g. Mustafa or the clinic). If empty, a branded panel shows.',
      },
    },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image on right', value: 'right' },
        { label: 'Image on left', value: 'left' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Floating rating card (optional)',
      admin: { initCollapsed: true, description: 'Small star card over the photo. Leave label empty to hide.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ratingValue',
              type: 'number',
              defaultValue: 5,
              admin: { width: '30%', description: 'Filled stars (1–5).' },
            },
            {
              name: 'ratingLabel',
              type: 'text',
              admin: { width: '70%', description: 'e.g. “4.9 from 487 Google reviews”' },
            },
          ],
        },
      ],
    },
    {
      name: 'chips',
      type: 'array',
      labels: { singular: 'Trust chip', plural: 'Trust chips' },
      maxRows: 4,
      admin: { description: 'Small trust badges, e.g. “15+ years”, “Same-day care”.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: { width: '35%', description: 'lucide-react icon name (e.g. ShieldCheck).' },
            },
            { name: 'label', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
    backgroundField,
    spacingFields,
  ],
}
