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
    {
      name: 'category',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All', value: 'all' },
        { label: 'General', value: 'General' },
        { label: 'Insurance', value: 'Insurance' },
        { label: 'Emergency', value: 'Emergency' },
        { label: 'Treatments', value: 'Treatments' },
      ],
    },
    { name: 'limit', type: 'number' },
    { name: 'showCall', type: 'checkbox', defaultValue: true },
    backgroundField,
  ],
}
