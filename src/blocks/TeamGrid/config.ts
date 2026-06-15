import type { Block } from 'payload'

import { backgroundField, sectionHeaderFields } from '../_shared/fields'

export const TeamGrid: Block = {
  slug: 'teamGridBlock',
  interfaceName: 'TeamGridBlock',
  imageURL: '/block-previews/team.svg',
  imageAltText: 'Grid of team member cards',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    ...sectionHeaderFields,
    { name: 'limit', type: 'number', admin: { description: 'Max team members to show.' } },
    backgroundField,
  ],
}
