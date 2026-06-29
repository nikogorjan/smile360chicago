import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

/**
 * Inline, render-blocking script that sets <html data-theme> before first paint
 * to avoid a flash. Uses a native <script> (not next/script) so React 19 doesn't
 * warn about script tags, and so it runs in the initial document <head>.
 * Smile360: light is primary — only an explicit saved choice overrides it.
 */
export const InitTheme: React.FC = () => {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }
    var themeToSet = '${defaultTheme}'
    var preference = window.localStorage.getItem('${themeLocalStorageKey}')
    if (themeIsValid(preference)) {
      themeToSet = preference
    }
    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
    />
  )
}
