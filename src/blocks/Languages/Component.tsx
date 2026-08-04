import { Languages as LanguagesIcon } from 'lucide-react'
import React from 'react'

import type { LanguagesBlock as Props } from '@/payload-types'
import { Eyebrow } from '@/components/site/primitives'
import { SectionShell, surfaceInvert } from '../_shared/surface'
import { cn } from '@/utilities/ui'

export const LanguagesBlock: React.FC<Props> = ({
  surface,
  eyebrow,
  heading,
  description,
  items,
  paddingTop,
  paddingBottom,
  topGap,
  bottomGap,
}) => {
  const invert = surfaceInvert(surface)
  const list = (items || []).filter((i) => i.language)

  return (
    <SectionShell
      surface={surface}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      topGap={topGap}
      bottomGap={bottomGap}
    >
      <div className="mx-auto max-w-2xl text-center">
        <span
          className={cn(
            'mx-auto grid size-12 place-items-center rounded-sm',
            invert ? 'bg-white/10 text-white' : 'bg-brand/10 text-brand',
          )}
        >
          <LanguagesIcon className="size-6" />
        </span>

        {eyebrow && (
          <div className="mt-5">
            <Eyebrow tone={invert ? 'dark' : 'light'}>{eyebrow}</Eyebrow>
          </div>
        )}

        {heading && (
          <h2
            className={cn(
              'mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl',
              invert ? 'text-white' : 'text-foreground',
            )}
          >
            {heading}
          </h2>
        )}

        {description && (
          <p
            className={cn(
              'mt-4 text-base leading-relaxed',
              invert ? 'text-white/80' : 'text-muted-foreground',
            )}
          >
            {description}
          </p>
        )}

        {list.length > 0 && (
          <ul className="mt-7 flex flex-wrap justify-center gap-3">
            {list.map((it, i) => (
              <li
                key={it.id || i}
                className={cn(
                  'rounded-full border px-5 py-2 text-base font-semibold',
                  invert
                    ? 'border-white/20 bg-white/5 text-white'
                    : 'border-border bg-card text-foreground',
                )}
              >
                {it.language}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionShell>
  )
}
