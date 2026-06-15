import { Star } from 'lucide-react'
import * as Icons from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

/** Render a lucide icon by its string name (used for CMS-driven service icons). */
export const DynamicIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  const Cmp = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[name]
  const Fallback = Icons.Stethoscope
  const Comp = Cmp || Fallback
  return <Comp className={className} />
}

export const Section: React.FC<
  React.PropsWithChildren<{
    className?: string
    id?: string
    /** background variant */
    tone?: 'default' | 'muted' | 'brand' | 'glow'
  }>
> = ({ children, className, id, tone = 'default' }) => {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20 lg:py-24',
        tone === 'muted' && 'bg-secondary/40',
        tone === 'brand' && 'bg-primary text-primary-foreground',
        tone === 'glow' && 'bg-brand-glow',
        className,
      )}
    >
      {children}
    </section>
  )
}

export const SectionHeading: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  invert?: boolean
}> = ({ eyebrow, title, description, align = 'center', className, invert }) => {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow', invert && 'border-white/30 bg-white/10 text-white')}>
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          invert && 'text-white',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg',
            invert && 'text-white/80',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export const StarRating: React.FC<{ value?: number; className?: string }> = ({
  value = 5,
  className,
}) => {
  return (
    <div className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('size-4', i < value ? 'fill-gold text-gold' : 'text-muted-foreground/30')}
        />
      ))}
    </div>
  )
}
