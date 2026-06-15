import type { Metadata } from 'next'
import { CalendarCheck, CheckCircle2, Phone } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { PageHero } from '@/components/sections/PageHero'
import { Faq } from '@/components/sections/Faq'
import { Section, SectionHeading, DynamicIcon } from '@/components/site/primitives'
import { ServiceCard, ReviewCard } from '@/components/site/cards'
import { BreadcrumbSchema, ServiceSchema } from '@/components/site/Schema'
import { getSiteData } from '@/lib/getSiteSettings'
import { getServices, getFaqs, getTestimonials } from '@/lib/queries'
import { practice } from '@/lib/practice'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const services = await getServices()
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  const title = `${service.name} in Chicago | ${practice.name}`
  return {
    title,
    description: service.excerpt,
    alternates: { canonical: `${practice.url}/services/${slug}` },
    openGraph: { title, description: service.excerpt, url: `${practice.url}/services/${slug}` },
  }
}

export default async function ServiceDetailPage({ params }: Args) {
  const { slug } = await params
  const [services, faqItems, reviews, site] = await Promise.all([
    getServices(),
    getFaqs(),
    getTestimonials(),
    getSiteData(),
  ])
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const related = services.filter((s) => s.slug !== slug && s.category === service.category).slice(0, 3)
  const relatedList = related.length
    ? related
    : services.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <ServiceSchema name={service.name} description={service.excerpt} slug={service.slug} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.name, url: `/services/${service.slug}` },
        ]}
      />
      <PageHero
        eyebrow={service.category}
        title={service.name}
        description={service.excerpt}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5"
        >
          <CalendarCheck className="size-4" />
          Book this treatment
        </Link>
        <Link
          href={site.phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-brand hover:text-brand"
        >
          <Phone className="size-4" />
          {site.phone}
        </Link>
      </PageHero>

      <Section>
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <span className="grid size-14 place-items-center rounded-2xl bg-brand/10 text-brand">
              <DynamicIcon name={service.icon} className="size-7" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Gentle, modern {service.name.toLowerCase()} in Chicago
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                At {site.practiceName}, {service.name.toLowerCase()} is delivered with the comfort and
                precision you deserve. We take time to explain every step, answer your questions, and
                make sure you feel at ease from start to finish.
              </p>
              <p>
                Using modern digital technology, we keep your visit efficient and your results
                natural-looking and long-lasting — all at transparent, upfront pricing.
              </p>
            </div>

            {service.highlights.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-semibold text-foreground">What&apos;s included</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                      <span className="text-sm font-medium text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
              {service.from && (
                <>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-4xl font-semibold tracking-tight text-brand">{service.from}</p>
                </>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                Final pricing depends on your needs — we&apos;ll give you a clear estimate before any
                treatment. Most insurance accepted, financing available.
              </p>
              <Link
                href="/contact"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="size-4" />
                Book a consultation
              </Link>
              <Link
                href={site.phoneHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                <Phone className="size-4" />
                Call {site.phone}
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* related */}
      <Section tone="muted">
        <div className="container">
          <SectionHeading eyebrow="Keep exploring" title="Related treatments" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedList.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </Section>

      {/* reviews */}
      <Section>
        <div className="container">
          <SectionHeading eyebrow="Patient stories" title="What our patients say" />
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {reviews.slice(0, 3).map((t) => (
              <ReviewCard key={t.author} t={t} />
            ))}
          </div>
        </div>
      </Section>

      <Faq items={faqItems.slice(0, 5)} phone={site.phone} phoneHref={site.phoneHref} tone="muted" />
    </>
  )
}
