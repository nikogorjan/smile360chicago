import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { MediaBannerBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Eyebrow, Section, emphasize } from '@/components/site/primitives'
import { resolveHref } from '@/lib/nav'
import { stockPhotos } from '@/lib/stockImages'
import { cn } from '@/utilities/ui'

const overlayClass = {
  light: 'bg-black/40',
  medium: 'bg-black/50',
  dark: 'bg-black/60',
}

export const MediaBannerBlock: React.FC<Props> = ({
  image,
  eyebrow,
  heading,
  text,
  align,
  overlay,
  height,
  links,
}) => {
  const hasImage = image && typeof image !== 'string'
  const left = align === 'left'

  return (
    <Section>
      <div className="px-3 sm:px-5 lg:px-6">
        <div
          className={cn(
            'relative isolate mx-auto flex w-full max-w-[94rem] items-center overflow-hidden rounded-none',
            height === 'tall' ? 'min-h-[34rem] lg:min-h-[42rem]' : 'min-h-[26rem] lg:min-h-[34rem]',
          )}
        >
          {/* Background photograph */}
          {hasImage ? (
            <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0 -z-10" />
          ) : (
            <Image
              src={stockPhotos.officeBright}
              alt="Bright, modern Smile360 Chicago dental operatory filled with daylight"
              fill
              sizes="100vw"
              className="-z-10 object-cover"
            />
          )}
          <div className={cn('absolute inset-0 -z-10', overlayClass[overlay || 'medium'])} />

          <div className="w-full px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <div className={cn('max-w-2xl text-white', left ? '' : 'mx-auto text-center')}>
              {eyebrow && (
                <Eyebrow tone="dark" className={left ? '' : 'justify-center'}>
                  {eyebrow}
                </Eyebrow>
              )}
              <h2
                className={cn(
                  'text-pretty text-4xl leading-[1.03] tracking-normal text-white sm:text-5xl lg:text-[3.25rem]',
                  eyebrow ? 'mt-5' : '',
                )}
              >
                {emphasize(heading)}
              </h2>
              {text && (
                <p
                  className={cn(
                    'mt-5 text-base leading-relaxed text-white/85 sm:text-lg',
                    left ? '' : 'mx-auto max-w-xl',
                  )}
                >
                  {text}
                </p>
              )}
              {links && links.length > 0 && (
                <div className={cn('mt-9 flex flex-wrap items-center gap-3', left ? '' : 'justify-center')}>
                  {links.map((l, i) =>
                    l.link ? (
                      <Link
                        key={i}
                        href={resolveHref(l.link)}
                        target={l.link.newTab ? '_blank' : undefined}
                        rel={l.link.newTab ? 'noopener noreferrer' : undefined}
                        className={buttonVariants({
                          variant: i === 0 ? 'white' : 'outlineWhite',
                          size: 'lg',
                        })}
                      >
                        <ButtonLabel>{l.link.label}</ButtonLabel>
                      </Link>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
