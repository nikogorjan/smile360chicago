import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const PageHero: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumb?: { label: string; href: string }[]
  children?: React.ReactNode
}> = ({ eyebrow, title, description, breadcrumb, children }) => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-brand-glow">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div className="container relative py-14 lg:py-20">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <React.Fragment key={b.href}>
                {i > 0 && <ChevronRight className="size-3" />}
                <Link href={b.href} className="transition-colors hover:text-brand">
                  {b.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="mx-auto max-w-3xl text-center reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  )
}
