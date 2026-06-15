import React from 'react'

import { faqs, hours, practice, services } from '@/lib/practice'

const DAY_MAP: Record<string, string> = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
}

const to24 = (t: string) => {
  const [time, ampm] = t.split(' ')
  const [hStr, mStr] = time.split(':')
  let h = parseInt(hStr, 10)
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${mStr}`
}

const JsonLd: React.FC<{ data: unknown }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

/** Primary LocalBusiness / Dentist schema — drives Google's local prominence. */
export const LocalBusinessSchema: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${practice.url}/#dentist`,
    name: practice.name,
    description: practice.description,
    url: practice.url,
    telephone: practice.phone,
    email: practice.email,
    priceRange: practice.priceRange,
    image: `${practice.url}/og.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: practice.address.street,
      addressLocality: practice.address.city,
      addressRegion: practice.address.state,
      postalCode: practice.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: practice.geo.lat,
      longitude: practice.geo.lng,
    },
    openingHoursSpecification: hours
      .filter((h) => !h.closed)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${DAY_MAP[h.day]}`,
        opens: to24(h.open),
        closes: to24(h.close),
      })),
    sameAs: [practice.social.instagram, practice.social.facebook, practice.social.google],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: practice.rating.value,
      reviewCount: practice.rating.count,
    },
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name },
    })),
  }
  return <JsonLd data={data} />
}

export const FaqSchema: React.FC<{ category?: string }> = ({ category }) => {
  const list = category ? faqs.filter((f) => f.category === category) : faqs
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  return <JsonLd data={data} />
}

export const BreadcrumbSchema: React.FC<{ items: { name: string; url: string }[] }> = ({
  items,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${practice.url}${item.url}`,
    })),
  }
  return <JsonLd data={data} />
}

export const ServiceSchema: React.FC<{ name: string; description: string; slug: string }> = ({
  name,
  description,
  slug,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name,
    description,
    url: `${practice.url}/services/${slug}`,
    provider: { '@id': `${practice.url}/#dentist` },
  }
  return <JsonLd data={data} />
}
