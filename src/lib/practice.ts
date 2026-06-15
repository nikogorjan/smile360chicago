/**
 * Smile360 Chicago — single source of truth for practice data.
 *
 * Every marketing component reads from here so NAP, hours, services, etc. stay
 * consistent across the site, the footer, and the structured-data (schema.org)
 * output. These values are also mirrored in the Payload `Site Settings` global
 * so the client can edit them in the admin once content is finalized.
 *
 * NOTE: copy + imagery here are realistic placeholders (photography &
 * copywriting are add-ons per the proposal). Swap real content before launch.
 */

export const practice = {
  name: 'Smile360 Chicago',
  legalName: 'Smile360 Chicago Dental',
  tagline: 'Modern dentistry for the whole family',
  /** The client's signature line — also drives the emergency SEO angle. */
  emergencyTagline: 'Got a toothache? Just come to us.',
  description:
    'Smile360 Chicago is a modern, patient-first dental practice offering family, cosmetic, and same-day emergency dentistry in the heart of Chicago. Gentle care, transparent pricing, and a team that actually listens.',
  email: 'hello@smile360chicago.com',
  phone: '(312) 555-0360',
  phoneHref: 'tel:+13125550360',
  emergencyPhone: '(312) 555-0911',
  emergencyPhoneHref: 'tel:+13125550911',
  address: {
    street: '360 N Michigan Ave, Suite 1200',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    full: '360 N Michigan Ave, Suite 1200, Chicago, IL 60601',
  },
  geo: { lat: 41.8868, lng: -87.6245 },
  mapUrl: 'https://maps.google.com/?q=360+N+Michigan+Ave+Chicago+IL',
  mapEmbed:
    'https://www.google.com/maps?q=360+N+Michigan+Ave,+Chicago,+IL+60601&output=embed',
  url: 'https://smile360chicago.com',
  priceRange: '$$',
  social: {
    instagram: 'https://instagram.com/smile360chicago',
    facebook: 'https://facebook.com/smile360chicago',
    google: 'https://g.page/smile360chicago',
    tiktok: 'https://tiktok.com/@smile360chicago',
  },
  rating: { value: 4.9, count: 487 },
} as const

export type DayHours = { day: string; open: string; close: string; closed?: boolean }

export const hours: DayHours[] = [
  { day: 'Monday', open: '8:00 AM', close: '6:00 PM' },
  { day: 'Tuesday', open: '8:00 AM', close: '6:00 PM' },
  { day: 'Wednesday', open: '8:00 AM', close: '7:00 PM' },
  { day: 'Thursday', open: '8:00 AM', close: '7:00 PM' },
  { day: 'Friday', open: '8:00 AM', close: '4:00 PM' },
  { day: 'Saturday', open: '9:00 AM', close: '2:00 PM' },
  { day: 'Sunday', open: '', close: '', closed: true },
]

export type NavChild = { label: string; href: string; description?: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Practice', href: '/about', description: 'Our story, values & technology' },
      { label: 'Meet the Team', href: '/team', description: 'The dentists & hygienists' },
      { label: 'Patient Reviews', href: '/reviews', description: 'Real stories from real smiles' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services', description: 'Browse every treatment' },
      { label: 'Teeth Cleaning', href: '/services/cleanings', description: 'Preventive care & checkups' },
      { label: 'Teeth Whitening', href: '/services/whitening', description: 'Brighten in one visit' },
      { label: 'Invisalign®', href: '/services/invisalign', description: 'Clear, removable aligners' },
      { label: 'Dental Implants', href: '/services/implants', description: 'Permanent tooth replacement' },
      { label: 'Emergency Dentist', href: '/emergency-dentist', description: 'Same-day toothache relief' },
    ],
  },
  { label: 'Smile Gallery', href: '/smile-gallery' },
  { label: 'New Patients', href: '/new-patients' },
  { label: 'Blog', href: '/posts' },
  { label: 'Contact', href: '/contact' },
]

export type Service = {
  slug: string
  name: string
  /** lucide-react icon name */
  icon: string
  category: 'Preventive' | 'Cosmetic' | 'Restorative' | 'Orthodontics' | 'Emergency'
  excerpt: string
  from?: string
  highlights: string[]
  featured?: boolean
}

export const services: Service[] = [
  {
    slug: 'cleanings',
    name: 'Cleanings & Checkups',
    icon: 'Sparkles',
    category: 'Preventive',
    excerpt: 'Gentle hygiene visits and digital exams that keep small problems small.',
    from: '$99',
    highlights: ['Digital X-rays', 'Oral cancer screening', 'Personalized hygiene plan'],
    featured: true,
  },
  {
    slug: 'whitening',
    name: 'Teeth Whitening',
    icon: 'Sun',
    category: 'Cosmetic',
    excerpt: 'Professional in-office whitening — up to 8 shades brighter in a single visit.',
    from: '$299',
    highlights: ['In-office or take-home', 'Enamel-safe', 'Results in ~1 hour'],
    featured: true,
  },
  {
    slug: 'invisalign',
    name: 'Invisalign® Clear Aligners',
    icon: 'AlignHorizontalDistributeCenter',
    category: 'Orthodontics',
    excerpt: 'Straighten your smile invisibly — no metal brackets, fully removable.',
    from: '$3,500',
    highlights: ['Free 3D smile preview', 'Flexible monthly plans', 'Fewer office visits'],
    featured: true,
  },
  {
    slug: 'implants',
    name: 'Dental Implants',
    icon: 'Anchor',
    category: 'Restorative',
    excerpt: 'A permanent, natural-looking replacement for missing teeth.',
    from: '$1,800',
    highlights: ['Single & full-arch', 'Guided 3D placement', 'Lifetime-durable titanium'],
    featured: true,
  },
  {
    slug: 'veneers',
    name: 'Porcelain Veneers',
    icon: 'Gem',
    category: 'Cosmetic',
    excerpt: 'Custom porcelain shells that redesign your smile in as few as two visits.',
    from: '$950/tooth',
    highlights: ['Digital smile design', 'Stain-resistant', 'Natural translucency'],
  },
  {
    slug: 'crowns-bridges',
    name: 'Crowns & Bridges',
    icon: 'Crown',
    category: 'Restorative',
    excerpt: 'Restore damaged or missing teeth with same-day crown technology.',
    from: '$850',
    highlights: ['Same-day CEREC crowns', 'Tooth-colored', 'Precision-milled'],
  },
  {
    slug: 'root-canals',
    name: 'Root Canal Therapy',
    icon: 'Activity',
    category: 'Restorative',
    excerpt: 'Pain-free treatment that saves an infected tooth and ends the ache.',
    from: '$700',
    highlights: ['Gentle sedation options', 'Single-visit when possible', 'Saves your natural tooth'],
  },
  {
    slug: 'kids-dentistry',
    name: 'Children’s Dentistry',
    icon: 'Baby',
    category: 'Preventive',
    excerpt: 'Friendly, fear-free visits that build healthy habits for life.',
    from: '$89',
    highlights: ['Kid-friendly team', 'Sealants & fluoride', 'Fun, calm environment'],
  },
  {
    slug: 'emergency',
    name: 'Emergency Dentistry',
    icon: 'Siren',
    category: 'Emergency',
    excerpt: 'Same-day appointments for toothaches, chips, and dental trauma.',
    from: 'Same-day',
    highlights: ['Walk-ins welcome', 'Fast pain relief', 'Open 6 days a week'],
    featured: true,
  },
]

export type TeamMember = {
  name: string
  role: string
  credentials: string
  bio: string
  specialties: string[]
}

export const team: TeamMember[] = [
  {
    name: 'Dr. Mia Chen',
    role: 'Lead Dentist & Founder',
    credentials: 'DDS, FAGD',
    bio: 'With 15+ years creating confident smiles, Dr. Chen founded Smile360 on a simple belief: dentistry should feel calm, honest, and human.',
    specialties: ['Cosmetic Dentistry', 'Invisalign®', 'Implants'],
  },
  {
    name: 'Dr. Andre Williams',
    role: 'Restorative Dentist',
    credentials: 'DMD',
    bio: 'Dr. Williams specializes in same-day crowns and full-mouth restorations, blending technology with a gentle, unhurried touch.',
    specialties: ['Crowns & Bridges', 'Root Canals', 'Emergency Care'],
  },
  {
    name: 'Dr. Sofia Marquez',
    role: 'Family Dentist',
    credentials: 'DDS',
    bio: 'A favorite with kids and nervous patients alike, Dr. Marquez makes every visit feel easy from the first hello.',
    specialties: ['Children’s Dentistry', 'Preventive Care', 'Sedation'],
  },
  {
    name: 'Jasmine Patel',
    role: 'Lead Dental Hygienist',
    credentials: 'RDH',
    bio: 'Jasmine turns routine cleanings into the most relaxing part of your day — and coaches you to a healthier smile at home.',
    specialties: ['Hygiene', 'Periodontal Care', 'Patient Education'],
  },
]

export type Testimonial = {
  author: string
  rating: number
  quote: string
  treatment: string
  source: 'Google' | 'In-office'
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    author: 'Rachel M.',
    rating: 5,
    quote:
      'I cracked a tooth on a Saturday and they saw me within the hour. Zero pain, zero judgment. This is the only dentist I trust now.',
    treatment: 'Emergency Visit',
    source: 'Google',
    initials: 'RM',
  },
  {
    author: 'David K.',
    rating: 5,
    quote:
      'My Invisalign results are unreal. The 3D preview showed me the finish line on day one and they nailed it. Whole team is fantastic.',
    treatment: 'Invisalign®',
    source: 'Google',
    initials: 'DK',
  },
  {
    author: 'Priya S.',
    rating: 5,
    quote:
      'I’ve been terrified of dentists my whole life. Dr. Marquez completely changed that. Gentle, patient, and genuinely kind.',
    treatment: 'Family Checkup',
    source: 'Google',
    initials: 'PS',
  },
  {
    author: 'Marcus T.',
    rating: 5,
    quote:
      'Same-day crown, no second appointment, no temporary. Walked out the same afternoon. Incredible technology and people.',
    treatment: 'Same-Day Crown',
    source: 'In-office',
    initials: 'MT',
  },
  {
    author: 'Elena R.',
    rating: 5,
    quote:
      'Whitening took one visit and the difference is dramatic. Transparent pricing, no surprise fees. Highly recommend.',
    treatment: 'Teeth Whitening',
    source: 'Google',
    initials: 'ER',
  },
  {
    author: 'James W.',
    rating: 5,
    quote:
      'Finally a dental office that runs on time and explains everything. My whole family comes here now.',
    treatment: 'Family Dentistry',
    source: 'Google',
    initials: 'JW',
  },
]

export type GalleryCase = {
  title: string
  treatment: string
  description: string
}

export const galleryCases: GalleryCase[] = [
  { title: 'Single-visit whitening', treatment: 'Whitening', description: '6 shades brighter in one appointment.' },
  { title: 'Closed front gap', treatment: 'Invisalign', description: 'Clear aligners over 7 months.' },
  { title: 'Chipped tooth repair', treatment: 'Bonding', description: 'Same-day cosmetic bonding.' },
  { title: 'Full smile makeover', treatment: 'Veneers', description: '8 porcelain veneers, digitally designed.' },
  { title: 'Missing tooth restored', treatment: 'Implant', description: 'Single implant + crown.' },
  { title: 'Coffee-stain reversal', treatment: 'Whitening', description: 'Take-home professional whitening.' },
]

export type Faq = { question: string; answer: string; category: 'General' | 'Insurance' | 'Emergency' | 'Treatments' }

export const faqs: Faq[] = [
  {
    question: 'Do you take walk-ins or same-day emergency appointments?',
    answer:
      'Yes. If you’re in pain, call us and we’ll get you seen the same day whenever possible — we keep emergency slots open every day we’re open. Walk-ins are welcome during business hours.',
    category: 'Emergency',
  },
  {
    question: 'What should I do for a sudden toothache before I get there?',
    answer:
      'Rinse with warm salt water, gently floss to remove any trapped food, and take an over-the-counter pain reliever as directed. Avoid very hot or cold foods. Then call us — don’t wait for it to “pass.”',
    category: 'Emergency',
  },
  {
    question: 'What insurance do you accept?',
    answer:
      'We accept most major PPO dental plans and will file your claims for you. Not sure if you’re covered? Send us your plan details and we’ll verify your benefits before your visit — no surprises.',
    category: 'Insurance',
  },
  {
    question: 'No insurance? Do you offer payment plans?',
    answer:
      'Absolutely. We offer an in-house membership plan and flexible monthly financing (CareCredit and similar) so you can get the care you need without paying it all at once.',
    category: 'Insurance',
  },
  {
    question: 'Are you accepting new patients?',
    answer:
      'We’d love to meet you. New patients can book online or by phone, and our new-patient visit includes a full exam, digital X-rays, and a personalized plan.',
    category: 'General',
  },
  {
    question: 'I’m anxious about the dentist. Can you help?',
    answer:
      'You’re in the right place. Many of our patients used to dread dental visits. We offer sedation options, noise-canceling headphones, and a team trained to go at your pace.',
    category: 'General',
  },
  {
    question: 'How long does teeth whitening last?',
    answer:
      'Professional whitening typically lasts 1–3 years depending on your habits (coffee, tea, wine, smoking). We’ll give you a take-home kit and tips to keep it bright longer.',
    category: 'Treatments',
  },
  {
    question: 'Is Invisalign as effective as braces?',
    answer:
      'For most cases, yes. Invisalign treats crowding, gaps, and many bite issues — often faster and far more discreetly than metal braces. Book a free 3D preview to see your result.',
    category: 'Treatments',
  },
]

export const insurance: string[] = [
  'Delta Dental',
  'Cigna',
  'MetLife',
  'Aetna',
  'Guardian',
  'United Concordia',
  'BlueCross BlueShield',
  'Humana',
]

export type Stat = { value: string; label: string }

export const stats: Stat[] = [
  { value: '15+', label: 'Years caring for Chicago' },
  { value: '20k+', label: 'Smiles transformed' },
  { value: '4.9★', label: '487 Google reviews' },
  { value: 'Same-day', label: 'Emergency appointments' },
]

export const newPatientSteps = [
  {
    title: 'Book in 60 seconds',
    description: 'Request a time online or call us. We’ll confirm fast and verify your insurance for you.',
  },
  {
    title: 'Relax at your visit',
    description: 'Comfortable chairs, calming amenities, and a team that explains every step — no lectures.',
  },
  {
    title: 'Get a clear plan',
    description: 'Honest, photo-backed findings and transparent pricing. You decide what’s next, never pressured.',
  },
  {
    title: 'Smile with confidence',
    description: 'Ongoing care and reminders that keep your smile healthy for years to come.',
  },
]
