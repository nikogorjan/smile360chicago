# Smile360 Chicago — Build Notes

Custom dental-practice website built on the Payload CMS website template
(Next.js 16 · Tailwind v4 · shadcn · MongoDB). Light is the primary theme;
dark mode is fully supported.

## What's built

### Design system
- Dental brand palette (calm teal-blue `--brand`, warm `--accent`, coral
  `--emergency`) defined for **both** light and dark in
  `src/app/(frontend)/globals.css`.
- Light is forced as the default first paint (`InitTheme` + `ThemeProvider`
  ignore the OS `prefers-color-scheme`; only an explicit toggle saves a choice).
- Creative utilities: `.text-gradient-brand`, `.glass`, `.bg-brand-glow`,
  `.bg-dot-grid`, `.reveal`, `.animate-marquee`, `.animate-float`.

### Global chrome (`src/components/site/`)
- **`TopBar`** — always-visible utility banner with address + click-to-call
  phone (the client's #1 requirement).
- **`AnnouncementBar`** — dismissible promo leading with the toothache angle.
- **`SiteHeader`** — sticky, scroll-aware header with dropdown mega-menu, theme
  toggle, phone, Book CTA, and a mobile slide-in menu.
- **`SiteFooter`** — NAP, hours, links, services, social, CTA strip.
- **`MobileCTA`** — sticky bottom Call/Book bar on mobile.
- **`Brand`**, **`ThemeToggle`**, **`primitives`** (Section/SectionHeading/
  StarRating/DynamicIcon), **`Schema`** (JSON-LD).

### Sections (`src/components/sections/`)
Hero, Stats, InsuranceMarquee, Services (+ ServiceCard), WhyChooseUs,
BeforeAfter (interactive slider), GalleryGrid (filterable), Reviews,
TeamGrid, Process, Faq (accordion), EmergencyBand, FinalCta (with map),
PageHero, AppointmentForm.

### Pages (`src/app/(frontend)/`)
`/` home · `/about` · `/team` · `/services` · `/services/[slug]` (10 services)
· `/smile-gallery` · `/reviews` · `/new-patients` · `/contact` ·
`/emergency-dentist` (SEO landing) · `/privacy` · `/accessibility`.
Blog stays CMS-driven at `/posts`.

### SEO
- Per-page metadata via `src/lib/seo.ts`.
- JSON-LD: `Dentist`/LocalBusiness (NAP, hours, geo, rating), FAQPage,
  BreadcrumbList, MedicalProcedure (services). See `src/components/site/Schema.tsx`.
- Sitemap via next-sitemap (runs on `postbuild`).

### Forms
- `/contact` appointment request uses a server action
  (`src/app/(frontend)/contact/actions.ts`). HIPAA-aware: no medical-detail
  fields. Emails via Resend if `RESEND_API_KEY` is set, otherwise logs.

### CMS (admin editability)
- New collections: **Services, Team, Smile Gallery, Patient Reviews, FAQs**.
- New global: **Site Settings** (NAP, hours, announcement, social).
- All grouped under "Content" / "Configuration" in the admin.

## CMS page builder (everything is editable)
The marketing pages are **CMS Pages built from blocks** — the client can add,
remove, reorder, and edit every section in the Payload admin (with live preview).

- **Blocks** live in `src/blocks/*` — each has a `config.ts` (editable fields)
  and a `Component.tsx` (renderer). Registered in `src/blocks/RenderBlocks.tsx`
  and added to the Pages `layout` in `src/collections/Pages/index.ts`.
  Blocks: Hero, PageHero, Stats, InsuranceMarquee, ServicesGrid, FeatureGrid,
  BeforeAfter, GalleryGrid, Reviews, TeamGrid, ProcessSteps, Faq, Emergency,
  FinalCta, Appointment — plus the template's Content/Media/CTA/Form/Archive.
- **Dynamic blocks** (ServicesGrid, TeamGrid, Reviews, Faq, BeforeAfter,
  GalleryGrid) pull from their **collections** via `src/lib/queries.ts`, so the
  client edits content once and it appears everywhere.
- **Globals drive the chrome:** `Site Settings` (NAP, hours, announcement,
  social) and `Header` (nav with dropdowns + CTA) are read in the layout via
  `src/lib/getSiteSettings.ts` and `src/lib/nav.ts`.
- Every block has a **background** option (default / muted / brand / glow) so
  the client controls section styling too — all light + dark aware.

## Content source of truth + fallback
`src/lib/practice.ts` holds the default copy/data and seeds the CMS. The data
layer (`queries.ts`, `getSiteSettings.ts`) reads the CMS first and **falls back
to `practice.ts`** if a collection/global is empty — so the site always renders.

## Seeding
`src/seed/dentalSeed.ts` populates Site Settings, the Header nav, all collections
(Services, Team, Testimonials, FAQs, Gallery) and every page (home, about, team,
services, smile-gallery, reviews, new-patients, contact, emergency-dentist) as
editable blocks.

**Run it against a running server** (the `payload run` CLI does not reliably
persist async writes here):

```
npm run dev
# then, once:
curl "http://localhost:3000/dental-seed?key=smile360seed"
```

Re-run anytime to reset content to the defaults (it clears + recreates the
managed pages/collections; it does not touch posts/categories).
**Delete `src/app/(frontend)/dental-seed/route.ts` before launch.**

After seeding, run `npm run build` again so all 9 pages prerender.

## Environment variables
Required: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`,
`CRON_SECRET`, `PREVIEW_SECRET`.
Optional (forms email): `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.

## Before launch (client to provide / decisions)
1. Real logo, brand colors, photography, and final copy.
2. Real NAP, hours, phone, email, Google Maps embed — update `practice.ts`
   (and Site Settings) with real values.
3. Booking: native form (current) vs. embed a scheduler.
4. Rotate the exposed MongoDB password; lock down public DB access.
5. Resend (or SMTP) key + verified sending domain for form emails.
6. Analytics (GA4 / Plausible) + Google Search Console + Business Profile.
7. Replace placeholder before/after images with consented patient photos.
8. Review the placeholder Privacy + Accessibility pages with a professional.

## Commands
- `npm run dev` — local dev (http://localhost:3000)
- `npm run build` — production build (+ sitemap)
- `npm run generate:types` — regenerate Payload types after schema changes
