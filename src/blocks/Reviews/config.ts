import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields, spacingFields } from '../_shared/fields'

export const Reviews: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  imageURL: '/block-previews/reviews.webp',
  imageAltText: 'Carousel of patient review cards',
  labels: { singular: 'Reviews', plural: 'Reviews' },
  fields: [
    ...sectionHeaderFields,
    { name: 'limit', type: 'number', admin: { description: 'Max reviews to show.' } },
    {
      name: 'hideTestimonials',
      type: 'checkbox',
      defaultValue: false,
      label: 'Hide the review cards',
      admin: {
        description:
          'Hides the “Real patient stories” heading and review cards — e.g. until real Google reviews are ready. The featured video (if set) still shows.',
      },
    },
    {
      type: 'collapsible',
      label: 'Featured video (optional)',
      admin: {
        initCollapsed: true,
        description:
          'A TikTok video shown above the reviews, with text beside it. Leave the URL empty to hide the whole row.',
      },
      fields: [
        {
          name: 'videoUrl',
          type: 'text',
          label: 'TikTok video URL',
          admin: {
            description: 'Paste the full link, e.g. https://www.tiktok.com/@user/video/1234567890',
          },
        },
        {
          name: 'videoEyebrow',
          type: 'text',
          label: 'Eyebrow',
          admin: { description: 'Small label above the heading.' },
        },
        { name: 'videoHeading', type: 'text', label: 'Heading' },
        { name: 'videoDescription', type: 'textarea', label: 'Description (under the heading)' },
        {
          name: 'videoText',
          type: 'textarea',
          label: 'Quote',
          admin: {
            description:
              'A line the person says in the video — shown large beside it, as a pull-quote.',
          },
        },
      ],
    },
    backgroundField,
    spacingFields,
  ],
}
