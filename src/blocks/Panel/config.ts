import type { Block } from 'payload'

import { Faq } from '../Faq/config'
import { Timeline } from '../Timeline/config'

/**
 * Panel — groups several sections inside ONE white rounded inset card that floats on the
 * page (Maven-style content zone). The nested sections render "bare" (no own background /
 * Section padding); the panel supplies the float inset, radius and centred container.
 */
export const Panel: Block = {
  slug: 'panelBlock',
  interfaceName: 'PanelBlock',
  labels: { singular: 'Panel (grouped sections)', plural: 'Panels' },
  imageURL: '/block-previews/feature-grid.svg',
  imageAltText: 'Several sections grouped in one white rounded inset panel',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      labels: { singular: 'Section', plural: 'Sections' },
      blocks: [Timeline, Faq],
      admin: {
        initCollapsed: true,
        description: 'Sections grouped inside one white rounded inset panel (e.g. roadmap + FAQ).',
      },
    },
  ],
}
