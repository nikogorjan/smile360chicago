import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

import { HeroBlock } from '@/blocks/Hero/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { ServicesGridBlock } from '@/blocks/ServicesGrid/Component'
import { ServicesListBlock } from '@/blocks/ServicesList/Component'
import { ServicesBentoBlock } from '@/blocks/ServicesBento/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { BeforeAfterBlock } from '@/blocks/BeforeAfter/Component'
import { GalleryGridBlock } from '@/blocks/GalleryGrid/Component'
import { GalleryPreviewBlock } from '@/blocks/GalleryPreview/Component'
import { ReviewsBlock } from '@/blocks/Reviews/Component'
import { LatestPostsBlock } from '@/blocks/LatestPosts/Component'
import { TeamGridBlock } from '@/blocks/TeamGrid/Component'
import { DentistFeatureBlock } from '@/blocks/DentistFeature/Component'
import { ImageBandBlock } from '@/blocks/ImageBand/Component'
import { ProcessBlock } from '@/blocks/ProcessSteps/Component'
import { FaqBlock } from '@/blocks/Faq/Component'
import { EmergencyBlock } from '@/blocks/Emergency/Component'
import { FinalCtaBlock } from '@/blocks/FinalCta/Component'
import { PageHeroBlock } from '@/blocks/PageHero/Component'
import { InsuranceBlock } from '@/blocks/InsuranceMarquee/Component'
import { AppointmentBlock } from '@/blocks/Appointment/Component'
import { MediaBannerBlock } from '@/blocks/MediaBanner/Component'
import { SplitFeatureBlock } from '@/blocks/SplitFeature/Component'
import { BentoBlock } from '@/blocks/Bento/Component'
import { QuoteBlock } from '@/blocks/QuoteSpotlight/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { PanelBlock } from '@/blocks/Panel/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { PillarsBlock } from '@/blocks/Pillars/Component'

const blockComponents = {
  // Custom dental blocks (self-spacing, rendered flush)
  heroBlock: HeroBlock,
  pageHeroBlock: PageHeroBlock,
  mediaBannerBlock: MediaBannerBlock,
  imageBandBlock: ImageBandBlock,
  splitFeatureBlock: SplitFeatureBlock,
  bentoBlock: BentoBlock,
  tabsBlock: TabsBlock,
  pillarsBlock: PillarsBlock,
  statsBlock: StatsBlock,
  insuranceBlock: InsuranceBlock,
  servicesGridBlock: ServicesGridBlock,
  servicesListBlock: ServicesListBlock,
  servicesBentoBlock: ServicesBentoBlock,
  featureGridBlock: FeatureGridBlock,
  beforeAfterBlock: BeforeAfterBlock,
  galleryGridBlock: GalleryGridBlock,
  galleryPreviewBlock: GalleryPreviewBlock,
  reviewsBlock: ReviewsBlock,
  latestPostsBlock: LatestPostsBlock,
  quoteBlock: QuoteBlock,
  teamGridBlock: TeamGridBlock,
  dentistFeatureBlock: DentistFeatureBlock,
  processBlock: ProcessBlock,
  timelineBlock: TimelineBlock,
  panelBlock: PanelBlock,
  faqBlock: FaqBlock,
  emergencyBlock: EmergencyBlock,
  finalCtaBlock: FinalCtaBlock,
  appointmentBlock: AppointmentBlock,
  // Template blocks (need outer margin)
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

/** Template blocks that need the my-16 spacing wrapper; custom blocks self-space. */
const spacedBlocks = new Set(['archive', 'content', 'cta', 'formBlock', 'mediaBlock'])

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
            if (spacedBlocks.has(blockType)) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
            return (
              // @ts-expect-error block props are a union resolved at runtime
              <Block {...block} key={index} />
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}
