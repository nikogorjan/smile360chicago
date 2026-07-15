import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const Faq: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlock',
  imageURL: '/block-previews/faq.svg',
  imageAltText: 'FAQ accordion with expandable questions',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...sectionHeaderFields,
    { name: 'limit', type: 'number' },
    { name: 'showCall', type: 'checkbox', defaultValue: true },
    backgroundField,
  ],
}
