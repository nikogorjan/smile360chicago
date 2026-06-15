import Link from 'next/link'
import React from 'react'

import type { MediaBannerBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { resolveHref } from '@/lib/nav'
import { cn } from '@/utilities/ui'

const overlayClass = {
  light: 'bg-black/25',
  medium: 'bg-black/45',
  dark: 'bg-black/65',
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
    <section
      className={cn(
        'relative isolate flex items-center overflow-hidden',
        height === 'tall' ? 'min-h-[34rem] lg:min-h-[40rem]' : 'min-h-[24rem] lg:min-h-[30rem]',
      )}
    >
      {/* background */}
      {hasImage ? (
        <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0 -z-10" />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand via-brand to-accent" />
      )}
      <div className={cn('absolute inset-0 -z-10', overlayClass[overlay || 'medium'])} />
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-10" />

      <div className="container relative py-16 lg:py-24">
        <div className={cn('max-w-2xl text-white', left ? '' : 'mx-auto text-center')}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] backdrop-blur">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {text && <p className="mt-4 text-lg text-white/85">{text}</p>}
          {links && links.length > 0 && (
            <div className={cn('mt-8 flex flex-wrap gap-3', left ? '' : 'justify-center')}>
              {links.map((l, i) =>
                l.link ? (
                  <Link
                    key={i}
                    href={resolveHref(l.link)}
                    className={
                      i === 0
                        ? 'inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-brand shadow-lg transition-transform hover:-translate-y-0.5'
                        : 'inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10'
                    }
                  >
                    {l.link.label}
                  </Link>
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
