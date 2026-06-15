import { Quote, Star } from 'lucide-react'
import React from 'react'

import type { QuoteBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'

export const QuoteBlock: React.FC<Props> = ({ quote, author, role, rating, image }) => {
  const hasImage = image && typeof image !== 'string'
  const stars = rating || 5

  return (
    <section className="relative isolate overflow-hidden">
      {hasImage ? (
        <>
          <Media resource={image} fill imgClassName="object-cover" className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-black/65" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand via-brand to-accent" />
      )}
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-10" />

      <div className="container py-20 text-center text-white lg:py-28">
        <Quote className="mx-auto size-12 opacity-40" />
        <div className="mx-auto mt-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < stars ? 'size-5 fill-gold text-gold' : 'size-5 text-white/30'}
            />
          ))}
        </div>
        <blockquote className="mx-auto mt-6 max-w-4xl text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
          “{quote}”
        </blockquote>
        {(author || role) && (
          <p className="mt-8 text-base">
            {author && <span className="font-bold">{author}</span>}
            {author && role && <span className="opacity-70"> — </span>}
            {role && <span className="opacity-80">{role}</span>}
          </p>
        )}
      </div>
    </section>
  )
}
