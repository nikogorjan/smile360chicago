import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  faqs as fbFaqs,
  galleryCases as fbGallery,
  services as fbServices,
  team as fbTeam,
  testimonials as fbTestimonials,
  type Faq,
  type GalleryCase,
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

async function payload() {
  return getPayload({ config: configPromise })
}

export async function getServices(): Promise<Service[]> {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'services', limit: 100, depth: 0 })
    if (!res.docs.length) return fbServices
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      id: String(d.id || ''),
      slug: String(d.slug || ''),
      name: String(d.name || ''),
      icon: String(d.icon || 'Stethoscope'),
      category: (d.category as Service['category']) || 'Preventive',
      excerpt: String(d.excerpt || ''),
      from: (d.from as string) || undefined,
      highlights: items(d.highlights),
      featured: Boolean(d.featured),
    }))
  } catch {
    return fbServices
  }
}

/** Fetch specific services by id, preserving the given order (for relationship pickers). */
export async function getServicesByIds(ids: string[]): Promise<Service[]> {
  if (!ids.length) return []
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'services',
      where: { id: { in: ids } },
      limit: 100,
      depth: 0,
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

export async function getFaqs(category?: Faq['category']): Promise<Faq[]> {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'faqs',
      limit: 100,
      depth: 0,
      where: category ? { category: { equals: category } } : undefined,
    })
    if (!res.docs.length) {
      return category ? fbFaqs.filter((f) => f.category === category) : fbFaqs
    }
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      question: String(d.question || ''),
      answer: String(d.answer || ''),
      category: (d.category as Faq['category']) || 'General',
    }))
  } catch {
    return category ? fbFaqs.filter((f) => f.category === category) : fbFaqs
  }
}

export async function getGalleryCases(): Promise<GalleryCase[]> {
  try {
    const p = await payload()
    // depth 1 so the before/after upload relations are populated (we need their URLs).
    const res = await p.find({ collection: 'gallery-cases', limit: 100, depth: 1 })
    if (!res.docs.length) return fbGallery
    const urlOf = (v: unknown): string | undefined =>
      v && typeof v === 'object' && 'url' in v ? (v as { url?: string }).url || undefined : undefined
    return (res.docs as unknown as Record<string, unknown>[]).map((d) => ({
      title: String(d.title || ''),
      treatment: String(d.treatment || ''),
      description: String(d.description || ''),
      before: urlOf(d.beforeImage),
      after: urlOf(d.afterImage),
    }))
  } catch {
    return fbGallery
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getServices()
  return all.find((s) => s.slug === slug) || null
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
