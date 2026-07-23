import type { Block } from 'payload'

/** Inline pull quote — lifts one sentence out large, with an optional attribution. */
export const PullQuote: Block = {
  slug: 'pullQuoteBlock',
  interfaceName: 'PullQuoteBlock',
  labels: { singular: 'Pull Quote', plural: 'Pull Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'attribution',
      type: 'text',
      admin: { description: 'Optional — e.g. “Dr. Mustafa Salam”.' },
    },
  ],
}
