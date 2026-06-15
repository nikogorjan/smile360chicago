import { ArrowRight, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import { cn } from '@/utilities/ui'

export type BlogCardData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'
>

/** Deterministic on-brand gradient per category, used when a post has no image. */
const gradientFor = (name?: string) => {
  const map: Record<string, string> = {
    'Emergency Care': 'from-emergency/80 via-emergency to-accent/70',
    'Preventive Care': 'from-brand/80 via-brand to-success/60',
    'Cosmetic Dentistry': 'from-accent/70 via-brand to-brand/80',
    Orthodontics: 'from-brand/70 via-brand to-chart-5/70',
    'Patient Tips': 'from-brand/80 via-brand to-accent/60',
  }
  return map[name || ''] || 'from-brand via-brand to-accent/70'
}

export const BlogCard: React.FC<{ doc: BlogCardData; className?: string }> = ({
  doc,
  className,
}) => {
  const { slug, categories, meta, title, publishedAt } = doc
  const href = `/posts/${slug}`
  const image = meta?.image
  const category =
    categories && categories.length && typeof categories[0] === 'object'
      ? categories[0].title
      : undefined

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        {image && typeof image !== 'string' ? (
          <Media resource={image} size="33vw" imgClassName="object-cover size-full" fill />
        ) : (
          <div
            className={cn(
              'flex size-full items-center justify-center bg-gradient-to-br',
              gradientFor(category),
            )}
          >
            <svg viewBox="0 0 24 24" className="size-16 text-white/25" fill="currentColor" aria-hidden>
              <path d="M12 4.2c-1.6-1.1-3-1.5-4.3-1.2C5.4 3.6 4 5.7 4 8.4c0 2 .5 3.6 1 5.3.5 1.7.7 3.4 1 4.8.3 1.4.8 2.3 1.6 2.3.9 0 1.1-1 1.4-2.4.2-1.1.4-2.2 1-2.2s.8 1.1 1 2.2c.3 1.4.5 2.4 1.4 2.4.8 0 1.3-.9 1.6-2.3.3-1.4.5-3.1 1-4.8.5-1.7 1-3.3 1-5.3 0-2.7-1.4-4.8-3.7-5.4C15 2.7 13.6 3.1 12 4.2Z" />
            </svg>
          </div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-brand backdrop-blur">
            {category}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {publishedAt && (
          <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formatDateTime(publishedAt)}
          </p>
        )}
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          <Link href={href} className="transition-colors hover:text-brand">
            {title}
          </Link>
        </h3>
        {meta?.description && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {meta.description}
          </p>
        )}
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand"
        >
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
