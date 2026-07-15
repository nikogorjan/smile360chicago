/**
 * Section background tone → wrapper classes, shared by the section blocks.
 *
 * Every value is theme-aware (light + dark) because it maps to the CSS-var-backed
 * tokens defined for both themes in globals.css (--muted, --primary, --brand-soft).
 * `invert` tells the block to switch its text/CTA styles to the on-cobalt variants.
 */
export type SectionTone = 'default' | 'muted' | 'brand' | 'glow'

export function toneClasses(tone?: SectionTone | string | null): {
  wrapper: string
  invert: boolean
} {
  switch (tone) {
    case 'muted':
      return { wrapper: 'bg-muted', invert: false }
    case 'brand':
      return { wrapper: 'bg-primary text-primary-foreground', invert: true }
    case 'glow':
      return { wrapper: 'bg-brand-soft', invert: false }
    default:
      return { wrapper: '', invert: false }
  }
}
