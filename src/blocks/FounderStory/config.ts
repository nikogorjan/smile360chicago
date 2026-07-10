import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField, spacingFields } from '../_shared/fields'

/**
 * Editorial founder feature: a large rounded portrait beside the story, with an
 * optional pull-quote and a stylised signature + role line. Richer and more
 * personal than a plain split — for the "Our story / Meet Mustafa" moment.
 */
export const FounderStory: Block = {
  slug: 'founderStoryBlock',
  interfaceName: 'FounderStoryBlock',
  imageURL: '/block-previews/split-feature.svg',
  imageAltText: 'Founder portrait beside a story with a pull-quote and signature',
  labels: { singular: 'Founder Story', plural: 'Founder Stories' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait of the founder. If empty, a branded panel shows.' },
    },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image on left', value: 'left' },
        { label: 'Image on right', value: 'right' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'highlight',
      type: 'text',
      admin: { description: 'Optional phrase inside the heading to accent in cobalt.' },
    },
    { name: 'body', type: 'textarea', admin: { description: 'The story — 2–4 short paragraphs.' } },
    {
      name: 'quote',
      type: 'textarea',
      admin: { description: 'Optional pull-quote shown large with a cobalt rule.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'signature',
          type: 'text',
          admin: { width: '50%', description: 'Name shown as a signature, e.g. “Mustafa”.' },
        },
        {
          name: 'role',
          type: 'text',
          admin: { width: '50%', description: 'e.g. “Founder & Lead Dentist”.' },
        },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      labels: { singular: 'Bullet', plural: 'Bullets' },
      fields: [{ name: 'item', type: 'text' }],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1 } }),
    backgroundField,
    spacingFields,
  ],
}
