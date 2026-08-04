import type { Block } from 'payload'

import { spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * Languages spoken — a small, friendly strip of language pills. Comes pre-filled with the
 * practice's languages so it only needs dropping onto a page (e.g. About).
 */
export const Languages: Block = {
  slug: 'languagesBlock',
  interfaceName: 'LanguagesBlock',
  labels: { singular: 'Languages', plural: 'Language Sections' },
  imageAltText: 'Row of language pills — the languages spoken at the practice',
  fields: [
    surfaceFieldWith('panel'),
    { name: 'eyebrow', type: 'text', defaultValue: 'Care in your language' },
    { name: 'heading', type: 'text', defaultValue: 'We speak your language' },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Feel understood from the moment you walk in. Our team welcomes patients in several languages:',
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Language', plural: 'Languages' },
      defaultValue: [{ language: 'English' }, { language: 'Assyrian' }, { language: 'Arabic' }],
      fields: [{ name: 'language', type: 'text', required: true }],
    },
    spacingFields,
  ],
}
