import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * A warm closing invitation — a friendly headline, an editorial details list
 * (address / hours / phone) and CTAs beside a rounded photo of the entrance or a
 * map. A personal close, not the generic Final CTA. Defaults to the white panel.
 */
export const Invitation: Block = {
  slug: 'invitationBlock',
  interfaceName: 'InvitationBlock',
  imageAltText: 'A warm closing invitation with practice details',
  labels: { singular: 'Invitation', plural: 'Invitations' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      required: true,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it in cobalt.' },
    },
    { name: 'body', type: 'textarea' },
    {
      name: 'details',
      type: 'array',
      labels: { singular: 'Detail', plural: 'Details' },
      maxRows: 4,
      admin: { description: 'Address / hours / phone, shown as an editorial list.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'text', admin: { width: '25%', description: 'lucide icon (MapPin, Clock, Phone).' } },
            { name: 'label', type: 'text', admin: { width: '30%' } },
            { name: 'value', type: 'text', required: true, admin: { width: '45%' } },
          ],
        },
      ],
    },
    {
      name: 'mapAddress',
      type: 'text',
      admin: {
        description:
          'Enter an address to show a live Google map (e.g. 360 N Michigan Ave, Suite 1200, Chicago, IL 60601). Takes priority over the image.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Fallback photo (e.g. the entrance) — shown only when no map address is set.' },
    },
    linkGroup({ appearances: false, overrides: { maxRows: 2 } }),
    surfaceFieldWith('panel'),
    spacingFields,
  ],
}
