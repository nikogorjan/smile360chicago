import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
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
