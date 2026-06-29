import Image from 'next/image'
import React from 'react'

import type { TeamGridBlock as Props } from '@/payload-types'
import { Section, SectionHeading } from '@/components/site/primitives'
import { getTeam } from '@/lib/queries'
import { getTeamPhoto } from '@/lib/stockImages'

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

  const tone = (background as 'default') || 'default'

  return (
    <Section tone={tone}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <article key={m.name} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src={getTeamPhoto(i)}
                  alt={`${m.name}, ${m.role} at Smile360 Chicago`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[m.role, m.credentials].filter(Boolean).join(' · ')}
                </p>

                {m.specialties.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {m.specialties.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
