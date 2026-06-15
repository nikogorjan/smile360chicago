/**
 * Tiny helpers to build Payload Lexical rich-text from a concise spec, so blog
 * posts can be authored as arrays of {h2}/{p}/{ul} instead of raw node JSON.
 */

const txt = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const heading = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  tag,
  children: [txt(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [txt(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const list = (items: string[], ordered = false) => ({
  type: 'list',
  listType: ordered ? 'number' : 'bullet',
  start: 1,
  tag: ordered ? 'ol' : 'ul',
  children: items.map((t, i) => ({
    type: 'listitem',
    children: [txt(t)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    value: i + 1,
    version: 1,
  })),
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

export type Node =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }

export const lexical = (nodes: Node[]) => ({
  root: {
    type: 'root',
    children: nodes.map((n) => {
      if ('h2' in n) return heading(n.h2, 'h2')
      if ('h3' in n) return heading(n.h3, 'h3')
      if ('ul' in n) return list(n.ul, false)
      if ('ol' in n) return list(n.ol, true)
      return paragraph(n.p)
    }),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})
