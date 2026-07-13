import type { Field } from 'payload'

import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  ParagraphFeature,
  TextStateFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Background/appearance selector shared by every section block, so the client
 * can control section styling (light + dark aware) right from the admin.
 */
export const backgroundField: Field = {
  name: 'background',
  type: 'select',
  defaultValue: 'default',
  options: [
    { label: 'Default', value: 'default' },
    { label: 'Muted (subtle grey)', value: 'muted' },
    { label: 'Brand (teal)', value: 'brand' },
    { label: 'Soft glow', value: 'glow' },
  ],
  admin: { description: 'Section background style.' },
}

/** Standard eyebrow + heading + description trio used by most sections. */
export const sectionHeaderFields: Field[] = [
  { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the heading.' } },
  { name: 'heading', type: 'text' },
  { name: 'description', type: 'textarea' },
  {
    name: 'align',
    type: 'select',
    defaultValue: 'center',
    options: [
      { label: 'Center', value: 'center' },
      { label: 'Left', value: 'left' },
    ],
  },
]

/** Per-section vertical spacing controls (top + bottom), so the same block can be
 *  reused with tighter or looser gaps wherever it's placed. Maps to the `Section`
 *  primitive's paddingTop/paddingBottom. Defaults to the standard rhythm. */
const spacingOptions = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Default', value: 'md' },
  { label: 'Large', value: 'lg' },
]

export const spacingFields: Field = {
  type: 'collapsible',
  label: 'Spacing',
  admin: {
    initCollapsed: true,
    description: 'Vertical padding above and below this section (controls the gap to neighbours).',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'paddingTop',
          type: 'select',
          defaultValue: 'md',
          options: spacingOptions,
          admin: { width: '50%', description: 'Padding above' },
        },
        {
          name: 'paddingBottom',
          type: 'select',
          defaultValue: 'md',
          options: spacingOptions,
          admin: { width: '50%', description: 'Padding below' },
        },
      ],
    },
  ],
}

/** A constrained rich-text editor for short body copy inside blocks. */
export const richTextField = (name = 'richText'): Field => ({
  name,
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  label: false,
})

export type BlockBackground = 'default' | 'muted' | 'brand' | 'glow'

/**
 * How a section sits on the page — used by the About-page blocks. `panel` renders
 * the white rounded inset card (same as the homepage Panel); `brand`/`muted` are
 * full-width colour bands; `canvas` sits open on the page. See `_shared/surface`.
 */
export type SectionSurface = 'canvas' | 'panel' | 'muted' | 'brand'

export const surfaceFieldWith = (defaultValue: SectionSurface): Field => ({
  name: 'surface',
  type: 'select',
  defaultValue,
  options: [
    { label: 'Canvas (open on page)', value: 'canvas' },
    { label: 'White panel (inset rounded card)', value: 'panel' },
    { label: 'Muted band (full-width grey)', value: 'muted' },
    { label: 'Cobalt band (full-width brand)', value: 'brand' },
  ],
  admin: { description: 'How this section sits on the page.' },
})

export const surfaceField: Field = surfaceFieldWith('canvas')

/**
 * Editor for the About-page headings: a fixed toolbar (always visible) plus an inline
 * toolbar on selection, with Bold/Italic and the "Brand blue" Style dropdown. Select a
 * phrase, then Style → Brand blue to accent it in cobalt (the same brand text style used
 * by the Hero). Rendered on the frontend by `_shared/richHeading`.
 */
export const headingEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    InlineToolbarFeature(),
    FixedToolbarFeature(),
    TextStateFeature({
      state: {
        style: {
          brand: { label: 'Brand blue', css: { color: '#0048B4' } },
        },
      },
    }),
  ],
})
