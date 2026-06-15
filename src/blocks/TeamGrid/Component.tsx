import React from 'react'

import type { TeamGridBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { TeamCard } from '@/components/site/cards'
import { getTeam } from '@/lib/queries'

export const TeamGridBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  align,
  limit,
  background,
}) => {
  let team = await getTeam()
  if (limit) team = team.slice(0, limit)

  return (
    <Section tone={(background as 'default') || 'default'}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <TeamCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </Section>
  )
}
