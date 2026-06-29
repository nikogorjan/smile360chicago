import type { Block } from 'payload'

export const FinalCta: Block = {
  slug: 'finalCtaBlock',
  interfaceName: 'FinalCtaBlock',
  imageURL: '/block-previews/final-cta.svg',
  imageAltText: 'Closing call-to-action band with map',
  labels: { singular: 'Final CTA + Map', plural: 'Final CTAs' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Let’s get started' },
    { name: 'heading', type: 'text', defaultValue: 'Book your visit today' },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'New patients welcome. Most insurance accepted. Same-day emergency appointments available — we can’t wait to meet you.',
    },
    { name: 'primaryLabel', type: 'text', defaultValue: 'Book Appointment' },
    { name: 'primaryHref', type: 'text', defaultValue: '/contact' },
    { name: 'showMap', type: 'checkbox', defaultValue: true },
  ],
}
