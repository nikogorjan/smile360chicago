import Image from 'next/image'
import React from 'react'

import type { BentoBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { DynamicIcon, Section, SectionHeading } from '@/components/site/primitives'
import { stockPhotos } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

const sizeClass: Record<string, string> = {
  normal: 'col-span-1',
  wide: 'col-span-2',
  tall: 'col-span-1 lg:row-span-2',
  large: 'col-span-2 lg:row-span-2',
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
    <Section tone={background}>
      <div className="container">
        {(eyebrow || heading || description) && (
          <SectionHeading
            align={align === 'left' ? 'left' : 'center'}
            eyebrow={eyebrow || undefined}
            title={heading || ''}
            description={description || undefined}
          />
        )}

        <div className="mt-14 grid auto-rows-[minmax(13rem,1fr)] grid-flow-dense grid-cols-2 gap-3 lg:grid-cols-4">
          {(tiles || []).map((t, i) => {
            const tone = t.tone || 'card'
            const hasImage = t.image && typeof t.image !== 'string'
            const isImage = tone === 'image'
            const isBrand = tone === 'brand'
            const isAccent = tone === 'accent'

            // FLAT surfaces only — no shadows. Cream for the accent tile (no light-blue).
            const surface = isImage
              ? 'text-white'
              : isBrand
                ? 'bg-primary text-primary-foreground'
                : isAccent
                  ? 'bg-cream text-foreground'
                  : 'bg-card text-foreground ring-1 ring-border transition-colors hover:ring-foreground/15'

            return (
              <div
                key={i}
                className={cn(
                  'group relative flex flex-col justify-end overflow-hidden rounded-3xl p-6',
                  sizeClass[t.size || 'normal'],
                  surface,
                )}
              >
                {isImage && (
                  <>
                    {hasImage ? (
                      <Media
                        resource={t.image}
                        fill
                        imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                        className="absolute inset-0 -z-10"
                      />
                    ) : (
                      <Image
                        src={stockPhotos.scanReview}
                        alt={t.title || 'Smile360 Chicago dental care'}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 -z-10 bg-black/55" />
                    {(t.stat || t.icon) && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-foreground">
                        {t.icon && <DynamicIcon name={t.icon} className="size-3.5" />}
                        {t.stat || 'Smile360'}
                      </span>
                    )}
                  </>
                )}

                {/* top: icon chip or big serif stat */}
                <div className="flex-1">
                  {!isImage && t.icon && (
                    <span
                      className={cn(
                        'grid size-11 place-items-center rounded-2xl',
                        isBrand ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand',
                      )}
                    >
                      <DynamicIcon name={t.icon} className="size-5" />
                    </span>
                  )}
                  {t.stat && !isImage && (
                    <p
                      className={cn(
                        'font-semibold text-5xl tracking-tight lg:text-6xl',
                        isBrand ? 'text-white' : 'text-foreground',
                      )}
                    >
                      {t.stat}
                    </p>
                  )}
                </div>

                {/* bottom: title + body */}
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  {t.body && (
                    <p
                      className={cn(
                        'mt-2 text-sm leading-relaxed',
                        isImage
                          ? 'text-white/90'
                          : isBrand
                            ? 'text-white/80'
                            : 'text-muted-foreground',
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
