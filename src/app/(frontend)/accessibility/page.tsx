import React from 'react'

import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/site/primitives'
import { practice } from '@/lib/practice'
import { buildMeta } from '@/lib/seo'

export const metadata = buildMeta({
  title: 'Accessibility Statement',
  description: `${practice.name} is committed to making its website accessible to everyone.`,
  path: '/accessibility',
})

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Commitment" title="Accessibility Statement" />
      <Section>
        <div className="container prose prose-slate mx-auto max-w-3xl dark:prose-invert">
          <p>
            {practice.name} is committed to ensuring digital accessibility for people with
            disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2
            Level AA.
          </p>
          <h2>Measures we take</h2>
          <ul>
            <li>Semantic HTML, clear headings, and descriptive link text</li>
            <li>Sufficient color contrast in both light and dark modes</li>
            <li>Full keyboard navigation and visible focus states</li>
            <li>Respect for reduced-motion preferences</li>
          </ul>
          <h2>Feedback</h2>
          <p>
            If you encounter any accessibility barrier, please let us know at{' '}
            <a href={`mailto:${practice.email}`}>{practice.email}</a> or {practice.phone} and we will
            work to resolve it promptly.
          </p>
        </div>
      </Section>
    </>
  )
}
