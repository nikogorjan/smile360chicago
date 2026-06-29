import { getCachedGlobal } from '@/utilities/getGlobals'
import { nav as fallbackNav, type NavItem } from '@/lib/practice'
import { getServices } from '@/lib/queries'

type CMSLink = {
  type?: 'custom' | 'reference' | null
  url?: string | null
  label?: string | null
  reference?: { relationTo: string; value: { slug?: string } | string | number } | null
}

export const resolveHref = (link?: CMSLink | null): string => {
  if (!link) return '#'
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value?.slug
  ) {
    const { relationTo } = link.reference
    const prefix = relationTo === 'pages' ? '' : `/${relationTo}`
    return `${prefix}/${link.reference.value.slug}`
  }
  return link.url || '#'
}

export type ResolvedHeader = { nav: NavItem[]; ctaLabel: string }

/** Build the header nav from the CMS Header global, falling back to practice.ts. */
export async function getHeaderNav(): Promise<ResolvedHeader> {
  let data: Record<string, unknown> = {}
  try {
    data = (await getCachedGlobal('header', 2)()) as unknown as Record<string, unknown>
  } catch {
    data = {}
  }

  const items = (data.navItems as
    | { link?: CMSLink; children?: { link?: CMSLink; description?: string }[] }[]
    | undefined) || []

  const ctaLabel = (data.ctaLabel as string) || 'Book Now'

  if (!items.length) return { nav: fallbackNav, ctaLabel }

  const nav: NavItem[] = items.map((item) => ({
    label: item.link?.label || '',
    href: resolveHref(item.link),
    children: item.children?.length
      ? item.children.map((c) => ({
          label: c.link?.label || '',
          href: resolveHref(c.link),
          description: c.description,
        }))
      : undefined,
  }))

  return { nav: await withDynamicServices(nav), ctaLabel }
}

/**
 * Populate the "Services" dropdown from the Services collection so it always lists
 * every service and stays in sync as the client adds/removes them in the CMS —
 * never hardcoded. Falls back to whatever was configured if the query fails.
 */
async function withDynamicServices(nav: NavItem[]): Promise<NavItem[]> {
  const i = nav.findIndex((n) => n.href === '/services')
  if (i === -1) return nav

  let services: Awaited<ReturnType<typeof getServices>> = []
  try {
    services = await getServices()
  } catch {
    return nav
  }
  if (!services.length) return nav

  const children = services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
    description: SERVICE_TAGLINES[s.slug] || s.category,
  }))

  const next = [...nav]
  next[i] = { ...next[i], children }
  return next
}

/** Short taglines for the Services dropdown (fall back to the service's category). */
const SERVICE_TAGLINES: Record<string, string> = {
  cleanings: 'Preventive care & checkups',
  whitening: 'Brighten in one visit',
  invisalign: 'Clear, removable aligners',
  implants: 'Permanent tooth replacement',
  veneers: 'A custom-designed smile',
  'crowns-bridges': 'Restore damaged teeth',
  'root-canals': 'Pain-free, tooth-saving care',
  'kids-dentistry': 'Fear-free kids’ visits',
  emergency: 'Same-day pain relief',
}
