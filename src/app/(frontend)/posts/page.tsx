import type { Metadata } from 'next/types'

import { Pagination } from '@/components/Pagination'
import { PageHero } from '@/components/sections/PageHero'
import { BlogCard } from '@/components/site/BlogCard'
import { Section } from '@/components/site/primitives'
import { BreadcrumbSchema } from '@/components/site/Schema'
import { practice } from '@/lib/practice'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <div>
      <PageClient />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Blog', url: '/posts' }]} />
      <PageHero
        eyebrow="Smile360 blog"
        title="Oral-health tips, news & guides"
        description="Expert, easy-to-read advice from our Chicago dental team — from emergency toothache relief to whitening, Invisalign, and keeping your whole family’s smiles healthy."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/posts' }]}
      />

      <Section>
        <div className="container">
          {posts.docs?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.docs.map((doc) => (
                <BlogCard key={doc.slug} doc={doc} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
          )}

          {posts.totalPages > 1 && posts.page && (
            <div className="mt-12">
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Dental Blog — Oral-Health Tips | ${practice.name}`,
    description:
      'Oral-health tips, emergency dental advice, whitening, Invisalign, and family dentistry guides from the Smile360 Chicago team.',
  }
}
