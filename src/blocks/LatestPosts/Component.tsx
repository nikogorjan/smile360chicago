import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { LatestPostsBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Eyebrow, Section } from '@/components/site/primitives'
import { resolveHref } from '@/lib/nav'
import { getLatestPosts } from '@/lib/queries'

/**
 * Latest blog posts as square image cards. Each card shows the post image full-colour
 * with a dark gradient at the bottom carrying the post title (serif) and a 2-line-clamped
 * description. Sits in the standard 1600px container with a left header + optional
 * "view all" link, mirroring the Reviews section above it. CMS-driven.
 */
export const LatestPostsBlock: React.FC<Props> = async ({
  eyebrow,
  heading,
  description,
  limit,
  links,
  background,
  paddingTop,
  paddingBottom,
}) => {
  const posts = await getLatestPosts(limit || 2)
  if (!posts.length) return null

  const cta = links?.[0]?.link

  return (
    <Section tone={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {heading && (
              <h2 className="mt-4 text-4xl leading-[1.03] tracking-normal text-foreground sm:text-5xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {cta && (
            <Link
              href={resolveHref(cta)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
            >
              {cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            </Link>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((post) => {
            const image =
              post.heroImage && typeof post.heroImage !== 'string'
                ? post.heroImage
                : post.meta?.image
            const hasImage = image && typeof image !== 'string'
            const category =
              Array.isArray(post.categories) &&
              post.categories.length &&
              typeof post.categories[0] === 'object'
                ? (post.categories[0] as { title?: string }).title
                : undefined

            return (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-[8px] border border-border bg-muted"
              >
                {hasImage ? (
                  <Media
                    resource={image}
                    fill
                    imgClassName="object-cover size-full transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    size="(min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-brand via-brand to-brand-2/70"
                  />
                )}

                {/* dark gradient anchoring the text at the bottom */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
                />

                {/* Unified arrow chip (top-right) — arrow-swap on hover, like ServicesBento */}
                <span
                  aria-hidden
                  className="absolute right-5 top-5 z-10 grid size-9 place-items-center overflow-hidden rounded-full bg-card/95 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white motion-reduce:transition-none"
                >
                  <ArrowUpRight className="size-[1.1rem] [grid-area:1/1] transition-transform duration-300 ease-out group-hover:-translate-y-[150%] group-hover:translate-x-[150%] motion-reduce:transition-none" />
                  <ArrowUpRight className="size-[1.1rem] -translate-x-[150%] translate-y-[150%] [grid-area:1/1] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  {category && (
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                      {category}
                    </span>
                  )}
                  <h3 className="mt-2 text-pretty font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                    {post.title}
                  </h3>
                  {post.meta?.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
                      {post.meta.description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
