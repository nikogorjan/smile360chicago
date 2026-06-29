import React from 'react'

/**
 * Render-blocking script that flags the hero intro before first paint (mirrors
 * InitTheme). While `data-intro="running"` is set, the page is held at opacity 0
 * by globals.css; the hero's portaled overlay clears the flag when the intro
 * finishes, fading the page in. Skipped entirely under prefers-reduced-motion.
 */
export const InitIntro: React.FC = () => {
  return (
    <script
      id="intro-script"
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    try {
      if (window.location.pathname !== '/') return
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      document.documentElement.setAttribute('data-intro', 'running')
    } catch (e) {}
  })();
  `,
      }}
    />
  )
}
