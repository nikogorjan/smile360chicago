import type { Block } from 'payload'

/** An "In short" summary card — checkmark bullets that recap a post at a glance. */
export const KeyTakeaways: Block = {
  slug: 'keyTakeawaysBlock',
  interfaceName: 'KeyTakeawaysBlock',
  labels: { singular: 'Key Takeaways', plural: 'Key Takeaways' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'In short' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Point', plural: 'Points' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
