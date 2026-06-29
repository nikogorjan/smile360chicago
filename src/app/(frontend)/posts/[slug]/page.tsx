import type { Metadata } from 'next'

import { CalendarCheck, CalendarDays, ChevronRight, Phone, UserRound } from 'lucide-react'
import Link from 'next/link'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { buttonVariants } from '@/components/ui/button'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { getSiteData } from '@/lib/getSiteSettings'
import { Media } from '@/components/Media'
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
              <Media resource={heroImg} fill imgClassName="object-cover" size="100vw" priority />
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

      {/* Content */}
      <div className="container py-12 lg:py-16">
        <RichText
          className="prose prose-slate mx-auto max-w-[44rem] dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand"
          data={post.content}
          enableGutter={false}
        />

        {/* CTA band */}
        <div className="mx-auto mt-12 max-w-[44rem]">
          <div className="overflow-hidden rounded-2xl border border-border bg-primary p-7 text-primary-foreground sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              In pain or due for a visit?
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Same-day emergency appointments and new patients welcome at {site.practiceName}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-[44rem]">
            <RelatedPosts
              className=""
              docs={post.relatedPosts.filter((p) => typeof p === 'object')}
            />
          </div>
        )}
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
