import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { ServicesBentoBlock } from '@/blocks/ServicesBento/Component'
import { ComparisonBlock } from '@/blocks/Comparison/Component'
import { CredentialsBlock } from '@/blocks/Credentials/Component'
import { TechnologyBlock } from '@/blocks/Technology/Component'
import { ReviewsBlock } from '@/blocks/Reviews/Component'
import { LatestPostsBlock } from '@/blocks/LatestPosts/Component'
import { DentistFeatureBlock } from '@/blocks/DentistFeature/Component'
import { ImageBandBlock } from '@/blocks/ImageBand/Component'
import { FaqBlock } from '@/blocks/Faq/Component'
import { EmergencyBlock } from '@/blocks/Emergency/Component'
import { AppointmentBlock } from '@/blocks/Appointment/Component'
import { PillarsBlock } from '@/blocks/Pillars/Component'
import { MastheadBlock } from '@/blocks/Masthead/Component'
import { FounderLetterBlock } from '@/blocks/FounderLetter/Component'
import { ValuesIndexBlock } from '@/blocks/ValuesIndex/Component'
import { ManifestoBlock } from '@/blocks/Manifesto/Component'
import { FirstVisitBlock } from '@/blocks/FirstVisit/Component'
import { NewPatientHeroBlock } from '@/blocks/NewPatientHero/Component'
import { OfferSpotlightBlock } from '@/blocks/OfferSpotlight/Component'
import { GetReadyBlock } from '@/blocks/GetReady/Component'
import { ComfortBlock } from '@/blocks/Comfort/Component'
import { MapBandBlock } from '@/blocks/MapBand/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { PanelBlock } from '@/blocks/Panel/Component'
import { LanguagesBlock } from '@/blocks/Languages/Component'

const blockComponents = {
  heroBlock: HeroBlock,
  statsBlock: StatsBlock,
  servicesBentoBlock: ServicesBentoBlock,
  pillarsBlock: PillarsBlock,
  imageBandBlock: ImageBandBlock,
  dentistFeatureBlock: DentistFeatureBlock,
  reviewsBlock: ReviewsBlock,
  latestPostsBlock: LatestPostsBlock,
  panelBlock: PanelBlock,
  emergencyBlock: EmergencyBlock,
  mastheadBlock: MastheadBlock,
  founderLetterBlock: FounderLetterBlock,
  valuesIndexBlock: ValuesIndexBlock,
  manifestoBlock: ManifestoBlock,
  credentialsBlock: CredentialsBlock,
  technologyBlock: TechnologyBlock,
  comparisonBlock: ComparisonBlock,
  firstVisitBlock: FirstVisitBlock,
  newPatientHeroBlock: NewPatientHeroBlock,
  getReadyBlock: GetReadyBlock,
  offerSpotlightBlock: OfferSpotlightBlock,
  faqBlock: FaqBlock,
  comfortBlock: ComfortBlock,
  appointmentBlock: AppointmentBlock,
  mapBandBlock: MapBandBlock,
  timelineBlock: TimelineBlock,
  languagesBlock: LanguagesBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            // `display: contents` — the wrapper generates no box, so layout is identical to
            // rendering the block bare. It exists only to label where each block starts and
            // ends in the DOM (used by scripts/shoot-block-previews.mts, and handy when
            // tracking down "this section looks wrong" reports in the browser).
            return (
              <div key={index} data-block={blockType} className="contents">
                {/* @ts-expect-error block props are a union resolved at runtime */}
                <Block {...block} />
              </div>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}
