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
  mediaType: 'image',
  eyebrow: "Chicago's friendliest dental practice",
  // rich-text heading: "look forward to visiting." is marked Brand blue
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
            t('look forward to visiting.', { $: { style: 'brand' } }),
          ],
        },
      ],
    },
  },
  showRating: true,
  ratingText: `${practice.rating.value} from ${practice.rating.count}+ Google reviews`,
  links: [bookLink, callLink],
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

const pillarsBlock = () => ({
  blockType: 'pillarsBlock',
  eyebrow: 'Why patients choose us',
  heading: 'Care built around your comfort',
  intro: 'Six reasons Chicago families keep choosing Smile360.',
  pillars: [
    {
      title: 'Gentle, judgment-free care',
      body: 'Anxious about the dentist? You set the pace. Sedation options, numbing that actually works, and a team that explains everything before we begin.',
      checklist: [
        b('Sedation & comfort options'),
        b('Numbing that actually works'),
        b('A calm, unhurried pace'),
        b('Zero judgment, ever'),
        b('Breaks whenever you need'),
        b('Headphones & blankets'),
      ],
      stat: { value: '97%', caption: 'of patients say they felt completely at ease' },
    },
    {
      title: 'Modern technology',
      body: 'Digital scans instead of goopy molds, low-radiation 3D imaging, and same-visit crowns — faster, more comfortable, and more precise.',
      checklist: [
        b('Digital scans, no goopy molds'),
        b('Low-radiation 3D imaging'),
        b('Same-visit crowns'),
        b('Cameras you can see'),
        b('Laser-assisted treatment'),
        b('Paperless check-in'),
      ],
      stat: { value: '60%', caption: 'less time in the chair vs. traditional methods' },
    },
    {
      title: 'Honest, transparent pricing',
      body: 'Clear treatment plans with up-front costs. We file your PPO insurance for you and never push work you don’t actually need.',
      checklist: [
        b('Up-front written estimates'),
        b('We file your PPO insurance'),
        b('Flexible financing plans'),
        b('No surprise add-ons'),
        b('Second opinions welcome'),
        b('Plan for the uninsured'),
      ],
      stat: { value: '$0', caption: 'surprise fees — what we quote is what you pay' },
    },
    {
      title: 'Same-day emergencies',
      body: 'In pain today? We keep slots open every day for toothaches, breaks, and swelling — fast, gentle relief when you need it most.',
      checklist: [
        b('Same-day appointments'),
        b('Open every day'),
        b('Fast pain relief'),
        b('Broken & knocked-out teeth'),
        b('Walk-ins welcome'),
        b('After-hours guidance'),
      ],
      stat: { value: 'Same day', caption: 'relief when you need it most' },
    },
    {
      title: 'Care for the whole family',
      body: 'From first teeth to retirement, every smile is welcome under one roof — with care tailored to every age and stage.',
      checklist: [
        b('Kids & nervous first-timers'),
        b('Cleanings & checkups'),
        b('Cosmetic & whitening'),
        b('Invisalign & orthodontics'),
        b('Implants & restorations'),
        b('Gum health & prevention'),
      ],
      stat: { value: '20k+', caption: 'Chicago smiles cared for and counting' },
    },
    {
      title: 'A team Chicago trusts',
      body: 'Experienced, gentle, and genuinely invested in your comfort — and the reviews show it, visit after visit.',
      checklist: [
        b('Highly-rated dentists & hygienists'),
        b('Continuing-education driven'),
        b('Warm, familiar faces'),
        b('Hundreds of 5-star reviews'),
        b('Most insurance accepted'),
        b('Conveniently located'),
      ],
      stat: { value: '4.9★', caption: 'across 487+ Google reviews' },
    },
  ],
  insurance: { heading: 'We accept most major PPO insurance plans', plans: [] },
})

const servicesListBlock = () => ({
  blockType: 'servicesListBlock',
  eyebrow: 'Our services',
  heading: 'Complete dental care, all in one place',
  services: [], // empty → shows all services
  links: [customLink('/services', 'View all services')],
})

const servicesBentoBlock = () => ({
  blockType: 'servicesBentoBlock',
  eyebrow: 'Our services',
  heading: 'Explore our services',
  // Filled with real service ids + a couple wide/tall sizes at seed time (see the
  // ServicesBento tile injection below). Fully editable in admin afterwards.
  tiles: [] as { service: string; size: string }[],
  links: [customLink('/services', 'View all services')],
})

const servicesGrid = (over: Record<string, unknown> = {}) => ({
  blockType: 'servicesGridBlock',
  eyebrow: 'What we do',
  heading: 'Complete care for *every smile*',
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
  heading: 'See the difference a *Smile360 smile* makes',
  description:
    'From whitening and bonding to full smile makeovers, the results speak for themselves — explore real patient transformations in our smile gallery.',
  align: 'left',
  ctaLabel: 'Explore the full smile gallery',
  ctaHref: '/smile-gallery',
  background,
})

const galleryGrid = () => ({ blockType: 'galleryGridBlock', background: 'default' })

const emergency = () => ({
  blockType: 'emergencyBlock',
  heading: 'Got a toothache? *Just come to us.*',
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

const latestPosts = (over: Record<string, unknown> = {}) => ({
  blockType: 'latestPostsBlock',
  eyebrow: 'From the blog',
  heading: 'Latest from our blog',
  description: 'Practical, easy-to-read oral-health advice from our Chicago dental team.',
  limit: 2,
  links: [customLink('/posts', 'View all articles')],
  ...over,
})

const galleryPreview = (over: Record<string, unknown> = {}) => ({
  blockType: 'galleryPreviewBlock',
  eyebrow: 'Smile gallery',
  heading: 'Real smiles, *real results*',
  description: 'Drag any slider to see the transformation — whitening, bonding, veneers, and full smile makeovers.',
  limit: 3,
  links: [customLink('/smile-gallery', 'View full gallery')],
  ...over,
})

const teamGrid = (over: Record<string, unknown> = {}) => ({
  blockType: 'teamGridBlock',
  eyebrow: 'Meet your team',
  heading: 'The faces *behind your smile*',
  description:
    'Experienced, warm, and genuinely invested in your comfort — meet the people who’ll care for you.',
  align: 'center',
  background: 'default',
  ...over,
})

const faqBlock = (over: Record<string, unknown> = {}) => ({
  blockType: 'faqBlock',
  eyebrow: 'Good to know',
  heading: 'Frequently *asked questions*',
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
  heading: 'Book your visit *today*',
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

const tabsShowcase = (o: Record<string, unknown>) => ({
  blockType: 'tabsBlock',
  align: 'center',
  background: 'default',
  tabs: [],
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

// Single-practitioner feature — replaces the multi-person team grid on the homepage.
const dentistFeature = () => ({
  blockType: 'dentistFeatureBlock',
  imageSide: 'left',
  eyebrow: 'Meet your dentist',
  heading: 'The dentist *behind your smile*',
  name: 'Dr. Mustafa Salam, DMD',
  credentials: 'Lead Dentist & Founder',
  bio: 'Dr. Salam founded Smile360 Chicago to bring gentle, judgment-free dentistry to the heart of the city — pairing modern technology with honest, up-front care. From routine checkups to full smile makeovers and same-day emergencies, he treats every patient like family.',
  quote:
    "I became a dentist to take the fear out of the dental chair — when an anxious patient leaves smiling, that's the best part of my day.",
  links: [customLink('/about', 'Book Appointment')],
  // Tighter gap toward the reviews section below.
  paddingBottom: 'sm',
})

// Full-width edge-to-edge photo band (building/exterior). Image empty → stock fallback;
// upload the real building photo in the CMS.
const imageBand = () => ({
  blockType: 'imageBandBlock',
  height: 'large',
  alt: 'The Smile360 Chicago practice',
})

// Groups several section blocks inside one shared white rounded inset panel.
const panel = (blocks: Record<string, unknown>[]) => ({ blockType: 'panelBlock', blocks })

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

const differenceTabs = [
  {
    label: 'Gentle care',
    icon: 'HeartHandshake',
    title: 'Genuinely gentle, judgment-free care',
    body: 'Anxious about the dentist? You’re our specialty. We move at your pace, explain every step, and never lecture.',
    bullets: [
      b('Sedation & comfort options'),
      b('Calm, spa-like treatment rooms'),
      b('A team trained for nervous patients'),
      b('Numbing that actually works'),
    ],
    stat: '98%',
    statLabel: 'of patients say we eased their dental anxiety',
  },
  {
    label: 'Same-day',
    icon: 'Timer',
    title: 'Same-day appointments that start on time',
    body: 'We keep emergency slots open every day we’re open — and respect your schedule with visits that begin when booked.',
    bullets: [
      b('Emergency slots held daily'),
      b('On-time, unhurried visits'),
      b('Open 6 days a week'),
      b('Walk-ins welcome'),
    ],
    stat: 'Same-day',
    statLabel: 'emergency care, every day we’re open',
  },
  {
    label: 'Technology',
    icon: 'MonitorSmartphone',
    title: 'Modern technology, clearer care',
    body: 'Digital X-rays, intraoral scanning and same-day crowns mean faster, more comfortable, more accurate dentistry.',
    bullets: [
      b('Low-radiation digital X-rays'),
      b('Same-day CEREC crowns'),
      b('3D scans — no goopy molds'),
      b('Photo-backed findings you can see'),
    ],
    stat: '1 visit',
    statLabel: 'for most crowns, start to finish',
  },
  {
    label: 'Pricing',
    icon: 'Wallet',
    title: 'Transparent, upfront pricing',
    body: 'Clear estimates before we begin, most PPO insurance accepted and filed for you, and flexible financing.',
    bullets: [
      b('Written estimates up front'),
      b('Most PPO plans accepted & filed'),
      b('0% financing available'),
      b('In-house membership plan'),
    ],
    stat: '0%',
    statLabel: 'financing options available',
  },
  {
    label: 'Honesty',
    icon: 'ShieldCheck',
    title: 'Honest advice, never pushy',
    body: 'We show you photos of exactly what we see, explain your options, and let you decide — no pressure, ever.',
    bullets: [
      b('Photo-documented diagnoses'),
      b('Only the treatment you need'),
      b('Second-opinion friendly'),
      b('15+ years caring for Chicago'),
    ],
    stat: '20k+',
    statLabel: 'smiles cared for since opening',
  },
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
    // Reduced homepage — only the sections kept in the CMS (old sections removed).
    layout: [
      hero(),
      statsBlock(),
      servicesBentoBlock(),
      pillarsBlock(),
      // Latest smile-gallery before/after cases (sliders) + view-all, under the pillars/marquee.
      galleryPreview(),
      imageBand(),
      dentistFeature(),
      reviewsBlock({
        limit: 6,
        heading: 'Real patient stories',
        eyebrow: 'Reviews',
        paddingTop: 'sm',
        paddingBottom: 'sm',
      }),
      // Latest blog posts — two square image cards under the reviews (tight top gap).
      latestPosts({ paddingTop: 'sm' }),
      // Roadmap + FAQ grouped in one shared white rounded inset panel (Maven-style).
      panel([
        timeline({ eyebrow: 'How it works', heading: 'Your first visit, *made easy*', items: firstVisitTimeline }),
        faqBlock({ limit: 6 }),
      ]),
      // Emergency CTA stays its own section, directly below the panel.
      emergency(),
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
      // Merged from the former standalone /team page — the full team grid.
      teamGrid({ background: 'muted' }),
      // Merged from the former standalone /reviews page — spotlight quote + reviews carousel.
      featuredQuote,
      reviewsBlock(),
      faqBlock({ category: 'General' }),
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
/**
 * Non-destructive by default: collections and blog posts are only seeded when EMPTY,
 * so re-running never wipes content/photos you've added or edited in the admin. Pass
 * `{ force: true }` (via /dental-seed?key=…&force=1) to wipe and re-create everything
 * from the placeholder data — use only when you really want a clean reset.
 */
export async function dentalSeed(payload: Payload, opts: { force?: boolean } = {}): Promise<void> {
  const force = !!opts.force
  const log = (m: string) => payload.logger.info(`[dentalSeed] ${m}`)
  log(force ? 'Mode: FORCE (full reset).' : 'Mode: safe (existing content preserved).')

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
        // About is now a single consolidated page (team + reviews merged in) — no dropdown.
        { link: { type: 'custom', url: '/about', label: 'About' } },
        {
          // The Services dropdown children are populated dynamically from the Services
          // collection at render time (see getHeaderNav → withDynamicServices). This
          // seeded child is just a fallback if that query ever fails.
          link: { type: 'custom', url: '/services', label: 'Services' },
          children: [
            { link: { type: 'custom', url: '/services', label: 'All Services' }, description: 'Browse every treatment' },
          ],
        },
        { link: { type: 'custom', url: '/smile-gallery', label: 'Smile Gallery' } },
        { link: { type: 'custom', url: '/new-patients', label: 'New Patients' } },
        { link: { type: 'custom', url: '/posts', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    } as never,
  })

  // 3. Collections — non-destructive: only seed a collection when it's empty (or when
  //    forced), so re-running never deletes content/photos you've added in the admin.
  const seedCollection = async (
    slug: 'services' | 'team' | 'testimonials' | 'faqs' | 'gallery-cases',
    createFn: () => Promise<void>,
  ) => {
    const existing = (await payload.count({ collection: slug })).totalDocs
    if (existing > 0 && !force) {
      log(`${slug}: ${existing} docs already present — skipped (your content is preserved).`)
      return
    }
    if (force && existing > 0) await payload.delete({ collection: slug, where: {} })
    await createFn()
  }

  await seedCollection('services', async () => {
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
  })

  await seedCollection('team', async () => {
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
  })

  await seedCollection('testimonials', async () => {
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
  })

  await seedCollection('faqs', async () => {
    log('FAQs…')
    for (const f of faqs) {
      await payload.create({
        collection: 'faqs',
        data: { question: f.question, answer: f.answer, category: f.category } as never,
      })
    }
  })

  await seedCollection('gallery-cases', async () => {
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
  })

  // Service ids for the homepage bento — whether just seeded or already present.
  const serviceIds = (
    await payload.find({ collection: 'services', limit: 100, depth: 0, sort: 'createdAt' })
  ).docs.map((d) => String(d.id))

  // Fill the homepage ServicesBento tiles now that service ids exist — a couple
  // sized large for bento rhythm (tile 0 wide, tile 4 tall). Editable in admin.
  const homeForBento = (
    pages as unknown as Array<{ slug: string; layout: Array<Record<string, unknown>> }>
  ).find((pg) => pg.slug === 'home')
  const bentoBlock = homeForBento?.layout.find((bl) => bl.blockType === 'servicesBentoBlock')
  if (bentoBlock) {
    bentoBlock.tiles = serviceIds.map((id, i) => ({
      service: id,
      size: i === 0 ? 'wide' : i === 4 ? 'tall' : 'normal',
    }))
  }

  // 4. Pages — clear the ones we manage, then create from blocks
  log('Pages…')
  // Retired pages — content merged into /about. Delete any leftover docs so they
  // don't linger in the DB (redirects in redirects.ts send /team & /reviews → /about).
  const retiredSlugs = ['team', 'reviews']
  for (const slug of retiredSlugs) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } } })
  }
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

  // 5. Blog — categories + SEO posts (non-destructive unless forced)
  await seedBlog(payload, { force })

  log('Done ✅')
}
