import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const MediaBanner: Block = {
  slug: 'mediaBannerBlock',
  interfaceName: 'MediaBannerBlock',
  labels: { singular: 'Media Banner', plural: 'Media Banners' },
  imageURL: '/block-previews/media-banner.svg',
  imageAltText: 'Full-width image background band with headline and buttons',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Background image. If empty, a brand gradient is used.' },
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    {
      type: 'row',
      fields: [
        {
          name: 'align',
          type: 'select',
          defaultValue: 'center',
          admin: { width: '33%' },
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Left', value: 'left' },
          ],
        },
        {
          name: 'overlay',
          type: 'select',
          defaultValue: 'medium',
          admin: { width: '33%' },
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Medium', value: 'medium' },
            { label: 'Dark', value: 'dark' },
          ],
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'standard',
          admin: { width: '34%' },
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Tall', value: 'tall' },
          ],
        },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
  ],
}
