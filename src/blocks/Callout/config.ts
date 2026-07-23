import type { Block } from 'payload'

/**
 * Inline callout for blog posts — a bordered card that lifts a key point out of the body
 * copy. The `variant` sets the icon and accent colour; nothing else needs styling.
 */
export const Callout: Block = {
  slug: 'calloutBlock',
  interfaceName: 'CalloutBlock',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'tip',
      options: [
        { label: 'Tip', value: 'tip' },
        { label: 'Note', value: 'note' },
        { label: 'Important', value: 'important' },
      ],
      admin: { description: 'Sets the icon and accent colour.' },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional heading. Defaults to the variant name (Tip / Note / Important).',
      },
    },
    { name: 'body', type: 'textarea', required: true },
  ],
}
