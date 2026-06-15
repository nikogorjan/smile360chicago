import React from 'react'

import type { BentoBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Section, SectionHeading } from '@/components/site/primitives'
import { cn } from '@/utilities/ui'

const sizeClass: Record<string, string> = {
  normal: 'col-span-1',
  wide: 'col-span-2',
  tall: 'col-span-1 lg:row-span-2',
  large: 'col-span-2 lg:row-span-2',
}

const toneClass: Record<string, string> = {
  card: 'bg-card border border-border text-foreground',
  brand: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  image: 'text-white',
}

export const BentoBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  description,
  align,
  tiles,
  background,
}) => {
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
        <div className="mt-12 grid auto-rows-[minmax(14rem,1fr)] grid-flow-dense grid-cols-2 gap-4 lg:grid-cols-4">
          {(tiles || []).map((t, i) => {
            const tone = t.tone || 'card'
            const hasImage = t.image && typeof t.image !== 'string'
            // any tile can carry a photo; on a photo the text sits over a fade
            const onDark = hasImage || tone === 'brand' || tone === 'accent' || tone === 'image'
            const muted = tone === 'card' && !hasImage
            return (
              <div
                key={i}
                className={cn(
                  'group relative flex flex-col justify-end overflow-hidden rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1',
                  sizeClass[t.size || 'normal'],
                  hasImage ? 'text-white' : toneClass[tone],
                )}
              >
                {/* background */}
                {hasImage ? (
                  <>
                    <Media
                      resource={t.image}
                      fill
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                      className="absolute inset-0 -z-10"
                    />
                    {/* fade so text stays readable */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  </>
                ) : (
                  tone !== 'card' && (
                    <>
                      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-[0.12]" />
                      <div className="absolute -right-10 -top-10 -z-10 size-40 rounded-full bg-white/10 blur-2xl" />
                    </>
                  )
                )}

                {/* top: icon or stat */}
                <div className="flex-1">
                  {t.icon && (
                    <span
                      className={cn(
                        'grid size-12 place-items-center rounded-2xl',
                        muted ? 'bg-brand/10 text-brand' : 'bg-white/15 text-current backdrop-blur-sm',
                      )}
                    >
                      <DynamicIcon name={t.icon} className="size-6" />
                    </span>
                  )}
                  {t.stat && (
                    <p className="text-5xl font-semibold tracking-tight lg:text-6xl">{t.stat}</p>
                  )}
                </div>

                {/* bottom: title + body */}
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  {t.body && (
                    <p
                      className={cn(
                        'mt-1.5 text-sm leading-relaxed',
                        muted ? 'text-muted-foreground' : onDark ? 'opacity-90' : 'opacity-85',
                      )}
                    >
                      {t.body}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
