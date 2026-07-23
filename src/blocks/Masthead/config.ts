import type { Block } from 'payload'

import { headingEditor, spacingFieldsFlush } from '../_shared/fields'

/** Where to anchor the photo when object-cover crops it (object-position). */
const FOCUS_OPTIONS = [
  { label: 'Center', value: 'center' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Top left', value: 'top-left' },
  { label: 'Top right', value: 'top-right' },
  { label: 'Bottom left', value: 'bottom-left' },
  { label: 'Bottom right', value: 'bottom-right' },
]

/**
 * Type-led editorial masthead — the About page's cover. A big serif headline (with
 * one cobalt accent phrase) leads, over a small dot-separated fact row, with a wide
 * panoramic rounded photo beneath. Deliberately NOT the homepage's video hero.
 */
export const Masthead: Block = {
  slug: 'mastheadBlock',
  interfaceName: 'MastheadBlock',
  imageURL: '/block-previews/masthead.webp',
  imageAltText: 'Large editorial headline over a wide panoramic photo',
  labels: { singular: 'Masthead', plural: 'Mastheads' },
  fields: [
    {
      name: 'facts',
      type: 'array',
      labels: { singular: 'Fact', plural: 'Facts' },
      maxRows: 4,
      admin: { description: 'Small dot-separated meta facts (e.g. “Est. 2009”, “Michigan Ave”).' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      required: true,
      admin: {
        description:
          'The large headline. Select a phrase, then Style → Brand blue to accent it in cobalt.',
      },
    },
    {
      name: 'lead',
      type: 'textarea',
      admin: { description: 'Short lead paragraph under the headline.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Wide panoramic photo (team / practice). If empty, a branded panel shows.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imageFocus',
          type: 'select',
          label: 'Image focus — desktop',
          defaultValue: 'center',
          options: FOCUS_OPTIONS,
          admin: {
            width: '50%',
            description: 'Which part of the photo stays in frame on desktop.',
          },
        },
        {
          name: 'imageFocusMobile',
          type: 'select',
          label: 'Image focus — mobile',
          defaultValue: 'center',
          options: FOCUS_OPTIONS,
          admin: {
            width: '50%',
            description:
              'Focus on the taller mobile crop — set independently (e.g. “Top” to keep a face in frame).',
          },
        },
      ],
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional small caption over the photo.' },
    },
    spacingFieldsFlush,
  ],
}
