import { getCachedGlobal } from '@/utilities/getGlobals'
import { hours as fallbackHours, practice } from '@/lib/practice'

export type SiteData = {
  practiceName: string
  description: string
  legalName: string
  phone: string
  phoneHref: string
  emergencyPhone: string
  emergencyPhoneHref: string
  email: string
  address: { street: string; city: string; state: string; zip: string; full: string }
  mapUrl: string
  mapEmbed: string
  hours: { day: string; open: string; close: string; closed?: boolean | null }[]
  announcement: { enabled: boolean; text: string; link: string }
  social: { instagram: string; facebook: string; google: string; tiktok: string }
  emergencyTagline: string
  rating: { value: number; count: number }
  logo: { lightUrl: string | null; darkUrl: string | null; alt: string }
}

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

/**
 * Reads the `site-settings` global and merges it over the practice.ts defaults,
 * so the site always renders even before the global is populated, and every
 * field becomes live-editable in the admin once filled in.
 */
export async function getSiteData(): Promise<SiteData> {
  let g: Record<string, unknown> = {}
  try {
    g = (await getCachedGlobal('site-settings', 1)()) as unknown as Record<string, unknown>
  } catch {
    g = {}
  }

  const addr = (g.address as Record<string, string> | undefined) || {}
  const street = addr.street || practice.address.street
  const city = addr.city || practice.address.city
  const state = addr.state || practice.address.state
  const zip = addr.zip || practice.address.zip
  const full = [street, `${city}, ${state} ${zip}`].filter(Boolean).join(', ')

  const phone = (g.phone as string) || practice.phone
  const emergencyPhone = (g.emergencyPhone as string) || practice.emergencyPhone

  const hoursArr = (g.hours as SiteData['hours'] | undefined)?.length
    ? (g.hours as SiteData['hours'])
    : fallbackHours

  const logoLight = g.logoLight as { url?: string | null; alt?: string | null } | null | undefined
  const logoDark = g.logoDark as { url?: string | null; alt?: string | null } | null | undefined
  const logo = {
    lightUrl: logoLight && typeof logoLight === 'object' && logoLight.url ? logoLight.url : null,
    darkUrl: logoDark && typeof logoDark === 'object' && logoDark.url ? logoDark.url : null,
    alt:
      (logoLight && typeof logoLight === 'object' && logoLight.alt) ||
      (logoDark && typeof logoDark === 'object' && logoDark.alt) ||
      practice.name,
  }

  return {
    logo,
    practiceName: (g.practiceName as string) || practice.name,
    description: practice.description,
    legalName: practice.legalName,
    phone,
    phoneHref: telHref(phone),
    emergencyPhone,
    emergencyPhoneHref: telHref(emergencyPhone),
    email: (g.email as string) || practice.email,
    address: { street, city, state, zip, full },
    mapUrl: (g.mapUrl as string) || practice.mapUrl,
    mapEmbed: practice.mapEmbed,
    hours: hoursArr,
    announcement: {
      enabled: g.announcementEnabled !== false,
      text: (g.announcementText as string) || practice.emergencyTagline,
      link: (g.announcementLink as string) || '/emergency-dentist',
    },
    social: {
      instagram: (g.instagram as string) || practice.social.instagram,
      facebook: (g.facebook as string) || practice.social.facebook,
      google: (g.google as string) || practice.social.google,
      tiktok: (g.tiktok as string) || practice.social.tiktok,
    },
    emergencyTagline: practice.emergencyTagline,
    rating: practice.rating,
  }
}
