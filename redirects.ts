import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // The standalone About sub-pages were consolidated into a single /about page,
  // so their old URLs now permanently redirect there (no 404s, preserves SEO).
  const consolidatedAbout = ['/team', '/reviews'].map((source) => ({
    source,
    destination: '/about',
    permanent: true,
  }))

  return [internetExplorerRedirect, ...consolidatedAbout]
}
