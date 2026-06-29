import type { Metadata } from 'next'
import { CalendarCheck, CheckCircle2, ChevronRight, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { Faq } from '@/components/sections/Faq'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Eyebrow, Section, SectionHeading, DynamicIcon } from '@/components/site/primitives'
import { ServiceCard, ReviewCard } from '@/components/site/cards'
import { BreadcrumbSchema, ServiceSchema } from '@/components/site/Schema'
import { getSiteData } from '@/lib/getSiteSettings'
import { getServices, getFaqs, getTestimonials } from '@/lib/queries'
import { getServicePhoto } from '@/lib/stockImages'
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
      {/* Image hero — service photo with the title + meta overlaid, like blog posts
          (dark scrim, rounded floating panel). */}
      <header className="relative">
        <div className="p-3 sm:p-4">
          <div className="relative h-[58vh] min-h-[460px] max-h-[660px] overflow-hidden rounded-[8px] bg-muted">
            <Image
              src={getServicePhoto(service.slug, 0)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
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
                <Link href="/services" className="transition-colors hover:text-white">
                  Services
                </Link>
                <ChevronRight className="size-3" />
                <span className="text-white/90">{service.name}</span>
              </nav>
              <Eyebrow tone="dark">{service.category}</Eyebrow>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                {service.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: 'white', className: 'font-bold text-brand' })}
                >
                  <ButtonLabel>
                    <CalendarCheck className="size-4" />
                    Book this treatment
                  </ButtonLabel>
                </Link>
                <Link
                  href={site.phoneHref}
                  className={buttonVariants({ variant: 'outlineWhite', className: 'font-bold' })}
                >
                  <ButtonLabel>
                    <Phone className="size-4" />
                    {site.phone}
                  </ButtonLabel>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Section>
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <span className="grid size-14 place-items-center rounded-full bg-brand/10 text-brand">
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
            <div className="rounded-[8px] border border-border bg-card p-7">
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
                className={buttonVariants({ variant: 'default', className: 'mt-6 flex font-bold' })}
              >
                <ButtonLabel>
                  <CalendarCheck className="size-4" />
                  Book a consultation
                </ButtonLabel>
              </Link>
              <Link
                href={site.phoneHref}
                className={buttonVariants({ variant: 'outline', className: 'mt-2 flex font-bold' })}
              >
                <ButtonLabel>
                  <Phone className="size-4" />
                  Call {site.phone}
                </ButtonLabel>
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
