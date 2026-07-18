import React from 'react'

import type { ValuesIndexBlock as Props } from '@/payload-types'
import { DynamicIcon, Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { renderRichHeading } from '../_shared/richHeading'
import { cn } from '@/utilities/ui'

export const ValuesIndexBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  items,
  surface,
  paddingTop,
  paddingBottom,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const headingEl = renderRichHeading(heading, invert)
  const list = items || []

  return (
    <SectionShell surface={surface} paddingTop={paddingTop} paddingBottom={paddingBottom} bottomGap={bottomGap}>
      {(eyebrow || headingEl || description) && (
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            {eyebrow && (
              <Eyebrow tone={invert ? 'dark' : 'light'} className="mb-3">
                {eyebrow}
              </Eyebrow>
            )}
            {headingEl && (
              <h2
                className={cn(
                  'font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl',
                  invert ? 'text-white' : 'text-foreground',
                )}
              >
                {headingEl}
              </h2>
            )}
          </div>
          {description && (
            <p className={cn('max-w-sm text-base leading-relaxed', invert ? 'text-white/70' : 'text-muted-foreground')}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Each value is its own white card, floating on the canvas with a gap between.
          Hover brightens the border and fills the icon cobalt. */}
      <ul className="space-y-3 md:space-y-4">
        {list.map((it, i) => (
          <li
            key={i}
            className="group flex items-center gap-5 rounded-[8px] border border-border bg-card px-5 py-5 transition-colors hover:border-brand/40 md:gap-8 md:px-8 md:py-6"
          >
            <span className="font-display text-3xl tabular-nums text-brand md:text-4xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              {it.title && (
                <h3 className="font-display text-xl leading-tight text-foreground md:text-2xl">{it.title}</h3>
              )}
              {it.body && <p className="mt-1 text-sm text-muted-foreground md:text-base">{it.body}</p>}
            </div>
            {it.icon && (
              <span className="hidden size-11 shrink-0 place-items-center rounded-sm bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white sm:grid">
                <DynamicIcon name={it.icon} className="size-5" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
