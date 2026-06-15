import React from 'react'

import type { StatsBlock as Props } from '@/payload-types'
import { Stats } from '@/components/sections/Stats'

export const StatsBlock: React.FC<Props> = ({ items }) => {
  const mapped = (items || []).map((i) => ({ value: i.value, label: i.label }))
  return <Stats items={mapped.length ? mapped : undefined} />
}
