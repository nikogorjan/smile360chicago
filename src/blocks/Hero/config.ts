import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const Hero: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  imageURL: '/block-previews/hero.svg',
  imageAltText: 'Inset hero card with floating nav, headline bottom-left',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: { description: 'Choose what fills the hero card. Video falls back to the image.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background photo — used directly for Image, and as the poster/fallback for Video.',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background video (mp4/webm, muted autoplay loop). Shown when Media type is Video.',
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
    },
    { name: 'eyebrow', type: 'text', admin: { description: 'Small label pill above the headline.' } },
    {
      name: 'heading',
      type: 'richText',
      required: true,
      admin: { description: 'Headline. Rendered in the editorial display serif, in white.' },
    },
    { name: 'showRating', type: 'checkbox', defaultValue: true },
    { name: 'ratingText', type: 'text', admin: { description: 'e.g. "4.9 from 487+ Google reviews"' } },
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
    {
      name: 'card',
      type: 'group',
      label: 'Floating card (bottom-right)',
      admin: {
        description:
          'Optional small card overlapping the hero (hidden on mobile). Leave the title empty to show a compact rating stat card instead.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Show the floating card.' },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional thumbnail/poster. Shows a play button when set.' },
        },
        { name: 'title', type: 'text', admin: { description: 'e.g. "Your family\'s smile, in one place"' } },
        { name: 'text', type: 'text', admin: { description: 'One short supporting line.' } },
      ],
    },
  ],
}
