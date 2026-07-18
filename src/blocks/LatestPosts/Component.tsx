import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { LatestPostsBlock as Props } from '@/payload-types'
import { Eyebrow, Section } from '@/components/site/primitives'
import { PostFeatureCard } from '@/components/site/PostFeatureCard'
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
          {posts.map((post) => (
            <PostFeatureCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Section>
  )
}
