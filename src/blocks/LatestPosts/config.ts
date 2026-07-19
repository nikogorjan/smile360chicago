import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { backgroundField, spacingFields } from '../_shared/fields'

export const LatestPosts: Block = {
  slug: 'latestPostsBlock',
  interfaceName: 'LatestPostsBlock',
  labels: { singular: 'Latest Posts', plural: 'Latest Posts' },
  imageURL: '/block-previews/reviews.svg',
  imageAltText: 'A row of the latest blog posts as image cards',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'From the blog' },
    { name: 'heading', type: 'text', defaultValue: 'Latest from our blog' },
    { name: 'description', type: 'textarea' },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description:
          'Hand-pick the posts to show (e.g. 2 related posts). Leave empty to auto-show the newest posts instead.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 2,
      min: 1,
      max: 4,
      admin: {
        description: 'When no posts are hand-picked above, how many of the newest posts to show (2 recommended).',
      },
    },
    linkGroup({
      appearances: false,
      overrides: { maxRows: 1, admin: { description: 'Optional “view all” link (e.g. /posts).' } },
    }),
    backgroundField,
    spacingFields,
  ],
}
