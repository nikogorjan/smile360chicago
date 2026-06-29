import type { Block } from 'payload'

export const ImageBand: Block = {
  slug: 'imageBandBlock',
  interfaceName: 'ImageBandBlock',
  labels: { singular: 'Image Band', plural: 'Image Bands' },
  imageURL: '/block-previews/media-banner.svg',
  imageAltText: 'Full-width edge-to-edge photo band',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Full-bleed photo (e.g. the practice building / exterior). A stock photo is used if left empty.',
      },
    },
    { name: 'alt', type: 'text', admin: { description: 'Alt text for accessibility.' } },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional small caption shown in the corner of the image.' },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full (tall)', value: 'full' },
      ],
    },
    {
      name: 'overlayText',
      type: 'group',
      admin: {
        description:
          'Optional text shown over the image with a subtle dark scrim. Leave both empty for just the photo.',
      },
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
      ],
    },
  ],
}
