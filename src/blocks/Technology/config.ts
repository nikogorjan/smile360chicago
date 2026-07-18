import type { Block } from 'payload'

import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * Technology showcase — an icon-led grid of the tools the practice uses (each: icon,
 * name, one-line patient benefit), with an optional strip of supporting photos below.
 * Icon-driven so a handful of photos is plenty. CMS-driven.
 */
export const Technology: Block = {
  slug: 'technologyBlock',
  interfaceName: 'TechnologyBlock',
  labels: { singular: 'Technology', plural: 'Technology Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Technology' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it.' },
    },
    { name: 'lead', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Technology', plural: 'Technologies' },
      admin: {
        initCollapsed: true,
        description: 'Each: icon + name + one-line patient benefit. Only list what you actually have.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: {
                width: '30%',
                description: 'lucide icon (e.g. ScanLine, Radiation, Box, Camera, Sparkles, Zap).',
              },
            },
            { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'description', type: 'text', admin: { description: 'One line on the patient benefit.' } },
      ],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: {
        description: 'Optional supporting photos (equipment / office). Click “Add Photo” for each — about 3 looks best.',
      },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    surfaceFieldWith('muted'),
    spacingFields,
  ],
}
