import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  faqs as fbFaqs,
  services as fbServices,
  team as fbTeam,
  testimonials as fbTestimonials,
  type Faq,
  type Service,
  type TeamMember,
  type Testimonial,
} from '@/lib/practice'

const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])
const items = (v: unknown): string[] =>
  arr<{ item?: string }>(v)
    .map((x) => x.item || '')
    .filter(Boolean)

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** URL of an upload/relationship field once populated (depth ≥ 1); undefined otherwise. */
const mediaUrl = (v: unknown): string | undefined => {
  const u = v && typeof v === 'object' ? (v as { url?: unknown }).url : undefined
  return typeof u === 'string' && u ? u : undefined
}

/** Ids of a hasMany relationship, whether it comes back as ids or populated docs. */
const relIds = (v: unknown): string[] =>
  Array.isArray(v)
    ? v
        .map((x) =>
          typeof x === 'string'
            ? x
            : x && typeof x === 'object'
              ? String((x as { id?: unknown }).id || '')
              : '',
        )
        .filter(Boolean)
    : []

async function payload() {
  return getPayload({ config: configPromise })
}

export async function getServices(): Promise<Service[]> {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'services', limit: 100, depth: 1 })
    if (!res.docs.length) return fbServices
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      id: String(d.id || ''),
      slug: String(d.slug || ''),
      name: String(d.name || ''),
      icon: String(d.icon || 'Stethoscope'),
      category: (d.category as Service['category']) || 'Preventive',
      excerpt: String(d.excerpt || ''),
      image: mediaUrl(d.image),
      from: (d.from as string) || undefined,
      highlights: items(d.highlights),
      featured: Boolean(d.featured),
    }))
  } catch {
    return fbServices
  }
}

/** Fetch specific services by id, preserving the given order (for relationship pickers). */
/** Fetch a single service by slug WITH its rich-text body (depth 2 populates media blocks). */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    const d = res.docs?.[0] as unknown as Record<string, unknown> | undefined
    if (!d) return null
    return {
      id: String(d.id || ''),
      slug: String(d.slug || ''),
      name: String(d.name || ''),
      icon: String(d.icon || 'Stethoscope'),
      category: (d.category as Service['category']) || 'Preventive',
      excerpt: String(d.excerpt || ''),
      image: mediaUrl(d.image),
      from: (d.from as string) || undefined,
      highlights: items(d.highlights),
      featured: Boolean(d.featured),
      body: d.body ?? null,
      relatedServices: relIds(d.relatedServices),
    }
  } catch {
    return null
  }
}

/** FAQs assigned to a specific service (via the FAQ's `services` relationship). */
export async function getFaqsForService(serviceId: string): Promise<Faq[]> {
  if (!serviceId) return []
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'faqs',
      limit: 50,
      depth: 0,
      where: { services: { in: [serviceId] } },
    })
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      question: String(d.question || ''),
      answer: String(d.answer || ''),
      isGeneral: Boolean(d.isGeneral),
    }))
  } catch {
    return []
  }
}

export async function getServicesByIds(ids: string[]): Promise<Service[]> {
  if (!ids.length) return []
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'services',
      where: { id: { in: ids } },
      limit: 100,
      depth: 1,
    })
    const byId = new Map(
      (res.docs as unknown as Record<string, unknown>[]).map((d) => [String(d.id), d]),
    )
    return ids
      .map((id) => byId.get(id))
      .filter((d): d is Record<string, unknown> => Boolean(d))
      .map((d) => ({
        id: String(d.id || ''),
        slug: String(d.slug || ''),
        name: String(d.name || ''),
        icon: String(d.icon || 'Stethoscope'),
        category: (d.category as Service['category']) || 'Preventive',
        excerpt: String(d.excerpt || ''),
        image: mediaUrl(d.image),
        from: (d.from as string) || undefined,
        highlights: items(d.highlights),
        featured: Boolean(d.featured),
      }))
  } catch {
    return []
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'team', limit: 100, sort: 'order', depth: 0 })
    if (!res.docs.length) return fbTeam
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      name: String(d.name || ''),
      role: String(d.role || ''),
      credentials: String(d.credentials || ''),
      bio: String(d.bio || ''),
      specialties: items(d.specialties),
    }))
  } catch {
    return fbTeam
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'testimonials', limit: 100, depth: 0 })
    if (!res.docs.length) return fbTestimonials
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      author: String(d.author || ''),
      rating: Number(d.rating || 5),
      quote: String(d.quote || ''),
      treatment: String(d.treatment || ''),
      source: (d.source as Testimonial['source']) || 'Google',
      initials: initialsOf(String(d.author || '')),
    }))
  } catch {
    return fbTestimonials
  }
}

/** General FAQs (marked "General FAQ" in admin) for the homepage and the FAQ block. */
export async function getFaqs(): Promise<Faq[]> {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'faqs',
      limit: 100,
      depth: 0,
      where: { isGeneral: { equals: true } },
    })
    if (!res.docs.length) return fbFaqs.filter((f) => f.isGeneral)
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      question: String(d.question || ''),
      answer: String(d.answer || ''),
      isGeneral: Boolean(d.isGeneral),
    }))
  } catch {
    return fbFaqs.filter((f) => f.isGeneral)
  }
}

/** Latest published blog posts (newest first) for homepage/section highlights. */
export async function getLatestPosts(limit = 2) {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'posts',
      depth: 1,
      limit,
      overrideAccess: false,
      sort: '-publishedAt',
      select: { title: true, slug: true, categories: true, meta: true, publishedAt: true, heroImage: true },
    })
    return res.docs
  } catch {
    return []
  }
}
