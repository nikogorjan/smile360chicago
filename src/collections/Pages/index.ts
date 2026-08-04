import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Hero } from '../../blocks/Hero/config'
import { Stats } from '../../blocks/Stats/config'
import { ServicesBento } from '../../blocks/ServicesBento/config'
import { Pillars } from '../../blocks/Pillars/config'
import { ImageBand } from '../../blocks/ImageBand/config'
import { DentistFeature } from '../../blocks/DentistFeature/config'
import { Reviews } from '../../blocks/Reviews/config'
import { LatestPosts } from '../../blocks/LatestPosts/config'
import { Panel } from '../../blocks/Panel/config'
import { Emergency } from '../../blocks/Emergency/config'
import { Masthead } from '../../blocks/Masthead/config'
import { FounderLetter } from '../../blocks/FounderLetter/config'
import { ValuesIndex } from '../../blocks/ValuesIndex/config'
import { Manifesto } from '../../blocks/Manifesto/config'
import { Credentials } from '../../blocks/Credentials/config'
import { Technology } from '../../blocks/Technology/config'
import { Comparison } from '../../blocks/Comparison/config'
import { FirstVisit } from '../../blocks/FirstVisit/config'
import { NewPatientHero } from '../../blocks/NewPatientHero/config'
import { GetReady } from '../../blocks/GetReady/config'
import { OfferSpotlight } from '../../blocks/OfferSpotlight/config'
import { Faq } from '../../blocks/Faq/config'
import { Comfort } from '../../blocks/Comfort/config'
import { Appointment } from '../../blocks/Appointment/config'
import { MapBand } from '../../blocks/MapBand/config'
import { Timeline } from '../../blocks/Timeline/config'
import { Languages } from '../../blocks/Languages/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Hero,
                Masthead,
                FounderLetter,
                ValuesIndex,
                Manifesto,
                FirstVisit,
                NewPatientHero,
                OfferSpotlight,
                GetReady,
                Comfort,
                MapBand,
                ImageBand,
                Pillars,
                Stats,
                ServicesBento,
                Comparison,
                Credentials,
                Technology,
                Reviews,
                LatestPosts,
                DentistFeature,
                Timeline,
                Languages,
                Panel,
                Faq,
                Emergency,
                Appointment,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
