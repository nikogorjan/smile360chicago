import React from 'react'

import { stats as fallback, type Stat } from '@/lib/practice'

export const Stats: React.FC<{ items?: Stat[] }> = ({ items }) => {
  const stats = items?.length ? items : fallback
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
