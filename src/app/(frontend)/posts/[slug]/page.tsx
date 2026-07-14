import type { Metadata } from 'next'

import { CalendarCheck, CalendarDays, ChevronRight, Phone, UserRound } from 'lucide-react'
import Link from 'next/link'
import type { Post } from '@/payload-types'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { buttonVariants } from '@/components/ui/button'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { getSiteData } from '@/lib/getSiteSettings'
import { Media } from '@/components/Media'
import { ScrollParallax } from '@/components/site/ScrollParallax'
import { Eyebrow } from '@/components/site/primitives'
import { formatDateTime } from '@/utilities/formatDateTime'
import { formatAuthors } from '@/utilities/formatAuthors'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = { params: Promise<{ slug?: string }> }

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const site = await getSiteData()
  // Featured image: prefer the post's heroImage, fall back to the SEO meta image.
  const heroImg =
    post.heroImage && typeof post.heroImage !== 'string'
      ? post.heroImage
      : post.meta?.image && typeof post.meta.image !== 'string'
        ? post.meta.image
        : null
  const category =
    post.categories && post.categories.length && typeof post.categories[0] === 'object'
      ? post.categories[0].title
      : undefined
  const hasAuthors =
    post.populatedAuthors &&
    post.populatedAuthors.length > 0 &&
    formatAuthors(post.populatedAuthors) !== ''
  const relatedList = ((post.relatedPosts || []).filter(
    (p) => p && typeof p === 'object',
  ) as Post[]).slice(0, 4)
  // Fall back to the latest posts so the sidebar is never empty.
  let sidebarPosts: Post[] = relatedList
  if (sidebarPosts.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const recent = await payload.find({
      collection: 'posts',
      draft: false,
      depth: 2,
      limit: 4,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      where: { slug: { not_equals: decodedSlug } },
    })
    sidebarPosts = recent.docs as Post[]
  }
  const hasSidebar = sidebarPosts.length > 0

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {heroImg ? (
        /* Hero header — full image with the title + meta overlaid, like the home hero
           (dark scrim, no blue tint). Floating rounded panel matching the hero. */
        <header className="relative">
          <div className="p-3 sm:p-4">
            <div className="relative h-[58vh] min-h-[460px] max-h-[660px] overflow-hidden rounded-[8px] bg-muted">
              <ScrollParallax className="absolute inset-0" amount={0.05}>
                <Media resource={heroImg} fill imgClassName="object-cover" size="100vw" priority />
              </ScrollParallax>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 via-30% to-transparent" />
            </div>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col justify-end pb-10 sm:pb-12 lg:pb-16">
            <div className="container">
              <div className="max-w-3xl text-white">
                <nav className="mb-5 flex items-center gap-1 text-xs text-white/70">
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="size-3" />
                  <Link href="/posts" className="transition-colors hover:text-white">
                    Blog
                  </Link>
                </nav>
                {category && <Eyebrow tone="dark">{category}</Eyebrow>}
                <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                  {hasAuthors && (
                    <span className="inline-flex items-center gap-1.5">
                      <UserRound className="size-4" />
                      {formatAuthors(post.populatedAuthors!)}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4" />
                      <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        /* Text header for posts without an image — open on the page canvas, left-aligned */
        <header className="border-b border-border/60">
          <div className="container py-14 lg:py-20">
            <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-brand">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <Link href="/posts" className="transition-colors hover:text-brand">
                Blog
              </Link>
            </nav>
            <div className="max-w-3xl">
              {category && <Eyebrow>{category}</Eyebrow>}
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {hasAuthors && (
                  <span className="inline-flex items-center gap-1.5">
                    <UserRound className="size-4 text-brand" />
                    {formatAuthors(post.populatedAuthors!)}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-brand" />
                    <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Content — the article on the left (wide), related posts on the right */}
      <div className="container py-12 lg:py-16">
        <div
          className={
            hasSidebar
              ? 'grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-x-16'
              : 'mx-auto max-w-[46rem]'
          }
        >
          {/* Article */}
          <div className="min-w-0">
            <RichText
              className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand"
              data={post.content}
              enableGutter={false}
            />

            {/* CTA — cobalt card with a soft cobalt/gold glow */}
            <div className="relative mt-14 overflow-hidden rounded-[8px] bg-primary p-8 text-primary-foreground sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-gold/15 blur-3xl"
              />
              <div className="relative">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white">
                  <CalendarCheck className="size-5" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
                  In pain or due for a visit?
                </h2>
                <p className="mt-2 max-w-lg leading-relaxed text-primary-foreground/80">
                  Same-day emergency appointments and new patients welcome at {site.practiceName}.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: 'white', className: 'font-bold' })}
                  >
                    <CalendarCheck className="size-4" />
                    Book Appointment
                  </Link>
                  <Link
                    href={site.phoneHref}
                    className={buttonVariants({ variant: 'outlineWhite', className: 'font-bold' })}
                  >
                    <Phone className="size-4" />
                    {site.phone}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — related (or latest) posts */}
          {hasSidebar && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                Keep reading
              </h2>
              <ul className="mt-6 space-y-8">
                {sidebarPosts.map((p) => {
                  const thumb =
                    p.heroImage && typeof p.heroImage !== 'string'
                      ? p.heroImage
                      : p.meta?.image && typeof p.meta.image !== 'string'
                        ? p.meta.image
                        : null
                  const cat =
                    p.categories &&
                    p.categories.length &&
                    typeof p.categories[0] === 'object'
                      ? p.categories[0].title
                      : undefined
                  return (
                    <li key={p.id}>
                      <Link href={`/posts/${p.slug}`} className="group block">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] border border-border bg-muted">
                          {thumb && (
                            <Media
                              resource={thumb}
                              fill
                              imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="mt-3.5">
                          {cat && (
                            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand">
                              {cat}
                            </span>
                          )}
                          <h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                            {p.title}
                          </h3>
                          {p.publishedAt && (
                            <time
                              dateTime={p.publishedAt}
                              className="mt-2 block text-xs text-muted-foreground"
                            >
                              {formatDateTime(p.publishedAt)}
                            </time>
                          )}
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
