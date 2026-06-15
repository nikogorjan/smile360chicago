import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Kaushan_Script } from 'next/font/google'
import React from 'react'

// Cursive accent font — used for highlighted words. Kaushan Script is a brushy
// script (single 400 weight) with energy, close to the logo wordmark.
const script = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script',
})

import { AdminBar } from '@/components/AdminBar'
import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { TopBar } from '@/components/site/TopBar'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { MobileCTA } from '@/components/site/MobileCTA'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
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
      className={cn(GeistSans.variable, GeistMono.variable, script.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <AnnouncementBar
            enabled={site.announcement.enabled}
            text={site.announcement.text}
            link={site.announcement.link}
          />
          <TopBar site={site} />
          <SiteHeader
            nav={header.nav}
            ctaLabel={header.ctaLabel}
            phone={site.phone}
            phoneHref={site.phoneHref}
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
    creator: '@payloadcms',
  },
}
