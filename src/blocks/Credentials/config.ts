import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { headingEditor, spacingFields, surfaceFieldWith } from '../_shared/fields'

/**
 * Credentials / "in good hands" — a two-column trust section: a real credential photo
 * (e.g. the dentist receiving a certificate) beside the practitioner's qualifications,
 * certifications, memberships and experience as an icon checklist. CMS-driven.
 */
export const Credentials: Block = {
  slug: 'credentialsBlock',
  interfaceName: 'CredentialsBlock',
  labels: { singular: 'Credentials', plural: 'Credentials Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Credentials & training' },
    {
      name: 'heading',
      type: 'richText',
      editor: headingEditor,
      admin: { description: 'Select a phrase, then Style → Brand blue to accent it.' },
    },
    { name: 'lead', type: 'textarea', admin: { description: 'A sentence or two on training and commitment.' } },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Credential / certificate photo (e.g. Dr. Salam receiving the award).' },
    },
    { name: 'imageCaption', type: 'text', admin: { description: 'Optional caption shown under the photo.' } },
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image on left', value: 'left' },
        { label: 'Image on right', value: 'right' },
      ],
    },
    {
      name: 'credentials',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Credential', plural: 'Credentials' },
      admin: {
        initCollapsed: true,
        description: 'Qualifications, certifications, memberships, experience — shown as a checklist.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: {
                width: '30%',
                description: 'lucide icon (e.g. GraduationCap, Award, BadgeCheck, HeartPulse, Clock).',
              },
            },
            { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'description', type: 'text', admin: { description: 'Optional detail line.' } },
      ],
    },
    linkGroup({ appearances: false, overrides: { maxRows: 1, label: 'Button (optional)' } }),
    surfaceFieldWith('canvas'),
    spacingFields,
  ],
}
