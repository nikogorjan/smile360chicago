import type { Payload } from 'payload'

import { lexical, type Node } from './lexical'

type PostSpec = {
  slug: string
  title: string
  category: string
  excerpt: string
  metaTitle: string
  daysAgo: number
  body: Node[]
}

const categories = [
  'Emergency Care',
  'Preventive Care',
  'Cosmetic Dentistry',
  'Orthodontics',
  'Patient Tips',
]

const posts: PostSpec[] = [
  {
    slug: 'toothache-causes-and-fast-relief',
    title: 'Tooth Ache? Here’s What’s Causing It and How to Get Relief Fast',
    category: 'Emergency Care',
    excerpt:
      'A throbbing toothache is your body’s way of saying something’s wrong. Here are the most common causes of tooth pain, what you can do for relief right now, and when to see an emergency dentist in Chicago.',
    metaTitle: 'Toothache Causes & Fast Relief | Emergency Dentist Chicago',
    daysAgo: 2,
    body: [
      { p: 'A toothache has a way of taking over your whole day. Whether it’s a dull, constant ache or a sharp jolt when you bite down, tooth pain is almost always a signal that something needs attention — and it rarely gets better on its own. The good news: most causes are very treatable, and fast relief is usually one appointment away.' },
      { h2: 'What causes a toothache?' },
      { p: 'Tooth pain can come from inside the tooth, the gums around it, or even from issues that have nothing to do with a cavity. The most common culprits we see in Chicago patients are:' },
      {
        ul: [
          'Tooth decay (cavities) that have reached the sensitive inner layers of the tooth',
          'A cracked, chipped, or broken tooth exposing the nerve',
          'A dental infection or abscess — often with swelling and a bad taste',
          'Gum disease or an irritated, receding gumline',
          'A lost or loose filling or crown leaving the tooth exposed',
          'Teeth grinding (bruxism) that strains teeth and jaw muscles',
          'Wisdom teeth pushing against neighboring teeth',
        ],
      },
      { h2: 'How to relieve a toothache right now' },
      { p: 'These steps can ease the pain on your way to the dentist — but they’re temporary fixes, not cures:' },
      {
        ol: [
          'Rinse gently with warm salt water to clean the area and reduce inflammation',
          'Floss carefully to remove any trapped food that may be causing pressure',
          'Take an over-the-counter pain reliever (such as ibuprofen) as directed',
          'Apply a cold compress to the outside of your cheek for swelling',
          'Avoid very hot, cold, sugary, or hard foods until you’re seen',
        ],
      },
      { p: 'A word of caution: never place aspirin directly on the gum or tooth — it can burn the tissue. And resist the urge to “wait it out.” Pain that fades can mean the nerve has died while an infection quietly spreads.' },
      { h2: 'When is a toothache a dental emergency?' },
      { p: 'Call a dentist the same day if you have any of these warning signs:' },
      {
        ul: [
          'Severe or throbbing pain that won’t go away',
          'Swelling in your face, jaw, or gums',
          'Fever, or a bad taste that won’t clear',
          'Pain when biting, or sensitivity that lingers',
          'A knocked-out, cracked, or broken tooth',
        ],
      },
      { p: 'Swelling and fever in particular can signal a spreading infection that needs prompt care — don’t wait for the next available routine slot.' },
      { h2: 'How a dentist fixes the real problem' },
      { p: 'Relief at home only masks the cause. Depending on what’s going on, treatment might be a simple filling, a same-day crown, root canal therapy to save an infected tooth, treatment for gum disease, or an extraction as a last resort. A quick exam and digital X-ray tell us exactly what’s happening so you get the right fix the first time.' },
      { h2: 'Don’t tough it out — we’ll see you today' },
      { p: 'At Smile360 Chicago, we keep same-day emergency appointments open every day we’re open. If you’re in pain, call us and we’ll get you comfortable fast — gently, and without judgment. Got a toothache? Just come to us.' },
    ],
  },
  {
    slug: 'knocked-out-tooth-what-to-do',
    title: 'Knocked-Out Tooth? Do These 5 Things in the First Hour',
    category: 'Emergency Care',
    excerpt:
      'A knocked-out (avulsed) tooth can often be saved — but only if you act fast. Here’s exactly what to do in the critical first hour to give your tooth the best chance.',
    metaTitle: 'Knocked-Out Tooth: First-Hour Steps | Smile360 Chicago',
    daysAgo: 9,
    body: [
      { p: 'A knocked-out permanent tooth is one of the few true dental emergencies where minutes matter. With quick, correct action, there’s a real chance your dentist can re-implant it. Here’s what to do.' },
      { h2: 'The first hour is everything' },
      {
        ol: [
          'Pick the tooth up by the crown (the white part) — never touch the root',
          'If it’s dirty, rinse it gently with milk or saline for a few seconds (don’t scrub)',
          'Try to place it back in the socket and bite down gently on a clean cloth',
          'If you can’t reinsert it, keep it moist in milk (or inside your cheek) — never water',
          'Get to a dentist immediately, ideally within 30–60 minutes',
        ],
      },
      { h2: 'What not to do' },
      {
        ul: [
          'Don’t let the tooth dry out — a dry tooth is much harder to save',
          'Don’t scrub the root or remove any attached tissue',
          'Don’t store it in plain water, which damages the root cells',
          'Don’t wait to “see how it feels” — time is the deciding factor',
        ],
      },
      { h2: 'What about a baby tooth?' },
      { p: 'A knocked-out baby tooth should not be reinserted, as it can damage the developing permanent tooth underneath. Still call us — we’ll check the area and make sure everything is healthy.' },
      { h2: 'We’re ready when you need us' },
      { p: 'Save our number before you ever need it. If a tooth gets knocked out, call Smile360 Chicago right away — we keep emergency slots open and will talk you through it on the phone while you head over.' },
    ],
  },
  {
    slug: 'how-often-should-you-go-to-the-dentist',
    title: 'How Often Should You Really Go to the Dentist?',
    category: 'Preventive Care',
    excerpt:
      'Twice a year is the rule of thumb — but the right schedule depends on you. Here’s how to know how often you should visit the dentist, and why those checkups save you money and pain.',
    metaTitle: 'How Often Should You Visit the Dentist? | Smile360 Chicago',
    daysAgo: 16,
    body: [
      { p: 'You’ve heard “twice a year” your whole life — but is it actually right for everyone? Here’s what the every-six-months guideline really means and how to find your ideal schedule.' },
      { h2: 'The twice-a-year rule (and why it exists)' },
      { p: 'For most healthy adults, a cleaning and checkup every six months catches small problems — a tiny cavity, early gum inflammation — while they’re cheap and painless to fix. Skip them, and those small issues quietly grow into root canals, crowns, and bigger bills.' },
      { h2: 'When you might need to come more often' },
      {
        ul: [
          'You have gum disease or a history of frequent cavities',
          'You’re pregnant (hormones can affect your gums)',
          'You smoke or use tobacco',
          'You have diabetes or another condition that affects healing',
          'You wear braces or aligners',
        ],
      },
      { h2: 'What actually happens at a checkup' },
      { p: 'A typical visit includes a professional cleaning to remove plaque and tartar you can’t reach at home, digital X-rays as needed, an oral cancer screening, and a friendly review of your home-care routine. It’s fast, comfortable, and the single best investment in your long-term smile.' },
      { h2: 'Due for a visit?' },
      { p: 'If it’s been more than six months — or you can’t remember your last cleaning — we’d love to see you. New patients are always welcome at Smile360 Chicago.' },
    ],
  },
  {
    slug: 'professional-vs-at-home-teeth-whitening',
    title: 'Professional vs. At-Home Teeth Whitening: What Actually Works?',
    category: 'Cosmetic Dentistry',
    excerpt:
      'Whitening strips, toothpastes, trendy gadgets, or a professional treatment — which one really brightens your smile? Here’s an honest breakdown from a Chicago dentist.',
    metaTitle: 'Professional vs. At-Home Teeth Whitening | Smile360 Chicago',
    daysAgo: 24,
    body: [
      { p: 'A brighter smile is the most-requested cosmetic upgrade we hear about — but the whitening aisle is overwhelming and the results are all over the map. Here’s what works, what doesn’t, and what’s safe.' },
      { h2: 'Store-bought whitening' },
      { p: 'Whitening toothpastes mostly remove surface stains and won’t change your tooth’s underlying shade. Strips and trays can lighten teeth a few shades, but results are slow, uneven around fillings or crowns, and can cause sensitivity if overused.' },
      { h2: 'Professional in-office whitening' },
      { p: 'In-office whitening uses a higher-strength, dentist-supervised gel to lift stains from inside the enamel — often several shades in about an hour, evenly and safely. We protect your gums throughout, so sensitivity is minimized.' },
      { h2: 'Which is right for you?' },
      {
        ul: [
          'Want fast, dramatic, even results: professional in-office whitening',
          'Prefer to whiten gradually at home: a custom take-home tray from your dentist',
          'Just fighting daily coffee stains: a whitening toothpaste can help maintain results',
        ],
      },
      { h2: 'A quick safety note' },
      { p: 'Whitening won’t change the color of crowns, veneers, or fillings, and it’s best done on a healthy mouth. A quick check first ensures you get great results without surprises.' },
      { h2: 'Ready to brighten up?' },
      { p: 'Ask us about single-visit professional whitening or a custom take-home kit. We’ll recommend the option that fits your smile and budget.' },
    ],
  },
  {
    slug: 'is-invisalign-right-for-you',
    title: 'Is Invisalign Right for You? A Complete Guide',
    category: 'Orthodontics',
    excerpt:
      'Clear aligners can straighten your smile without metal braces — but they’re not for every case. Here’s how Invisalign works, what it treats, and how to know if it’s a fit.',
    metaTitle: 'Is Invisalign Right for You? Complete Guide | Smile360 Chicago',
    daysAgo: 31,
    body: [
      { p: 'Invisalign has made straightening your teeth far more discreet and convenient than the metal braces of the past. But is it right for your smile? Here’s an honest guide.' },
      { h2: 'How Invisalign works' },
      { p: 'You wear a series of clear, custom-made aligners that gently shift your teeth a little at a time. Each set is worn for about one to two weeks, and you switch to the next in the series. Because they’re removable, you take them out to eat, brush, and floss.' },
      { h2: 'What Invisalign can treat' },
      {
        ul: [
          'Crowded or overlapping teeth',
          'Gaps and spacing between teeth',
          'Many overbite, underbite, and crossbite cases',
          'Mild relapse after previous braces',
        ],
      },
      { h2: 'The benefits' },
      {
        ul: [
          'Nearly invisible — most people won’t notice them',
          'Removable, so no food restrictions',
          'Easier to keep your teeth clean than with braces',
          'Often fewer office visits',
        ],
      },
      { h2: 'Is it a fit for you?' },
      { p: 'Invisalign works best when you’re committed to wearing the aligners 20–22 hours a day. Very complex bite issues may still be better treated another way — which is exactly what a consultation determines.' },
      { h2: 'See your new smile before you start' },
      { p: 'Book a free Invisalign consultation and we’ll show you a 3D preview of your projected results, plus flexible monthly payment options.' },
    ],
  },
  {
    slug: 'overcoming-dental-anxiety',
    title: 'Dental Anxiety? 7 Ways We Make Visits Stress-Free',
    category: 'Patient Tips',
    excerpt:
      'If the dentist makes you nervous, you’re far from alone — and you don’t have to white-knuckle it. Here are seven ways we help anxious patients feel calm and in control.',
    metaTitle: 'Overcoming Dental Anxiety: 7 Tips | Smile360 Chicago',
    daysAgo: 38,
    body: [
      { p: 'Dental anxiety is incredibly common, and avoiding the dentist because of it usually makes things worse over time. The good news: a calm, modern practice can completely change the experience. Here’s how we help.' },
      { h2: '1. We listen first' },
      { p: 'Tell us what worries you. When we understand your fears, we can go at your pace and explain everything before we do it — no surprises.' },
      { h2: '2. A signal that means “stop”' },
      { p: 'You’re always in control. Agree on a simple hand signal and we’ll pause anytime you need a break.' },
      { h2: '3. Gentle, modern technology' },
      { p: 'Quieter tools, digital X-rays, and precise techniques mean less discomfort and shorter visits than you may remember.' },
      { h2: '4. Sedation options' },
      { p: 'From calming techniques to sedation for more involved treatment, we have options to keep you relaxed.' },
      { h2: '5. Comfort amenities' },
      { p: 'Noise-canceling headphones, blankets, and a warm, spa-like space help take the edge off.' },
      { h2: '6. No lectures, ever' },
      { p: 'We’re here to help, not to shame. Wherever your smile is today, we start from there.' },
      { h2: '7. Small steps' },
      { p: 'Nervous patients often start with a simple cleaning to build trust. There’s no rush — every visit gets easier.' },
      { h2: 'Let’s make this easy' },
      { p: 'If anxiety has kept you away, tell us when you book — we’ll plan your visit around your comfort. You’re in good hands at Smile360 Chicago.' },
    ],
  },
]

export async function seedBlog(payload: Payload, opts: { force?: boolean } = {}): Promise<void> {
  const log = (m: string) => payload.logger.info(`[blogSeed] ${m}`)
  const force = !!opts.force

  // Non-destructive: if posts already exist, leave them (and their images) alone.
  const existing = (await payload.count({ collection: 'posts' })).totalDocs
  if (existing > 0 && !force) {
    log(`posts: ${existing} already present — skipped (your posts & images are preserved).`)
    return
  }

  // author = first user (the admin)
  const users = await payload.find({ collection: 'users', limit: 1, depth: 0 })
  const author = users.docs[0]

  // Full reset only when forced (otherwise we got here because there were no posts yet).
  if (force) {
    await payload.delete({ collection: 'posts', where: {} })
    await payload.delete({ collection: 'categories', where: {} })
  }

  // categories
  log('Categories…')
  const catId: Record<string, number | string> = {}
  for (const title of categories) {
    const c = await payload.create({ collection: 'categories', data: { title } as never })
    catId[title] = c.id
  }

  // posts
  log('Posts…')
  const now = Date.now()
  for (const p of posts) {
    await payload.create({
      collection: 'posts',
      data: {
        title: p.title,
        slug: p.slug,
        generateSlug: false,
        _status: 'published',
        publishedAt: new Date(now - p.daysAgo * 86400000).toISOString(),
        authors: author ? [author.id] : [],
        categories: [catId[p.category]],
        content: lexical(p.body),
        meta: { title: p.metaTitle, description: p.excerpt },
      } as never,
    })
  }

  log('Blog done ✅')
}
