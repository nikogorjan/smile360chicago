import React from 'react'

import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/site/primitives'
import { practice } from '@/lib/practice'
import { buildMeta } from '@/lib/seo'

export const metadata = buildMeta({
  title: 'Privacy Policy',
  description: `How ${practice.name} collects, uses, and protects the information you share through our website.`,
  path: '/privacy',
})

// Static effective date — update this only when the policy text itself changes.
const EFFECTIVE_DATE = 'July 23, 2026'

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${practice.name} handles the information you share with us online.`}
      />
      <Section>
        <div className="container prose prose-slate mx-auto max-w-3xl dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand">
          <p className="lead">
            {practice.name} (“we,” “us,” or “our”) respects your privacy. This policy explains what
            information we collect when you use{' '}
            <a href={practice.url}>{practice.url.replace('https://', '')}</a>, how we use it, and
            the choices you have. It covers our website only.
          </p>
          <p>
            <strong>Effective date:</strong> {EFFECTIVE_DATE}
          </p>

          <h2>A note about your health information</h2>
          <p>
            Our appointment and contact forms are intended for scheduling and general questions
            only. Please do <strong>not</strong> include diagnoses, medical history, or other
            sensitive health details in a website form or email. Protected health information you
            share as a patient of the practice is governed separately by our HIPAA Notice of Privacy
            Practices, which we provide at your visit — not by this website policy.
          </p>

          <h2>Information we collect</h2>
          <p>When you submit our appointment or contact form, we collect the details you enter:</p>
          <ul>
            <li>Your name and phone number</li>
            <li>Your email address, if you provide one</li>
            <li>
              Your preferred time, the service you’re interested in, and whether you’re a new or
              returning patient
            </li>
            <li>Anything you write in the “How can we help?” message</li>
            <li>Your consent to be contacted about your request</li>
          </ul>
          <p>
            We also use Google Analytics to understand how visitors use our website — for example,
            which pages are viewed and how people arrive. Google Analytics sets cookies and collects
            usage data such as your approximate location, device and browser type, and the pages you
            visit. We use this only in aggregate to improve the site; we do not use it for
            advertising and do not combine it with the details you submit through our forms. This
            information is processed by Google under{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google’s privacy policy
            </a>
            .
          </p>
          <p>
            We do not use advertising or marketing trackers, and we do not build advertising
            profiles of visitors. Your browser also stores a small preference for light or dark
            appearance on your own device; this is not shared with us and is not used to identify
            you.
          </p>
          <h3>Your analytics choices</h3>
          <p>
            You can opt out of Google Analytics across all websites by installing Google’s{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              opt-out browser add-on
            </a>
            , or by blocking cookies in your browser settings.
          </p>

          <h2>How we use your information</h2>
          <p>We use the details you provide only to:</p>
          <ul>
            <li>Respond to your request and answer your questions</li>
            <li>Schedule, confirm, and follow up on appointments</li>
            <li>Provide the care and services you ask for</li>
          </ul>
          <p>
            We do not sell, rent, or trade your information, and we do not use it for advertising.
          </p>

          <h2>How your information is shared</h2>
          <p>
            We share your information only with trusted service providers that help us operate the
            website and respond to you — for example, our website hosting, database, and email
            delivery providers. These providers may process your information only on our behalf and
            only to perform their service. We may also disclose information if required by law or to
            protect the safety and rights of our patients and staff.
          </p>
          <p>
            Some pages embed a Google Map so you can find our office. When a map loads, Google may
            receive your IP address and set its own cookies, governed by Google’s privacy policy. We
            do not control that collection.
          </p>

          <h2>How we protect and keep your information</h2>
          <p>
            Form submissions are transmitted over an encrypted connection and stored securely with
            access limited to authorized practice staff. We keep the information only as long as
            needed to respond to your request and to meet our legal and record-keeping obligations,
            after which it is deleted or de-identified. No method of transmission over the internet
            is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct, or delete the information you’ve submitted through
            the website, or ask us to stop contacting you, by emailing{' '}
            <a href={`mailto:${practice.email}`}>{practice.email}</a>. Because you submit this
            information voluntarily, the simplest choice is not to send details you’d rather we not
            have.
          </p>

          <h2>Children’s privacy</h2>
          <p>
            Our website is intended for adults arranging care for themselves or their family. We do
            not knowingly collect information directly from children under 13. A parent or guardian
            should submit any request on a child’s behalf.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we’ll revise the effective date
            above. Significant changes will be reflected on this page.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about your privacy or this policy? Email{' '}
            <a href={`mailto:${practice.email}`}>{practice.email}</a>, call{' '}
            <a href={practice.phoneHref}>{practice.phone}</a>, or write to us at {practice.name},{' '}
            {practice.address.full}.
          </p>
        </div>
      </Section>
    </>
  )
}
