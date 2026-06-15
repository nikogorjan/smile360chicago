import React from 'react'

import type { GalleryGridBlock as Props } from '@/payload-types'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { getGalleryCases } from '@/lib/queries'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GalleryGridBlock: React.FC<Props> = async (_props) => {
  const cases = await getGalleryCases()
  return <GalleryGrid cases={cases} />
}
