import { getCachedGlobal } from '@/utilities/getGlobals'
import { nav as fallbackNav, type NavItem } from '@/lib/practice'

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

  return { nav, ctaLabel }
}
