import { getPayload } from 'payload'
import config from '@payload-config'

import { dentalSeed } from './dentalSeed'

const run = async () => {
  const payload = await getPayload({ config })
  await dentalSeed(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
