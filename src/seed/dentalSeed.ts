import type { Payload } from 'payload'

import {
  faqs,
  galleryCases,
  hours,
  practice,
  services,
  stats,
  team,
  testimonials,
} from '@/lib/practice'
import { seedBlog } from './blogSeed'

/* ------------------------------------------------------------------ helpers */
const customLink = (url: string, label: string) => ({
  link: { type: 'custom' as const, url, label, newTab: false },
})

const bookLink = customLink('/contact', 'Book Appointment')
const callLink = customLink(practice.phoneHref, `Call ${practice.phone}`)

/* ------------------------------------------------------------- block makers */
const t = (text: string, extra: Record<string, unknown> = {}) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  version: 1,
  ...extra,
})

const hero = () => ({
  blockType: 'heroBlock',
  eyebrow: "Chicago's friendliest dental practice",
  // rich-text heading: "look forward to visiting." is marked Cursive
  heading: {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          textFormat: 0,
          children: [
            t("A dentist you'll "),
            t('look forward to visiting.', { $: { style: 'cursive' } }),
          ],
        },
      ],
    },
  },
  subheading:
    'Gentle family, cosmetic, and same-day emergency dentistry in the heart of Chicago. Transparent pricing, modern technology, and a team that treats you like a person — not a chart.',
  showRating: true,
  pills: [
    { label: 'Same-day emergencies' },
    { label: 'Most insurance accepted' },
    { label: '0% financing available' },
  ],
  links: [bookLink, customLink(practice.phoneHref, practice.phone)],
})

const statsBlock = () => ({
  blockType: 'statsBlock',
  items: stats.map((s) => ({ value: s.value, label: s.label })),
})

const insuranceBlock = () => ({
  blockType: 'insuranceBlock',
  heading: 'We accept most major PPO insurance plans',
  plans: [],
})

const servicesGrid = (over: Record<string, unknown> = {}) => ({
  blockType: 'servicesGridBlock',
  eyebrow: 'What we do',
  heading: 'Complete care for every smile',
  description:
    'From routine cleanings to full smile makeovers and same-day emergencies — all under one roof, with technology that makes every visit faster and more comfortable.',
  align: 'center',
  source: 'all',
  showViewAll: true,
  background: 'default',
  ...over,
})

const featureGrid = (
  heading: string,
  eyebrow: string,
  features: { icon: string; title: string; body: string }[],
  background = 'default',
) => ({ blockType: 'featureGridBlock', eyebrow, heading, align: 'center', features, background })

const beforeAfter = (background = 'muted') => ({
  blockType: 'beforeAfterBlock',
  eyebrow: 'Real results',
  heading: 'See the difference a Smile360 smile makes',
  description:
    'Drag the slider to reveal a real-world transformation. From whitening and bonding to full smile makeovers, our before-and-afters speak for themselves.',
  align: 'left',
  ctaLabel: 'Explore the full smile gallery',
  ctaHref: '/smile-gallery',
  background,
})

const galleryGrid = () => ({ blockType: 'galleryGridBlock', background: 'default' })

const emergency = () => ({
  blockType: 'emergencyBlock',
  heading: practice.emergencyTagline,
  text: "Toothache, broken or knocked-out tooth, swelling? Don't wait it out. We keep same-day slots open every day — fast relief, gentle hands.",
  callLabel: 'Call now',
  secondaryLabel: 'Same-day care',
  secondaryHref: '/emergency-dentist',
})

const reviewsBlock = (over: Record<string, unknown> = {}) => ({
  blockType: 'reviewsBlock',
  eyebrow: 'Patient stories',
  heading: 'Loved by thousands of Chicago smiles',
  description: `Rated ${practice.rating.value}/5 across ${practice.rating.count}+ Google reviews. Here's what real patients say.`,
  align: 'center',
  background: 'default',
  ...over,
})

const teamGrid = (over: Record<string, unknown> = {}) => ({
  blockType: 'teamGridBlock',
  eyebrow: 'Meet your team',
  heading: 'The faces behind your smile',
  description:
    'Experienced, warm, and genuinely invested in your comfort — meet the people who’ll care for you.',
  align: 'center',
  background: 'default',
  ...over,
})

const faqBlock = (over: Record<string, unknown> = {}) => ({
  blockType: 'faqBlock',
  eyebrow: 'Good to know',
  heading: 'Frequently asked questions',
  description: 'Can’t find your answer? We’re happy to help — give us a call.',
  align: 'left',
  category: 'all',
  showCall: true,
  background: 'default',
  ...over,
})

const finalCta = () => ({
  blockType: 'finalCtaBlock',
  eyebrow: "Let's get started",
  heading: 'Book your visit today',
  description:
    "New patients welcome. Most insurance accepted. Same-day emergency appointments available — we can't wait to meet you.",
  primaryLabel: 'Book Appointment',
  primaryHref: '/contact',
  showMap: true,
})

const pageHero = (
  eyebrow: string,
  heading: string,
  description: string,
  over: Record<string, unknown> = {},
) => ({
  blockType: 'pageHeroBlock',
  eyebrow,
  heading,
  description,
  variant: 'brand',
  links: [],
  ...over,
})

const appointmentBlock = () => ({
  blockType: 'appointmentBlock',
  eyebrow: 'Get in touch',
  heading: 'Request your appointment',
  description:
    'Fill in the form and we’ll confirm fast. New patients and same-day emergencies always welcome.',
  align: 'center',
  showContactInfo: true,
  background: 'default',
})

const mediaBanner = (o: Record<string, unknown>) => ({
  blockType: 'mediaBannerBlock',
  align: 'center',
  overlay: 'medium',
  height: 'standard',
  links: [],
  ...o,
})

const splitFeature = (o: Record<string, unknown>) => ({
  blockType: 'splitFeatureBlock',
  imageSide: 'right',
  background: 'default',
  bullets: [],
  links: [],
  ...o,
})

const bento = (o: Record<string, unknown>) => ({
  blockType: 'bentoBlock',
  align: 'center',
  background: 'default',
  tiles: [],
  ...o,
})

const quote = (o: Record<string, unknown>) => ({ blockType: 'quoteBlock', rating: 5, ...o })

const timeline = (o: Record<string, unknown>) => ({
  blockType: 'timelineBlock',
  align: 'center',
  background: 'default',
  items: [],
  ...o,
})

const b = (item: string) => ({ item })

/* --------------------------------------------------------------- value sets */
const financingFeatures = [
  { icon: 'ShieldCheck', title: 'Most PPO insurance', body: 'We accept and file most major PPO plans for you, and verify your benefits before your visit.' },
  { icon: 'CreditCard', title: '0% financing', body: 'Flexible monthly payment plans through CareCredit and similar — quick approval, no surprises.' },
  { icon: 'HandCoins', title: 'In-house membership', body: 'No insurance? Our membership plan covers cleanings, exams, X-rays, and treatment discounts.' },
  { icon: 'Gift', title: 'New-patient special', body: 'New patients get a complete exam, digital X-rays, and a personalized plan at a welcoming rate.' },
]

const symptomFeatures = [
  { icon: 'Zap', title: 'Severe toothache', body: 'Throbbing or sharp pain that won’t quit — often a sign of infection or decay.' },
  { icon: 'Bone', title: 'Broken or chipped tooth', body: 'Cracked, fractured, or chipped from a fall, sports, or biting down.' },
  { icon: 'Activity', title: 'Knocked-out tooth', body: 'Time is critical — keep the tooth moist and call us immediately.' },
  { icon: 'Thermometer', title: 'Swelling or abscess', body: 'Facial or gum swelling can signal a serious infection that needs fast care.' },
  { icon: 'Droplets', title: 'Bleeding or trauma', body: 'Injury to the mouth, gums, or lips after an accident.' },
  { icon: 'Pill', title: 'Lost filling or crown', body: 'A dislodged crown or filling leaves the tooth exposed and sensitive.' },
]

const firstAidSteps = [
  { title: 'Rinse', description: 'Gently rinse your mouth with warm salt water to clean the area.' },
  { title: 'Relieve', description: 'Take an over-the-counter pain reliever as directed; apply a cold compress for swelling.' },
  { title: 'Protect', description: 'Save any broken pieces or a knocked-out tooth — keep it in milk or saliva.' },
  { title: 'Call us', description: `Phone ${practice.emergencyPhone} right away. Don’t wait for pain to “pass.”` },
]

// Balanced 4-col layout: wide brand tile (top-left), four equal tiles,
// wide stat tile (bottom-right) — fills the grid with no gaps.
const differenceTiles = [
  { size: 'wide', tone: 'brand', icon: 'HeartHandshake', title: 'Genuinely gentle care', body: 'Anxious about the dentist? You’re our specialty — sedation options and a no-judgment team that goes at your pace.' },
  { size: 'normal', tone: 'card', icon: 'Timer', title: 'Same-day & on-time', body: 'Emergency slots open daily, and visits that start when scheduled.' },
  { size: 'normal', tone: 'card', icon: 'MonitorSmartphone', title: 'Modern technology', body: 'Digital X-rays and same-day crowns for faster, clearer care.' },
  { size: 'normal', tone: 'card', icon: 'Wallet', title: 'Transparent pricing', body: 'Clear estimates up front. Most insurance accepted.' },
  { size: 'normal', tone: 'card', icon: 'ShieldCheck', title: 'Honest, never pushy', body: 'Photo-backed findings so you see exactly what we see.' },
  { size: 'wide', tone: 'accent', stat: '20k+', title: 'Smiles transformed', body: '15+ years caring for Chicago families.' },
]

const firstVisitTimeline = [
  { icon: 'CalendarCheck', title: 'Book in 60 seconds', body: 'Request a time online or call. We confirm fast and verify your insurance for you.' },
  { icon: 'Armchair', title: 'Relax at your visit', body: 'Comfortable chairs, calming amenities, and a team that explains every step — no lectures.' },
  { icon: 'ClipboardCheck', title: 'Get a clear plan', body: 'Honest, photo-backed findings and transparent pricing. You decide what’s next.' },
  { icon: 'Smile', title: 'Smile with confidence', body: 'Ongoing care and reminders that keep your smile healthy for years.' },
]

const firstAidTimeline = firstAidSteps.map((s, i) => ({
  icon: ['Droplets', 'Pill', 'ShieldCheck', 'Phone'][i],
  title: s.title,
  body: s.description,
}))

const featuredQuote = quote({
  quote:
    'I cracked a tooth on a Saturday and they saw me within the hour. Zero pain, zero judgment. This is the only dentist I trust now.',
  author: 'Rachel M.',
  role: 'Emergency visit · Google review',
})

/* ---------------------------------------------------------------- the pages */
const pages = [
  {
    slug: 'home',
    title: 'Home',
    meta: {
      title: 'Dentist in Chicago — Family, Cosmetic & Emergency Dental Care',
      description:
        'Smile360 Chicago is a modern, gentle dental practice offering family, cosmetic, and same-day emergency dentistry. Most insurance accepted. Book your visit today.',
    },
    layout: [
      hero(),
      statsBlock(),
      insuranceBlock(),
      splitFeature({
        imageSide: 'left',
        eyebrow: 'Why Smile360',
        heading: 'Care that actually feels different',
        body: 'From your first hello to your follow-up, we focus on comfort, honesty, and getting you seen fast — the dental experience Chicago has been missing.',
        bullets: [
          b('Gentle, judgment-free team'),
          b('Same-day emergency appointments'),
          b('Transparent, upfront pricing'),
          b('Most insurance accepted'),
        ],
        statValue: '4.9★',
        statLabel: '487+ Google reviews',
        links: [bookLink],
      }),
      servicesGrid({ limit: 6 }),
      bento({ eyebrow: 'The Smile360 difference', heading: 'Why Chicago chooses us', tiles: differenceTiles }),
      beforeAfter(),
      emergency(),
      featuredQuote,
      teamGrid({ limit: 4, background: 'muted' }),
      timeline({ eyebrow: 'How it works', heading: 'Your first visit, made easy', items: firstVisitTimeline }),
      faqBlock({ limit: 6, background: 'muted' }),
      mediaBanner({
        eyebrow: 'Comfort-first dentistry',
        heading: 'Modern care that feels calm, not clinical',
        text: 'A spa-like space, gentle technology, and a team trained to put even the most nervous patients at ease.',
        height: 'tall',
        links: [bookLink, callLink],
      }),
      finalCta(),
    ],
  },
  {
    slug: 'about',
    title: 'About',
    meta: {
      title: 'About Our Practice',
      description:
        'Meet Smile360 Chicago — a modern, patient-first dental practice built on gentle care, honesty, and technology.',
    },
    layout: [
      pageHero('Our practice', 'Dentistry with a human touch', 'We built Smile360 Chicago to be the dental office we always wished existed — gentle, honest, modern, and genuinely on your side.', { links: [bookLink] }),
      splitFeature({
        imageSide: 'right',
        eyebrow: 'Our story',
        heading: 'Care that feels different from the first hello',
        body: 'Dr. Mia Chen founded Smile360 to combine the warmth of a neighborhood practice with the precision of modern dentistry — no rushing, no surprise bills, no judgment.',
        bullets: [b('Founded on comfort & honesty'), b('15+ years serving Chicago'), b('Thousands of happy families'), b('One calm roof for everyone')],
        statValue: '15+',
        statLabel: 'years caring for Chicago smiles',
      }),
      bento({ eyebrow: 'What we stand for', heading: 'Our values', tiles: differenceTiles, background: 'muted' }),
      statsBlock(),
      timeline({ eyebrow: 'The experience', heading: 'What it’s like to be our patient', items: firstVisitTimeline }),
      teamGrid({ limit: 4, background: 'muted' }),
      featuredQuote,
      faqBlock({ category: 'General' }),
      finalCta(),
    ],
  },
  {
    slug: 'team',
    title: 'Meet the Team',
    meta: {
      title: 'Meet the Team',
      description:
        'Meet the dentists and hygienists at Smile360 Chicago — experienced, gentle, and genuinely invested in your comfort.',
    },
    layout: [
      pageHero('Meet the team', 'The people behind your smile', 'A warm, highly-trained team that treats you like family — and makes every visit easy.'),
      teamGrid(),
      reviewsBlock({ limit: 3, background: 'muted' }),
      finalCta(),
    ],
  },
  {
    slug: 'services',
    title: 'Services',
    meta: {
      title: 'Dental Services in Chicago',
      description:
        'Explore Smile360 Chicago’s full range of dental services — cleanings, whitening, Invisalign, implants, crowns, root canals, and emergency care.',
    },
    layout: [
      pageHero('Our services', 'Complete dental care, all in one place', 'Preventive, cosmetic, restorative, orthodontic, and emergency dentistry — delivered gently and backed by modern technology.'),
      servicesGrid({ eyebrow: '', heading: '', description: '', showViewAll: false }),
      splitFeature({
        imageSide: 'left',
        eyebrow: 'Modern dentistry',
        heading: 'Technology that makes every visit better',
        body: 'Digital scans, intraoral cameras, and same-day CEREC crowns mean fewer appointments, clearer answers, and more comfortable care.',
        bullets: [b('Same-day crowns'), b('Digital, low-dose X-rays'), b('3D Invisalign previews'), b('Gentle, precise techniques')],
      }),
      timeline({ eyebrow: 'How it works', heading: 'Your first visit, made easy', items: firstVisitTimeline, background: 'muted' }),
      mediaBanner({
        eyebrow: 'Dental emergency?',
        heading: 'Got a toothache? Just come to us.',
        text: 'Same-day appointments for toothaches, chips, and dental trauma — every day we’re open.',
        overlay: 'dark',
        links: [callLink, customLink('/emergency-dentist', 'Emergency care')],
      }),
      faqBlock(),
      finalCta(),
    ],
  },
  {
    slug: 'smile-gallery',
    title: 'Smile Gallery',
    meta: {
      title: 'Smile Gallery — Before & After',
      description:
        'Browse real smile transformations from Smile360 Chicago — whitening, Invisalign, veneers, bonding, and implants.',
    },
    layout: [
      pageHero('Smile gallery', 'Real smiles, real transformations', 'Cosmetic results that speak for themselves. Drag, filter, and explore the work our patients love to show off.'),
      beforeAfter('default'),
      galleryGrid(),
      featuredQuote,
      mediaBanner({
        eyebrow: 'Your turn',
        heading: 'Ready to love your smile?',
        text: 'Book a cosmetic consultation and see your potential results with a free 3D preview.',
        links: [bookLink],
      }),
      finalCta(),
    ],
  },
  {
    slug: 'reviews',
    title: 'Patient Reviews',
    meta: {
      title: 'Patient Reviews & Stories',
      description:
        'Read why Chicago patients rate Smile360 4.9/5 across 487+ Google reviews. Real stories about gentle care and stunning results.',
    },
    layout: [
      pageHero('Patient stories', 'Don’t take our word for it', 'Thousands of Chicago smiles, one promise kept: gentle, honest, exceptional care.'),
      featuredQuote,
      statsBlock(),
      reviewsBlock(),
      finalCta(),
    ],
  },
  {
    slug: 'new-patients',
    title: 'New Patients',
    meta: {
      title: 'New Patients — Insurance & Financing',
      description:
        'New to Smile360 Chicago? See what to expect at your first visit, the insurance we accept, and flexible financing options.',
    },
    layout: [
      pageHero('New patients', 'Welcome — let’s make this easy', 'Everything you need to know before your first visit, from insurance to financing to what to expect.', { links: [bookLink] }),
      timeline({ eyebrow: 'How it works', heading: 'Your first visit, made easy', items: firstVisitTimeline }),
      featureGrid('Care that fits your budget', 'Insurance & financing', financingFeatures, 'muted'),
      featuredQuote,
      faqBlock({ category: 'Insurance' }),
      finalCta(),
    ],
  },
  {
    slug: 'contact',
    title: 'Contact',
    meta: {
      title: 'Contact & Book an Appointment',
      description:
        'Book your visit at Smile360 Chicago. Call, email, or request an appointment online. Same-day emergencies welcome.',
    },
    layout: [
      pageHero('Get in touch', 'Book your appointment', 'Request a time online and we’ll confirm fast — or call us directly. New patients and same-day emergencies always welcome.'),
      appointmentBlock(),
      finalCta(),
    ],
  },
  {
    slug: 'emergency-dentist',
    title: 'Emergency Dentist',
    meta: {
      title: 'Emergency Dentist in Chicago — Same-Day Toothache Relief',
      description:
        'Tooth pain? Smile360 Chicago offers same-day emergency dental appointments for toothaches, broken teeth, swelling, and knocked-out teeth. Call now.',
    },
    layout: [
      pageHero('Same-day emergency care', 'Got a toothache? Just come to us.', "In pain right now? Don't wait it out. Our Chicago emergency dentists keep same-day slots open every day — for fast, gentle relief when you need it most.", {
        variant: 'emergency',
        links: [callLink, customLink('/contact', 'Request a time')],
      }),
      featureGrid('What counts as a dental emergency?', 'We treat all dental emergencies', symptomFeatures),
      timeline({ eyebrow: 'Before you arrive', heading: 'What to do right now', description: 'A few simple steps can ease your pain and protect your tooth on the way to our office.', items: firstAidTimeline, background: 'muted' }),
      mediaBanner({
        eyebrow: 'Same-day relief',
        heading: 'In pain? We’ll see you today.',
        text: 'Call now and we’ll get you comfortable fast — gently, and without judgment.',
        overlay: 'dark',
        links: [callLink, customLink('/contact', 'Request a time')],
      }),
      faqBlock({ category: 'Emergency' }),
      featuredQuote,
      emergency(),
      finalCta(),
    ],
  },
]

/* -------------------------------------------------------------------- runner */
export async function dentalSeed(payload: Payload): Promise<void> {
  const log = (m: string) => payload.logger.info(`[dentalSeed] ${m}`)

  // 1. Site Settings global
  log('Site Settings…')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      practiceName: practice.name,
      phone: practice.phone,
      emergencyPhone: practice.emergencyPhone,
      email: practice.email,
      address: {
        street: practice.address.street,
        city: practice.address.city,
        state: practice.address.state,
        zip: practice.address.zip,
      },
      mapUrl: practice.mapUrl,
      hours: hours.map((h) => ({ day: h.day, open: h.open, close: h.close, closed: !!h.closed })),
      announcementEnabled: true,
      announcementText: practice.emergencyTagline,
      announcementLink: '/emergency-dentist',
      instagram: practice.social.instagram,
      facebook: practice.social.facebook,
      google: practice.social.google,
      tiktok: practice.social.tiktok,
    } as never,
  })

  // 2. Header global (nav with dropdowns + CTA)
  log('Header nav…')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      ctaLabel: 'Book Now',
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Home' } },
        {
          link: { type: 'custom', url: '/about', label: 'About' },
          children: [
            { link: { type: 'custom', url: '/about', label: 'Our Practice' }, description: 'Our story, values & technology' },
            { link: { type: 'custom', url: '/team', label: 'Meet the Team' }, description: 'The dentists & hygienists' },
            { link: { type: 'custom', url: '/reviews', label: 'Patient Reviews' }, description: 'Real stories from real smiles' },
          ],
        },
        {
          link: { type: 'custom', url: '/services', label: 'Services' },
          children: [
            { link: { type: 'custom', url: '/services', label: 'All Services' }, description: 'Browse every treatment' },
            { link: { type: 'custom', url: '/services/whitening', label: 'Teeth Whitening' }, description: 'Brighten in one visit' },
            { link: { type: 'custom', url: '/services/invisalign', label: 'Invisalign®' }, description: 'Clear, removable aligners' },
            { link: { type: 'custom', url: '/services/implants', label: 'Dental Implants' }, description: 'Permanent tooth replacement' },
            { link: { type: 'custom', url: '/emergency-dentist', label: 'Emergency Dentist' }, description: 'Same-day toothache relief' },
          ],
        },
        { link: { type: 'custom', url: '/smile-gallery', label: 'Smile Gallery' } },
        { link: { type: 'custom', url: '/new-patients', label: 'New Patients' } },
        { link: { type: 'custom', url: '/posts', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    } as never,
  })

  // 3. Collections — clear then create
  const collClear: { slug: 'services' | 'team' | 'testimonials' | 'faqs' | 'gallery-cases' }[] = [
    { slug: 'services' },
    { slug: 'team' },
    { slug: 'testimonials' },
    { slug: 'faqs' },
    { slug: 'gallery-cases' },
  ]
  for (const c of collClear) {
    await payload.delete({ collection: c.slug, where: {} })
  }

  log('Services…')
  for (const s of services) {
    await payload.create({
      collection: 'services',
      data: {
        name: s.name,
        slug: s.slug,
        generateSlug: false,
        category: s.category,
        icon: s.icon,
        excerpt: s.excerpt,
        from: s.from,
        featured: !!s.featured,
        highlights: s.highlights.map((item) => ({ item })),
      } as never,
    })
  }

  log('Team…')
  for (let i = 0; i < team.length; i++) {
    const m = team[i]
    await payload.create({
      collection: 'team',
      data: {
        name: m.name,
        role: m.role,
        credentials: m.credentials,
        bio: m.bio,
        specialties: m.specialties.map((item) => ({ item })),
        order: i,
      } as never,
    })
  }

  log('Testimonials…')
  for (const t of testimonials) {
    await payload.create({
      collection: 'testimonials',
      data: {
        author: t.author,
        rating: t.rating,
        quote: t.quote,
        treatment: t.treatment,
        source: t.source,
        featured: true,
      } as never,
    })
  }

  log('FAQs…')
  for (const f of faqs) {
    await payload.create({
      collection: 'faqs',
      data: { question: f.question, answer: f.answer, category: f.category } as never,
    })
  }

  log('Gallery…')
  for (const g of galleryCases) {
    await payload.create({
      collection: 'gallery-cases',
      data: {
        title: g.title,
        treatment: g.treatment,
        description: g.description,
        consentOnFile: false,
      } as never,
    })
  }

  // 4. Pages — clear the ones we manage, then create from blocks
  log('Pages…')
  for (const p of pages) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: p.slug } } })
  }
  for (const p of pages) {
    await payload.create({
      collection: 'pages',
      data: {
        title: p.title,
        slug: p.slug,
        generateSlug: false,
        _status: 'published',
        hero: { type: 'none' },
        layout: p.layout,
        meta: { title: p.meta.title, description: p.meta.description },
      } as never,
    })
  }

  // 5. Blog — categories + SEO posts
  await seedBlog(payload)

  log('Done ✅')
}
