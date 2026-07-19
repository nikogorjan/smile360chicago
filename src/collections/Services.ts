import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { slugField } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'from'], group: 'Content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Preventive', 'Cosmetic', 'Restorative', 'Orthodontics', 'Emergency'],
    },
    { name: 'icon', type: 'text', admin: { description: 'lucide-react icon name, e.g. "Sparkles"' } },
    { name: 'excerpt', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Main service photo — shown on the Services bento/cards and as the header image on the service page. Falls back to a stock photo if left empty.',
      },
    },
    { name: 'from', type: 'text', label: 'Starting price (e.g. "$99")' },
    { name: 'featured', type: 'checkbox' },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
        ],
      }),
      admin: {
        description: 'Full service write-up — supports headings, media, and blocks, like the blog.',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        description:
          'Pick 2 blog posts to show as “Keep reading” at the bottom of this service page (same cards as the blog). Leave empty to fall back to the latest posts.',
      },
    },
    slugField({ useAsSlug: 'name' }),
  ],
}
