import React from 'react'

import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/site/primitives'
import { practice } from '@/lib/practice'
import { buildMeta } from '@/lib/seo'

export const metadata = buildMeta({
  title: 'Privacy Policy',
  description: `How ${practice.name} collects, uses, and protects your information.`,
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <div className="container prose prose-slate mx-auto max-w-3xl dark:prose-invert">
          <p>
            {practice.name} respects your privacy. This placeholder policy should be reviewed by the
            practice and replaced with a finalized, HIPAA-compliant policy before launch.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you contact us or request an appointment, we collect the details you provide (name,
            phone, email, and your message). We do not ask for sensitive medical information through
            our website forms.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your information solely to respond to your request, schedule and confirm
            appointments, and provide the care you ask for. We never sell your information.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about your privacy? Email{' '}
            <a href={`mailto:${practice.email}`}>{practice.email}</a> or call {practice.phone}.
          </p>
        </div>
      </Section>
    </>
  )
}
