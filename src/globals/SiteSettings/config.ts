import type { GlobalConfig } from 'payload'

/**
 * Site Settings — the proposal's CMS-editable "Site settings" section.
 * Single place for the practice's NAP, hours, social links, and the
 * promo / announcement banner. Mirrors src/lib/practice.ts (the frontend
 * currently reads the typed constants; wire these fields in to make them live).
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true },
  admin: { group: 'Configuration' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'logoLight',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo — light mode',
              admin: {
                description:
                  'Logo for light backgrounds (navbar in light mode). Transparent PNG recommended. Falls back to the bundled default if empty.',
              },
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo — dark mode',
              admin: {
                description:
                  'Logo for dark backgrounds (navbar in dark mode + the footer). Falls back to the light logo, then the bundled default.',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'practiceName', type: 'text', defaultValue: 'Smile360 Chicago' },
            { name: 'phone', type: 'text', label: 'Primary phone' },
            { name: 'emergencyPhone', type: 'text', label: 'Emergency phone' },
            { name: 'email', type: 'email' },
            {
              type: 'group',
              name: 'address',
              fields: [
                { name: 'street', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'city', type: 'text', admin: { width: '40%' } },
                    { name: 'state', type: 'text', admin: { width: '20%' } },
                    { name: 'zip', type: 'text', admin: { width: '40%' } },
                  ],
                },
              ],
            },
            { name: 'mapUrl', type: 'text', label: 'Google Maps link' },
          ],
        },
        {
          label: 'Hours',
          fields: [
            {
              name: 'hours',
              type: 'array',
              labels: { singular: 'Day', plural: 'Hours' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'day', type: 'text', admin: { width: '34%' } },
                    { name: 'open', type: 'text', admin: { width: '22%' } },
                    { name: 'close', type: 'text', admin: { width: '22%' } },
                    { name: 'closed', type: 'checkbox', admin: { width: '22%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Announcement',
          fields: [
            { name: 'announcementEnabled', type: 'checkbox', label: 'Show announcement bar', defaultValue: true },
            { name: 'announcementText', type: 'text', label: 'Announcement text' },
            { name: 'announcementLink', type: 'text', label: 'Announcement link (URL)' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'instagram', type: 'text' },
            { name: 'facebook', type: 'text' },
            { name: 'google', type: 'text', label: 'Google Business Profile' },
            { name: 'tiktok', type: 'text' },
          ],
        },
      ],
    },
  ],
}
