import React from 'react'

import { DynamicIcon } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

type Step = { icon?: string | null; title?: string | null; description?: string | null; id?: string | null }

const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-5',
}

/**
 * The first-visit steps as a grid of cobalt cards — matching the site's card language
 * (rounded-8px, rounded-sm icon chip) but in solid brand blue with white content, so the
 * section reads bold rather than bland. A large, faint step number keeps the sense of order.
 */
export const FirstVisitSteps: React.FC<{ steps: Step[]; invert: boolean }> = ({ steps }) => {
  const cols = COLS[steps.length] || 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <div className={cn('mt-12 grid gap-4', cols)}>
      {steps.map((s, i) => (
        <div
          key={s.id || i}
          className="flex flex-col rounded-[8px] bg-primary p-6 text-primary-foreground shadow-[0_20px_50px_-32px_rgb(0_72_180/0.6)]"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-white/10 text-white ring-1 ring-white/15">
              {s.icon ? (
                <DynamicIcon name={s.icon} className="size-5" />
              ) : (
                <span className="font-display text-lg font-bold leading-none">{i + 1}</span>
              )}
            </span>
            <span
              className="font-display text-3xl font-bold leading-none tabular-nums text-gold"
              aria-hidden
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-5 font-display text-lg font-bold leading-snug text-white">{s.title}</h3>

          {s.description && (
            <p className="mt-2 text-sm leading-relaxed text-white/75">{s.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
