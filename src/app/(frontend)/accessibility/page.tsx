import React from 'react'

import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/site/primitives'
import { practice } from '@/lib/practice'
import { buildMeta } from '@/lib/seo'

export const metadata = buildMeta({
  title: 'Accessibility Statement',
  description: `${practice.name} is committed to making its website usable by everyone, including people with disabilities.`,
  path: '/accessibility',
})

// Static effective date — update this only when the statement text itself changes.
const EFFECTIVE_DATE = 'July 23, 2026'

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Commitment"
        title="Accessibility Statement"
        description="We want everyone to be able to find care, learn about our services, and reach us with ease."
      />
      <Section>
        <div className="container prose prose-slate mx-auto max-w-3xl dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand">
          <p className="lead">
            {practice.name} is committed to ensuring digital accessibility for people with
            disabilities. We are continually improving the experience for everyone and applying the
            relevant accessibility standards.
          </p>
          <p>
            <strong>Effective date:</strong> {EFFECTIVE_DATE}
          </p>

          <h2>Our standard</h2>
          <p>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA —
            the standard widely used to make web content more accessible to people with a broad range
            of disabilities, including visual, motor, auditory, and cognitive.
          </p>

          <h2>What we do</h2>
          <ul>
            <li>Build pages with semantic HTML, a logical heading structure, and descriptive link text</li>
            <li>Maintain sufficient color contrast in both light and dark modes</li>
            <li>Support full keyboard navigation with clear, visible focus indicators</li>
            <li>Provide meaningful alternative text for images that carry information</li>
            <li>Respect your system’s reduced-motion preference and keep animation subtle</li>
            <li>Use a responsive layout that stays legible when zoomed or viewed on any device</li>
            <li>Label form fields clearly and describe errors in plain language</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            Some pages include an embedded Google Map so you can find our office. Third-party content
            like this is outside our direct control and may not fully meet the same standards. If the
            map is difficult to use, our full address is written in text nearby, and you’re always
            welcome to call us for directions.
          </p>

          <h2>Need something in another format?</h2>
          <p>
            If any part of our website is difficult for you to use, we don’t want that to stand
            between you and care. Call us at <a href={practice.phoneHref}>{practice.phone}</a> and a
            member of our team will personally help you book an appointment, answer questions, or
            share any information from the site.
          </p>

          <h2>Give us feedback</h2>
          <p>
            We welcome your feedback on the accessibility of this website. If you encounter a barrier,
            please tell us:
          </p>
          <ul>
            <li>The page or feature where you had trouble (a link or description helps)</li>
            <li>What you were trying to do</li>
            <li>The device, browser, or assistive technology you were using, if you know it</li>
          </ul>
          <p>
            Email <a href={`mailto:${practice.email}`}>{practice.email}</a> or call{' '}
            <a href={practice.phoneHref}>{practice.phone}</a>. We take this seriously and will do our
            best to respond promptly and resolve the issue.
          </p>
        </div>
      </Section>
    </>
  )
}
