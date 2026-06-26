import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Fraunces, Lora } from 'next/font/google'
import React from 'react'

// Editorial serif for headings (with a characterful italic for emphasis).
const serif = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],
  variable: '--font-fraunces',
})

// Display serif for the hero headline.
const display = Lora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
})

import { AdminBar } from '@/components/AdminBar'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { MobileCTA } from '@/components/site/MobileCTA'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { InitIntro } from '@/components/site/InitIntro'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getSiteData } from '@/lib/getSiteSettings'
import { getHeaderNav } from '@/lib/nav'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const [site, header] = await Promise.all([getSiteData(), getHeaderNav()])

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, serif.variable, display.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <InitIntro />
        <link href="/favicon.png" rel="icon" type="image/png" sizes="any" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <SiteHeader
            nav={header.nav}
            ctaLabel={header.ctaLabel}
            phone={site.phone}
            phoneHref={site.phoneHref}
            logo={site.logo}
          />
          <main className="pb-20 lg:pb-0">{children}</main>
          <SiteFooter site={site} nav={header.nav} />
          <MobileCTA phoneHref={site.phoneHref} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: 'Smile360 Chicago — Modern Dental Care',
    description: 'Modern family, cosmetic & same-day emergency dentistry in Chicago.',
    images: ['/og.jpg'],
  },
}
