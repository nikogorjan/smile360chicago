import { getPayload } from 'payload'
import config from '@payload-config'

const run = async () => {
  const payload = await getPayload({ config })
  const pages = await payload.find({ collection: 'pages', limit: 100, depth: 0 })
  const services = await payload.count({ collection: 'services' })
  const team = await payload.count({ collection: 'team' })
  const faqs = await payload.count({ collection: 'faqs' })
  const reviews = await payload.count({ collection: 'testimonials' })
  const gallery = await payload.count({ collection: 'gallery-cases' })
   
  console.log(
    JSON.stringify(
      {
        pages: pages.docs.map((p) => ({ slug: p.slug, status: (p as { _status?: string })._status, blocks: (p.layout || []).length })),
        services: services.totalDocs,
        team: team.totalDocs,
        faqs: faqs.totalDocs,
        reviews: reviews.totalDocs,
        gallery: gallery.totalDocs,
      },
      null,
      2,
    ),
  )
  process.exit(0)
}

run().catch((e) => {
   
  console.error('VERIFY ERROR:', e)
  process.exit(1)
})
