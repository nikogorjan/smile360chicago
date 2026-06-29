import React from 'react'

import type { PanelBlock as Props } from '@/payload-types'
import { FaqBlock } from '../Faq/Component'
import { TimelineBlock } from '../Timeline/Component'

/** Nested blocks that can render "bare" inside the panel. */
const bareComponents = {
  timelineBlock: TimelineBlock,
  faqBlock: FaqBlock,
} as const

/**
 * One white rounded inset card grouping several "bare" sections (e.g. the roadmap + FAQ),
 * floating on the page with the same horizontal inset (px-3/px-4) and 8px radius as the
 * ServicesBento / footer panels. Content sits in the standard 1600px container; nested
 * sections stack with comfortable spacing. Vertical float gaps come from the neighbouring
 * sections, so it lines up with the other floating panels.
 */
export const PanelBlock: React.FC<Props> = ({ blocks }) => {
  const list = (blocks || []).filter(
    (b) => (b?.blockType as string) in bareComponents,
  )
  if (!list.length) return null

  return (
    <section className="px-3 sm:px-4">
      <div className="rounded-[8px] bg-card py-16 md:py-24">
        <div className="container">
          {list.map((b, i) => {
            const C = bareComponents[b.blockType as keyof typeof bareComponents]
            return (
              <div key={b.id || i} className={i > 0 ? 'mt-20 md:mt-28' : ''}>
                {/* @ts-expect-error bare-mode block props are a union resolved at runtime */}
                <C {...b} bare />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
