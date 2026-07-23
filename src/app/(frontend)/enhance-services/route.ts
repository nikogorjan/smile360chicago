import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

/**
 * One-shot dev route: GET /enhance-services?key=smile360blocks
 *
 * Inserts Callout / Key Takeaways / Pull Quote / Media blocks into each service body,
 * around the existing copy (never replacing it). Idempotent — a block is only added if an
 * equivalent one isn't already present, so re-running is safe.
 *
 * DELETE THIS ROUTE after running.
 */

type Node = Record<string, unknown>

const kt = (title: string, items: string[]): Node => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { blockType: 'keyTakeawaysBlock', title, items: items.map((text) => ({ text })) },
})
const callout = (variant: string, body: string, title?: string): Node => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { blockType: 'calloutBlock', variant, body, ...(title ? { title } : {}) },
})
const quote = (q: string, attribution: string): Node => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { blockType: 'pullQuoteBlock', quote: q, attribution },
})
const media = (id: string): Node => ({
  type: 'block',
  version: 2,
  format: '',
  fields: { blockType: 'mediaBlock', media: id },
})

const SALAM = 'Dr. Mustafa Salam'

/** media IDs mapped earlier */
const IMG = {
  kids: '6a57bb4c7326dbdd925d73e5',
  root: '6a57c4fb7326dbdd925d80c9',
  crowns: '6a57bbbd7326dbdd925d7498',
  implants: '6a5d32cbacc232b80e8a9c85',
  suresmile: '6a57bc2b7326dbdd925d750e',
  cleanings: '6a57c0d87326dbdd925d7d0f',
}

type Insertion = { anchor: string | 'AFTER_FIRST_P'; node: Node }

/** Per-service insertions. `anchor` = heading text to place the block BEFORE (so it sits at the
 *  end of the preceding section), or AFTER_FIRST_P to place it right after the intro paragraph. */
const PLAN: Record<string, Insertion[]> = {
  'kids-dentistry': [
    {
      anchor: 'AFTER_FIRST_P',
      node: kt('The short version', [
        'First visit by age one, or when the first tooth appears',
        'A gentle, fear-free approach kids actually enjoy',
        'Cleanings, fluoride, and sealants to prevent cavities',
        'One friendly practice for your whole family',
      ]),
    },
    {
      anchor: 'Gentle, fear-free visits',
      node: callout(
        'tip',
        'Bring your child along to one of your own checkups first. Seeing you relaxed in the chair makes their own first visit feel familiar instead of scary.',
      ),
    },
    { anchor: 'Preventive care for growing smiles', node: media(IMG.kids) },
    {
      anchor: 'One dentist for the whole family',
      node: quote('A calm first visit sets the tone for a lifetime of fearless dental care.', SALAM),
    },
  ],
  'root-canals': [
    {
      anchor: 'AFTER_FIRST_P',
      node: kt('In short', [
        'A root canal relieves your pain — it doesn’t cause it',
        'Often completed in a single visit',
        'Saves your natural tooth instead of removing it',
        'Same-day appointments when you’re in severe pain',
      ]),
    },
    {
      anchor: 'Does a root canal hurt',
      node: callout(
        'note',
        'Modern root canals feel much like a routine filling. With today’s anesthetics, most patients are comfortable the whole time and surprised by how easy it was.',
      ),
    },
    { anchor: 'What to expect', node: media(IMG.root) },
    {
      anchor: 'Gentle, tooth-saving care',
      node: quote(
        'Saving your own tooth is almost always better than replacing it — and a root canal is how we do it.',
        SALAM,
      ),
    },
  ],
  'crowns-bridges': [
    {
      anchor: 'AFTER_FIRST_P',
      node: kt('At a glance', [
        'Crowns rebuild a damaged tooth; bridges replace a missing one',
        'Same-day crowns, made and fitted in a single visit',
        'Colour-matched to blend with your natural teeth',
        'Built to last for years with normal brushing and flossing',
      ]),
    },
    { anchor: 'Natural-looking, and built to last', node: media(IMG.crowns) },
    {
      anchor: 'Caring for your crown or bridge',
      node: callout(
        'tip',
        'Treat a crown like a natural tooth — brush and floss daily. If you grind your teeth at night, a simple nightguard protects your investment for years.',
      ),
    },
    {
      anchor: 'Gentle, precise care',
      node: quote(
        'A great crown is one nobody can spot — it just looks and feels like your own tooth.',
        SALAM,
      ),
    },
  ],
  implants: [
    {
      anchor: 'AFTER_FIRST_P',
      node: kt('In short', [
        'A permanent replacement that looks and works like a real tooth',
        'Replaces anything from a single tooth to a full arch',
        'Placed precisely with 3D-guided planning',
        'Cared for well, an implant can last a lifetime',
      ]),
    },
    { anchor: 'Precise, guided placement', node: media(IMG.implants) },
    {
      anchor: 'What to expect',
      node: callout(
        'note',
        'An implant protects the teeth around it. Unlike a bridge, it doesn’t rely on grinding down neighbouring teeth — and it keeps the jawbone stimulated so it stays strong.',
      ),
    },
    {
      anchor: 'Gentle, precise care',
      node: quote(
        'An implant is the closest thing modern dentistry has to giving you your natural tooth back.',
        SALAM,
      ),
    },
  ],
  suresmile: [
    {
      anchor: 'AFTER_FIRST_P',
      node: kt('The short version', [
        'Clear, removable aligners most people won’t even notice',
        'See your predicted result before you begin',
        'Straightens crowding, gaps, and bite problems',
        'Eat and brush normally — just take them out',
      ]),
    },
    { anchor: 'How it works', node: media(IMG.suresmile) },
    {
      anchor: 'How it works',
      node: callout(
        'tip',
        'Aligners work best worn 20–22 hours a day. Take them out only to eat, drink anything but water, and brush — then pop them straight back in.',
      ),
    },
    {
      anchor: 'Personal, honest care',
      node: quote(
        'The best part is showing patients their finished smile on day one — before they’ve worn a single aligner.',
        SALAM,
      ),
    },
  ],
  cleanings: [
    {
      anchor: 'AFTER_FIRST_P',
      node: kt('In short', [
        'A thorough cleaning, exam, and advice tailored to you',
        'Most people come in every six months',
        'Catches small problems before they get expensive',
        'Covered in full by most insurance plans',
      ]),
    },
    {
      anchor: 'How often should you come in',
      node: callout(
        'tip',
        'Two minutes of brushing twice a day plus one floss does most of the work between visits. A checkup every six months catches what brushing can’t.',
      ),
    },
    { anchor: 'Why regular visits matter', node: media(IMG.cleanings) },
    {
      anchor: 'Care for the whole family',
      node: quote(
        'The simplest way to avoid big dental bills is the least glamorous one: come in twice a year.',
        SALAM,
      ),
    },
  ],
  emergency: [
    {
      anchor: 'Severe toothache',
      node: callout(
        'tip',
        'For a knocked-out tooth, the first hour matters most. Milk keeps it alive on your way in — never let it dry out, and never scrub the root.',
      ),
    },
    {
      anchor: 'Gentle, judgment-free care when you need it most',
      node: quote(
        'I built Smile360 to take the fear out of the dental chair — and that matters most when you’re already hurting.',
        SALAM,
      ),
    },
  ],
}

const headingText = (n: Node): string => {
  if (n.type !== 'heading') return ''
  return ((n.children as { text?: string }[]) || []).map((c) => c.text || '').join('')
}

/** Detect an equivalent block already present, so re-runs don't duplicate. */
const alreadyHas = (children: Node[], node: Node): boolean => {
  const f = node.fields as Record<string, unknown>
  return children.some((c) => {
    if (c.type !== 'block') return false
    const cf = c.fields as Record<string, unknown>
    if (cf.blockType !== f.blockType) return false
    if (f.blockType === 'keyTakeawaysBlock') return cf.title === f.title
    if (f.blockType === 'calloutBlock') return cf.body === f.body
    if (f.blockType === 'pullQuoteBlock') return cf.quote === f.quote
    if (f.blockType === 'mediaBlock') return cf.media === f.media
    return false
  })
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  if (params.get('key') !== 'smile360blocks') {
    return NextResponse.json({ ok: false, error: 'Invalid key' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const report: Record<string, string> = {}

    for (const [slug, insertions] of Object.entries(PLAN)) {
      const res = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
        depth: 0,
        limit: 1,
      })
      const svc = res.docs[0]
      if (!svc) {
        report[slug] = 'NOT FOUND'
        continue
      }

      const children: Node[] = [...((svc.body as { root?: { children?: Node[] } })?.root?.children || [])]
      const firstPIdx = children.findIndex((c) => c.type === 'paragraph')

      // Give each block a fractional position against the ORIGINAL indices, so multiple
      // inserts land in a stable order regardless of how many shift the array.
      const placed: { pos: number; node: Node }[] = children.map((n, i) => ({ pos: i, node: n }))
      let added = 0
      let order = 0

      for (const ins of insertions) {
        if (alreadyHas(children, ins.node)) continue
        let pos: number
        if (ins.anchor === 'AFTER_FIRST_P') {
          pos = (firstPIdx < 0 ? 0 : firstPIdx) + 0.5
        } else {
          const hIdx = children.findIndex((c) => headingText(c).toLowerCase().includes(ins.anchor.toLowerCase()))
          if (hIdx < 0) continue // anchor not found — skip rather than guess
          pos = hIdx - 0.5
        }
        placed.push({ pos: pos + order * 0.001, node: ins.node })
        order++
        added++
      }

      if (!added) {
        report[slug] = 'already up to date'
        continue
      }

      const newChildren = placed.sort((a, b) => a.pos - b.pos).map((p) => p.node)
      const newBody = {
        ...(svc.body as object),
        root: { ...((svc.body as { root: object }).root), children: newChildren },
      }

      await payload.update({
        collection: 'services',
        id: svc.id,
        depth: 0,
        // @ts-expect-error lexical body shape is validated at runtime
        data: { body: newBody },
      })
      report[slug] = `+${added} blocks (now ${newChildren.length} nodes)`
    }

    return NextResponse.json({ ok: true, report })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
