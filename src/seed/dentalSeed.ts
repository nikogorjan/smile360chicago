import type { Payload } from 'payload'

import {
  faqs,
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

/* ---------------------------------------------- new About-page block makers */
const aboutHero = () => ({
  blockType: 'aboutHeroBlock',
  eyebrow: 'About Smile360 Chicago',
  heading: 'Dentistry with a human touch',
  highlight: 'human touch',
  intro:
    'We built Smile360 Chicago to be the dental office we always wished existed — gentle, honest, modern, and genuinely on your side.',
  imageSide: 'right',
  ratingValue: 5,
  ratingLabel: `${practice.rating.value} from ${practice.rating.count}+ Google reviews`,
  chips: [
    { icon: 'CalendarCheck', label: '15+ years in Chicago' },
    { icon: 'Users', label: '20k+ smiles cared for' },
    { icon: 'Clock', label: 'Same-day emergencies' },
  ],
  links: [bookLink, customLink('/services', 'Explore services')],
  background: 'default',
})

const aboutStatement = () => ({
  blockType: 'statementBlock',
  eyebrow: 'Our mission',
  statement: 'Everyone deserves a dentist they actually look forward to seeing.',
  highlight: 'look forward to seeing',
  subline:
    'No rushing, no surprise bills, no judgment — just calm, modern care from a team that treats you like family.',
  attribution: 'Dr. Mustafa Salam — Founder & Lead Dentist',
  align: 'center',
  background: 'glow',
})

const founderStory = () => ({
  blockType: 'founderStoryBlock',
  imageSide: 'left',
  eyebrow: 'Our story',
  heading: 'Care that feels different from the first hello',
  highlight: 'first hello',
  body: 'Dr. Mustafa Salam founded Smile360 Chicago to bring gentle, judgment-free dentistry to the heart of the city — pairing modern technology with honest, up-front care.\n\nFrom routine checkups to full smile makeovers and same-day emergencies, he treats every patient like family — and built a practice where you always know exactly what’s happening, and why.',
  quote:
    'I became a dentist to take the fear out of the dental chair — when an anxious patient leaves smiling, that’s the best part of my day.',
  signature: 'Dr. Mustafa Salam',
  role: 'Founder & Lead Dentist · DMD',
  bullets: [
    b('Founded on comfort & honesty'),
    b('15+ years serving Chicago'),
    b('Thousands of happy families'),
    b('One calm roof for everyone'),
  ],
  links: [bookLink],
  background: 'default',
})

const valuesMosaic = () => ({
  blockType: 'mosaicBentoBlock',
  eyebrow: 'What we stand for',
  heading: 'The Smile360 difference',
  highlight: 'difference',
  description:
    'A few beliefs shape every visit — from your first hello to your brightest smile.',
  tiles: [
    { type: 'value', size: 'wide', tone: 'brand', icon: 'HeartHandshake', title: 'Genuinely gentle care', body: 'Anxious about the dentist? You’re our specialty — sedation options and a no-judgment team that moves at your pace.' },
    { type: 'photo', size: 'tall', label: 'Inside our practice' },
    { type: 'value', size: 'normal', tone: 'default', icon: 'MonitorSmartphone', title: 'Modern technology', body: 'Digital scans and same-day crowns — faster, clearer, more comfortable.' },
    { type: 'stat', size: 'normal', tone: 'glow', statValue: '20k+', statLabel: 'Chicago smiles cared for' },
    { type: 'value', size: 'normal', tone: 'default', icon: 'Wallet', title: 'Transparent pricing', body: 'Clear estimates up front. Most PPO insurance accepted and filed for you.' },
    { type: 'value', size: 'normal', tone: 'muted', icon: 'ShieldCheck', title: 'Honest, never pushy', body: 'Photo-backed findings, so you see exactly what we see — then you decide.' },
    { type: 'photo', size: 'wide', label: 'A calm, modern space' },
    { type: 'stat', size: 'normal', tone: 'brand', statValue: 'Same-day', statLabel: 'emergency care, every day we’re open' },
  ],
  background: 'default',
})

const aboutMetrics = () => ({
  blockType: 'metricRingsBlock',
  eyebrow: 'By the numbers',
  heading: 'Care Chicago keeps coming back to',
  highlight: 'coming back',
  description: 'Fifteen years of gentle, honest dentistry — and the trust that comes with it.',
  metrics: [
    { value: '15+', label: 'Years caring for Chicago', percent: 80 },
    { value: '20k+', label: 'Smiles transformed', percent: 90 },
    { value: '4.9★', label: `${practice.rating.count}+ Google reviews`, percent: 98 },
    { value: 'Same-day', label: 'Emergency appointments', percent: 100 },
  ],
  background: 'muted',
})

/* ------------------------------------ bespoke About-page block makers (v2) */
// Build a rich-text heading value; marks the `brand` phrase as "Brand blue" if present.
const rtHeading = (text: string, brand?: string) => {
  const children: Array<Record<string, unknown>> = []
  const idx = brand ? text.indexOf(brand) : -1
  if (brand && idx !== -1) {
    if (idx > 0) children.push(t(text.slice(0, idx)))
    children.push(t(brand, { $: { style: 'brand' } }))
    if (idx + brand.length < text.length) children.push(t(text.slice(idx + brand.length)))
  } else {
    children.push(t(text))
  }
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: [
        { type: 'paragraph', direction: 'ltr', format: '', indent: 0, version: 1, textFormat: 0, children },
      ],
    },
  }
}

const aboutMasthead = () => ({
  blockType: 'mastheadBlock',
  facts: [{ text: 'On Michigan Ave' }, { text: 'Est. 2009' }, { text: '4.9★ · 487 reviews' }],
  heading: rtHeading('The dentist Chicago actually looks forward to.', 'looks forward to'),
  lead: 'Smile360 began with a simple idea: a dental office should feel calm, honest, and genuinely on your side. Fifteen years later, that’s still the whole point.',
  caption: 'The Smile360 team',
})

const aboutFounderLetter = () => ({
  blockType: 'founderLetterBlock',
  eyebrow: 'A note from our founder',
  heading: rtHeading('Why I built Smile360'),
  body: 'When I started out, I kept meeting people who were quietly terrified of the dentist — not because of the work, but because of how they’d been treated. Rushed. Judged. Surprised by the bill.\n\nI set out to build the opposite: a place where you set the pace, where we show you photos of exactly what we see, and where the price you’re quoted is the price you pay — gentle, modern care from people who genuinely like their jobs.',
  quote: 'I became a dentist to take the fear out of the dental chair. When an anxious patient leaves smiling, that’s the best part of my day.',
  signature: 'Dr. Mustafa Salam',
  role: 'Founder & Lead Dentist · DMD',
  surface: 'panel',
})

const aboutValues = () => ({
  blockType: 'valuesIndexBlock',
  eyebrow: 'What we believe',
  heading: rtHeading('Five things we never compromise on', 'never compromise'),
  description: 'The principles behind every visit — from your first hello to your brightest smile.',
  items: [
    { icon: 'HeartHandshake', title: 'Gentle, judgment-free care', body: 'You set the pace. Sedation options, and a team trained for nervous patients.' },
    { icon: 'Eye', title: 'Show, don’t tell', body: 'Photo-backed findings so you see exactly what we see — then you decide.' },
    { icon: 'Wallet', title: 'Honest, up-front pricing', body: 'Written estimates before we begin. The quote is the price. Most PPO accepted.' },
    { icon: 'MonitorSmartphone', title: 'Modern, comfortable tech', body: 'Digital scans and same-day crowns — fewer visits, clearer answers.' },
    { icon: 'Clock', title: 'Here when it hurts', body: 'Same-day emergency slots held open every day we’re open.' },
  ],
  surface: 'canvas',
})

const aboutManifesto = () => ({
  blockType: 'manifestoBlock',
  eyebrow: 'Our promise',
  statement: rtHeading('We treat the person, not just the tooth.', 'the person'),
  footnote: 'Fifteen years, twenty thousand smiles, one belief: care should feel human.',
  surface: 'brand',
  paddingTop: 'lg',
  paddingBottom: 'lg',
})

const aboutCollage = () => ({
  blockType: 'photoCollageBlock',
  eyebrow: 'Inside Smile360',
  heading: rtHeading('A calm place to be', 'calm'),
  description: 'Bright rooms, friendly faces, and the little details that make a visit feel easy.',
  items: [
    { caption: 'Our Michigan Ave practice' },
    { caption: 'Reception' },
    { caption: 'A treatment room' },
    { caption: 'The team' },
    { caption: 'Same-day crown lab' },
  ],
  surface: 'canvas',
})

const aboutFirstVisit = () => ({
  blockType: 'firstVisitBlock',
  eyebrow: 'Your first visit',
  heading: rtHeading("Relax — we'll take it from here.", 'Relax'),
  intro:
    "From your first click to your finished plan, here's exactly what to expect — calm, unhurried, and completely pressure-free.",
  steps: [
    {
      icon: 'CalendarCheck',
      title: 'Book in about a minute',
      description: 'Book online or call us — new patients and same-day emergencies are always welcome.',
    },
    {
      icon: 'Coffee',
      title: 'Settle in',
      description: 'Arrive to a warm hello, fresh coffee, and quick paperwork. Come ten minutes early on your first visit.',
    },
    {
      icon: 'Stethoscope',
      title: 'A gentle, thorough exam',
      description: 'Digital X-rays and a careful look, then a clear, honest walk-through — in plain language, never rushed.',
    },
    {
      icon: 'HeartHandshake',
      title: 'A plan that fits you',
      description: "We map out your options and costs together, then you decide what's next. No pressure, ever.",
    },
  ],
  surface: 'panel',
})

const aboutInvitation = () => ({
  blockType: 'invitationBlock',
  eyebrow: 'Come say hi',
  heading: rtHeading('We saved you a seat.', 'a seat'),
  body: 'New patients and same-day emergencies are always welcome. Book online in under a minute, or just give us a call.',
  mapAddress: practice.address.full,
  details: [
    { icon: 'MapPin', label: 'Visit', value: practice.address.full },
    { icon: 'Clock', label: 'Hours', value: 'Mon–Thu 8–7 · Fri 8–4 · Sat 9–2' },
    { icon: 'Phone', label: 'Call', value: practice.phone },
  ],
  links: [bookLink, callLink],
  surface: 'panel',
  bottomGap: 'lg',
})

/* ------------------------------------------------ new-patients page blocks */
const newPatientHero = () => ({
  blockType: 'newPatientHeroBlock',
  eyebrow: 'New patients',
  heading: rtHeading('Welcome — you’re going to like it here.', 'like it here'),
  lead: 'From your first hello to your finished plan, we make being a new patient calm, clear, and refreshingly easy.',
  chips: [
    { icon: 'ShieldCheck', text: 'Most insurance accepted' },
    { icon: 'Clock', text: 'Same-day emergencies' },
    { icon: 'HeartHandshake', text: 'Judgment-free care' },
  ],
  links: [bookLink],
  surface: 'canvas',
})

const offerSpotlight = () => ({
  blockType: 'offerSpotlightBlock',
  eyebrow: 'New patient special',
  heading: rtHeading('Your first visit, made affordable.', 'affordable'),
  subline:
    'A new-patient exam, digital X-rays and a gentle cleaning — everything you need to get started on the right foot.',
  seal: 'New patients only',
  sealIcon: 'BadgePercent',
  finePrint:
    'For new patients without dental insurance. Cannot be combined with other offers. Call for full details.',
  links: [bookLink],
  // Sits flush under Get Ready as the wide bottom row of one bento — same muted
  // band, no top padding, so the gap to the cards above equals the column gap.
  surface: 'muted',
  paddingTop: 'none',
})

const getReady = () => ({
  blockType: 'getReadyBlock',
  eyebrow: 'Before you arrive',
  heading: rtHeading('A little prep, a smoother visit.', 'smoother visit'),
  intro: 'Two minutes now saves time in the chair later.',
  columns: [
    {
      icon: 'ClipboardList',
      title: 'Bring these along',
      items: [
        { text: 'Your photo ID and insurance card' },
        { text: 'A list of any medications you take' },
        { text: 'Recent dental X-rays, if you have them' },
        { text: 'Arrive about 10 minutes early' },
      ],
    },
    {
      icon: 'Laptop',
      title: 'Do this online',
      highlight: true,
      items: [
        { text: 'Complete your new-patient forms' },
        { text: 'Add your insurance details' },
        { text: 'Tell us about any dental anxiety' },
      ],
    },
  ],
  links: [customLink('/contact', 'Start your forms')],
  // Bottom padding trimmed to one column-gap (24px) so the offer card below reads
  // as the same bento's wide bottom row.
  surface: 'muted',
  paddingBottom: 'xs',
  bottomGap: 'none',
})

const affordability = () => ({
  blockType: 'affordabilityBlock',
  eyebrow: 'Insurance & payment',
  heading: rtHeading('Care that fits your budget.', 'fits your budget'),
  intro: 'No surprises, no pressure — just honest, upfront answers about cost.',
  points: [
    {
      icon: 'ShieldCheck',
      title: 'We file your insurance',
      body: 'We handle the paperwork and make the most of your benefits — you don’t lift a finger.',
    },
    {
      icon: 'CreditCard',
      title: 'Flexible financing',
      body: 'Spread treatment over time with low- and no-interest CareCredit plans.',
    },
    {
      icon: 'ReceiptText',
      title: 'No surprise bills',
      body: 'You’ll see the full cost and your options before we begin anything.',
    },
  ],
  insurersLabel: 'Accepting most major plans',
  insurers: [
    { text: 'Delta Dental' },
    { text: 'Cigna' },
    { text: 'MetLife' },
    { text: 'Aetna' },
    { text: 'Guardian' },
    { text: 'United Concordia' },
  ],
  links: [bookLink],
  surface: 'canvas',
})

const mapBand = () => ({ blockType: 'mapBandBlock', height: 'large' })

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
    // Bespoke editorial About page — distinct vocabulary from the homepage:
    // Masthead → Founder's Letter (white panel) → Values Index → Manifesto (cobalt
    // band) → Photo Collage → Invitation (white panel). Add photos in admin.
    layout: [
      aboutMasthead(),
      aboutFounderLetter(),
      aboutValues(),
      aboutManifesto(),
      aboutCollage(),
      aboutFirstVisit(),
      aboutInvitation(),
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
    slug: 'new-patients',
    title: 'New Patients',
    meta: {
      title: 'New Patients — Insurance & Financing',
      description:
        'New to Smile360 Chicago? See what to expect at your first visit, the insurance we accept, and flexible financing options.',
    },
    layout: [
      newPatientHero(),
      aboutFirstVisit(),
      getReady(),
      offerSpotlight(),
      affordability(),
      faqBlock(),
      aboutInvitation(),
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
      mapBand(),
      faqBlock(),
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
      faqBlock(),
      featuredQuote,
      emergency(),
      finalCta(),
    ],
  },
]

/* -------------------------------------------------------------------- runner */
/**
 * Non-destructive by default: pages are only CREATED when missing, and collections
 * and blog posts are only seeded when EMPTY — so re-running never wipes the blocks,
 * copy, or photos you've added or edited in the admin. Pass `{ force: true }` (via
 * /dental-seed?key=…&force=1) to wipe and re-create everything from the placeholder
 * data — use only when you really want a clean reset.
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
        { link: { type: 'custom', url: '/new-patients', label: 'New Patients' } },
        { link: { type: 'custom', url: '/posts', label: 'Blog' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    } as never,
  })

  // 3. Collections — non-destructive: only seed a collection when it's empty (or when
  //    forced), so re-running never deletes content/photos you've added in the admin.
  const seedCollection = async (
    slug: 'services' | 'team' | 'testimonials' | 'faqs',
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
        data: { question: f.question, answer: f.answer, isGeneral: f.isGeneral } as never,
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

  // 4. Pages — non-destructive by default: only CREATE a managed page when it's
  //    missing. Existing pages are left untouched, so re-running never wipes the
  //    blocks, copy, or images you've edited in the admin. `force` restores the
  //    clean-reset behaviour (wipe every managed page and rebuild from placeholders).
  log('Pages…')
  // Retired pages — always removed (content merged into /about; redirects send
  // /team & /reviews → /about).
  const retiredSlugs = ['team', 'reviews']
  for (const slug of retiredSlugs) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: slug } } })
  }
  for (const p of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      if (!force) {
        log(`${p.slug}: page exists — skipped (your edits & images preserved).`)
        continue
      }
      await payload.delete({ collection: 'pages', where: { slug: { equals: p.slug } } })
    }
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

/**
 * Seed ONLY the given page slug(s) — create-if-missing (or, with `force`, wipe and
 * recreate just those pages). Globals, collections and blog are left untouched, so
 * you can scaffold one page (e.g. About) without reseeding the whole site.
 * Powers `/dental-seed?key=…&only=about`.
 */
export async function seedPages(
  payload: Payload,
  slugs: string[],
  opts: { force?: boolean } = {},
): Promise<{ created: string[]; skipped: string[]; unknown: string[] }> {
  const force = !!opts.force
  const log = (m: string) => payload.logger.info(`[dentalSeed] ${m}`)
  const created: string[] = []
  const skipped: string[] = []
  const unknown: string[] = []

  for (const slug of slugs) {
    const def = pages.find((p) => p.slug === slug)
    if (!def) {
      unknown.push(slug)
      log(`only: no managed page named "${slug}" — skipped.`)
      continue
    }
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      if (!force) {
        skipped.push(slug)
        log(`${slug}: page exists — skipped (your edits & images preserved).`)
        continue
      }
      await payload.delete({ collection: 'pages', where: { slug: { equals: slug } } })
    }
    await payload.create({
      collection: 'pages',
      data: {
        title: def.title,
        slug: def.slug,
        generateSlug: false,
        _status: 'published',
        hero: { type: 'none' },
        layout: def.layout,
        meta: { title: def.meta.title, description: def.meta.description },
      } as never,
    })
    created.push(slug)
    log(`${slug}: ${force ? 'reset' : 'created'}.`)
  }

  return { created, skipped, unknown }
}
