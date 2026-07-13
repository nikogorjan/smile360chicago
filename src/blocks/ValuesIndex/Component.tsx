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

      <ul className={cn('border-b', invert ? 'border-white/15' : 'border-border')}>
        {list.map((it, i) => (
          <li
            key={i}
            className={cn(
              'group grid grid-cols-[auto_1fr] items-center gap-5 rounded-md border-t px-2 py-7 transition-colors md:grid-cols-[auto_1fr_auto] md:gap-10 md:py-9',
              invert ? 'border-white/15 hover:bg-white/5' : 'border-border hover:bg-brand-soft',
            )}
          >
            <span
              className={cn(
                'font-display text-2xl tabular-nums md:text-3xl',
                invert ? 'text-white/50' : 'text-brand',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              {it.title && (
                <h3
                  className={cn(
                    'font-display text-2xl leading-tight md:text-3xl',
                    invert ? 'text-white' : 'text-foreground',
                  )}
                >
                  {it.title}
                </h3>
              )}
              {it.body && (
                <p className={cn('mt-1 text-sm md:text-base', invert ? 'text-white/70' : 'text-muted-foreground')}>
                  {it.body}
                </p>
              )}
            </div>
            {it.icon && (
              <span
                className={cn(
                  'hidden size-12 place-items-center rounded-full md:grid',
                  invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
                )}
              >
                <DynamicIcon name={it.icon} className="size-5" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
