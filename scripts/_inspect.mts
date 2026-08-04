import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
require('@next/env').loadEnvConfig(process.cwd(), true)

const { getPayload } = await import('payload')
const configModule = await import('@payload-config')
const payload = await getPayload({ config: configModule.default })

const dbName = (payload.db as any)?.connection?.name || '(unknown)'
console.log('DB name:', dbName)

const svc = await payload.find({ collection: 'services', depth: 0, limit: 50, sort: 'createdAt' })
console.log('\nservices (' + svc.totalDocs + ') in createdAt order:')
for (const s of svc.docs) console.log('  ' + String(s.id) + '  ' + (s as any).name + '  (' + (s as any).slug + ')')

const pages = await payload.find({ collection: 'pages', depth: 0, limit: 20 })
console.log('\npages:', pages.docs.map((p: any) => p.slug + '[' + p._status + ']').join(', '))

const home: any = pages.docs.find((p: any) => p.slug === 'home')
const bento = home?.layout?.find((b: any) => b.blockType === 'servicesBentoBlock')
if (bento) {
  console.log('\nhomepage bento tiles order (service ids):')
  for (const t of bento.tiles || []) console.log('  ' + String(t.service) + '  size=' + t.size)
} else console.log('\nno servicesBentoBlock on home')

process.exit(0)
