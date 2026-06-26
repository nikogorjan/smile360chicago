'use client'

import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { useTheme } from '@/providers/Theme'
import type { Theme } from '@/providers/Theme/types'
import { cn } from '@/utilities/ui'

/**
 * Icon theme toggle. Light is the primary/default theme — this just flips the
 * explicit preference. Reads the current value from <html data-theme> so the
 * icon is correct on first paint without a hydration flash.
 */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { setTheme } = useTheme()
  const [current, setCurrent] = useState<Theme>('light')

  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme')
    setCurrent(attr === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    setCurrent(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${current === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'inline-grid size-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-foreground/5 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  )
}
