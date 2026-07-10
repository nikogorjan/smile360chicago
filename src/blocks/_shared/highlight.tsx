import React from 'react'

/**
 * Renders `text` with an optional `phrase` accented in cobalt (the client reserves
 * gold for rating stars, so accent words use `text-brand`). Strips the site's
 * asterisk emphasis markers — no italics, per brand. Case-insensitive match on the
 * first occurrence; falls back to plain text when the phrase isn't found.
 */
export function withHighlight(
  text?: string | null,
  phrase?: string | null,
  className = 'text-brand',
): React.ReactNode {
  if (!text) return null
  const clean = text.replace(/\*/g, '')
  if (!phrase) return clean

  const idx = clean.toLowerCase().indexOf(phrase.toLowerCase())
  if (idx === -1) return clean

  return (
    <>
      {clean.slice(0, idx)}
      <span className={className}>{clean.slice(idx, idx + phrase.length)}</span>
      {clean.slice(idx + phrase.length)}
    </>
  )
}
