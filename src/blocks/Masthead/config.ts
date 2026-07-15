import type { Block } from 'payload'

import { headingEditor } from '../_shared/fields'

/**
 * Type-led editorial masthead — the About page's cover. A big serif headline (with
 * one cobalt accent phrase) leads, over a small dot-separated fact row, with a wide
 * panoramic rounded photo beneath. Deliberately NOT the homepage's video hero.
 */
export const Masthead: Block = {
  slug: 'mastheadBlock',
  interfaceName: 'MastheadBlock',
  imageURL: '/block-previews/page-hero.svg',
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
      admin: { description: 'The large headline. Select a phrase, then Style → Brand blue to accent it in cobalt.' },
    },
    { name: 'lead', type: 'textarea', admin: { description: 'Short lead paragraph under the headline.' } },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Wide panoramic photo (team / practice). If empty, a branded panel shows.' },
    },
    { name: 'caption', type: 'text', admin: { description: 'Optional small caption over the photo.' } },
  ],
}
