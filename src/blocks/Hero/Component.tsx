import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { getSiteData } from '@/lib/getSiteSettings'
import { resolveHref } from '@/lib/nav'
import { practice } from '@/lib/practice'
import { stockPhotos } from '@/lib/stockImages'
import { HeroIntro } from './HeroIntro'

type MediaLike = { url?: string | null } | string | number | null | undefined

const mediaUrl = (m: MediaLike): string | undefined =>
  m && typeof m === 'object' && 'url' in m && m.url ? m.url : undefined

/**
 * Hero block — server component. Resolves all CMS-driven content (media, links,
 * rating) and hands it to the client <HeroIntro>, which renders the hero AND its
 * load-in animation. The animated media is the hero's real media (no duplicate);
 * everything stays editable in Payload.
 */
export const HeroBlock: React.FC<HeroBlockProps> = async ({
  mediaType,
  image,
  video,
  heading,
  showRating,
  ratingText,
  links,
  card,
}) => {
  const site = await getSiteData()
  const imageUrl = mediaUrl(image as MediaLike) || stockPhotos.reception
  const videoUrl = mediaUrl(video as MediaLike) || null
  const showVideo = mediaType === 'video' && !!videoUrl

  // Single phone CTA — prefer the CMS tel: link, fall back to the practice phone.
  const call = (links || []).find((l) => /^tel:/i.test(l?.link?.url || ''))
  const callHref = call?.link ? resolveHref(call.link) : practice.phoneHref
  const callLabel = call?.link?.label || `Call ${practice.phone}`
  const callVariant =
    (call?.link as { appearance?: 'white' | 'outlineWhite' } | undefined)?.appearance || 'white'

  const cardMediaUrl = mediaUrl(card?.media as MediaLike)
  const showCard = card?.enabled !== false && !!(card?.title || cardMediaUrl)

  return (
    <HeroIntro
      imageUrl={imageUrl}
      videoUrl={videoUrl}
      showVideo={showVideo}
      introName={practice.name}
      heading={heading}
      showRating={showRating}
      ratingText={ratingText}
      callHref={callHref}
      callLabel={callLabel}
      callVariant={callVariant}
      logoLight={site.logo.lightUrl}
      logoDark={site.logo.darkUrl}
      logoAlt={site.logo.alt}
      card={showCard ? { mediaUrl: cardMediaUrl, title: card?.title, text: card?.text } : null}
    />
  )
}
