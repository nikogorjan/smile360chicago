import type { Block } from 'payload'

export const InsuranceMarquee: Block = {
  slug: 'insuranceBlock',
  interfaceName: 'InsuranceBlock',
  imageURL: '/block-previews/insurance.svg',
  imageAltText: 'Scrolling row of accepted insurance plans',
  labels: { singular: 'Insurance Marquee', plural: 'Insurance Marquees' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'We accept most major PPO insurance plans',
    },
    {
      name: 'plans',
      type: 'array',
      labels: { singular: 'Plan', plural: 'Plans' },
      admin: { description: 'Leave empty to use the default plan list.' },
      fields: [{ name: 'name', type: 'text' }],
    },
  ],
}
