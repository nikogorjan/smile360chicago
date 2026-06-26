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

      {/* Branded header */}
      <header className="relative overflow-hidden border-b border-border bg-brand-glow">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-25 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
        <div className="container relative py-14 lg:py-20">
          <nav className="mb-5 flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-brand">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/posts" className="hover:text-brand">
              Blog
            </Link>
          </nav>
          <div className="max-w-3xl">
            {category && <span className="eyebrow">{category}</span>}
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
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
