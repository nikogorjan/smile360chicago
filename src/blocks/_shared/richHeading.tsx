import React from 'react'

type LexNode = {
  type?: string
  text?: string
  format?: number
  $?: { style?: string }
  children?: LexNode[]
}

/**
 * Renders a rich-text heading value INLINE, for use inside an <h1>/<h2>. Honors bold
 * and the "Brand blue" text style (TextStateFeature `style: 'brand'` from
 * defaultLexical) — cobalt on light surfaces, a soft white on an inverted (cobalt)
 * surface so the accent stays visible. Returns null when there's no text, so callers
 * can skip rendering the heading element entirely.
 */
export function renderRichHeading(data: unknown, invert = false): React.ReactNode | null {
  const root = (data as { root?: { children?: LexNode[] } })?.root
  if (!root?.children) return null

  const out: React.ReactNode[] = []
  root.children.forEach((block, bi) => {
    ;(block.children || []).forEach((n, i) => {
      if (n.type !== 'text' || !n.text) return
      let el: React.ReactNode = n.text
      if (n.format && n.format & 1) el = <strong>{el}</strong>
      if (n.$?.style === 'brand') {
        el = <span className={invert ? 'text-white/60' : 'text-brand'}>{el}</span>
      }
      out.push(<React.Fragment key={`${bi}-${i}`}>{el}</React.Fragment>)
    })
  })

  return out.length ? out : null
}
