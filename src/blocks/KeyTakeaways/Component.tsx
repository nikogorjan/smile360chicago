import { Check } from 'lucide-react'
import React from 'react'

import type { KeyTakeawaysBlock as Props } from '@/payload-types'

export const KeyTakeawaysBlock: React.FC<Props> = ({ title, items }) => {
  const list = items || []
  if (!list.length) return null
  return (
    <div className="not-prose my-8 rounded-[8px] border border-border bg-card p-6 sm:p-7">
      <p className="text-sm font-bold uppercase tracking-wider text-brand">{title || 'In short'}</p>
      <ul className="mt-4 space-y-3">
        {list.map((it, i) => (
          <li key={it.id || i} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
              <Check className="size-3.5" />
            </span>
            <span className="text-base leading-relaxed text-foreground">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
