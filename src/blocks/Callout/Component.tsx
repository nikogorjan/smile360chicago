import { AlertTriangle, Info, Lightbulb } from 'lucide-react'
import React from 'react'

import type { CalloutBlock as Props } from '@/payload-types'
import { cn } from '@/utilities/ui'

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    tile: 'bg-brand/10 text-brand',
    ring: 'border-brand/25',
    accent: 'text-brand',
  },
  note: {
    icon: Info,
    label: 'Note',
    tile: 'bg-muted text-foreground',
    ring: 'border-border',
    accent: 'text-foreground',
  },
  important: {
    icon: AlertTriangle,
    label: 'Important',
    tile: 'bg-emergency/10 text-emergency',
    ring: 'border-emergency/30',
    accent: 'text-emergency',
  },
} as const

// `not-prose` so the surrounding article typography doesn't restyle the card's own type.
export const CalloutBlock: React.FC<Props> = ({ variant, title, body }) => {
  const v = VARIANTS[(variant as keyof typeof VARIANTS) ?? 'tip'] ?? VARIANTS.tip
  const Icon = v.icon
  return (
    <div
      className={cn('not-prose my-8 flex gap-4 rounded-[8px] border bg-card p-5 sm:p-6', v.ring)}
    >
      <span className={cn('grid size-10 shrink-0 place-items-center rounded-sm', v.tile)}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className={cn('text-sm font-bold uppercase tracking-wider', v.accent)}>
          {title || v.label}
        </p>
        {body && <p className="mt-1.5 text-base leading-relaxed text-foreground">{body}</p>}
      </div>
    </div>
  )
}
