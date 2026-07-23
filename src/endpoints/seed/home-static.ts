import type { RequiredDataFromCollectionSlug } from 'payload'

// Last-resort fallback so `/` never 404s if the Home page is missing from the CMS.
// The real homepage lives in Payload — this only renders the site chrome.
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  meta: {
    description:
      'Gentle, modern dentistry on North Michigan Avenue — same-day emergency care, clear aligners and whole-family checkups.',
    title: 'Smile360 Chicago',
  },
  title: 'Home',
  layout: [],
}
