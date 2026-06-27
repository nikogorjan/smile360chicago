'use client'

import { Check, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

export type PillarItem = {
  number: string
  title: string
  body?: string | null
  imageUrl: string
  imageAlt: string
  checklist?: string[]
  stat?: { value: string; caption: string } | null
}

/**
 * Pillars accordion. Desktop: a row of columns where one expands to show the
 * number, heading, body and an image beside it; the rest collapse to a numbered
 * circle + vertical title. Tablet/mobile: a normal stacked accordion (image
 * above text). One item open at a time, first open by default. All motion is
 * gated behind `motion-reduce` so reduced-motion users get instant state changes.
 */
export const PillarsAccordion: React.FC<{ pillars: PillarItem[] }> = ({ pillars }) => {
  const [active, setActive] = useState(0)

  if (!pillars.length) return null

  return (
    <>
      {/* Desktop — horizontal expanding accordion: one flush strip, thin dividers,
          white fill only on the open panel (collapsed panels are transparent). */}
      <div className="hidden overflow-hidden rounded-2xl border border-border lg:flex lg:h-[38rem]">
        {pillars.map((p, i) => {
          const isActive = i === active
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              aria-label={p.body ? `${p.title}. ${p.body}` : p.title}
              className={cn(
                'group relative flex h-full min-w-0 overflow-hidden text-left outline-none',
                'transition-[flex-grow,background-color] duration-500 ease-out motion-reduce:transition-none',
                'focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand',
                i > 0 && 'border-l border-border',
                isActive
                  ? 'flex-[6] cursor-default bg-card xl:flex-[10]'
                  : 'flex-[1] bg-card hover:bg-muted',
              )}
            >
              {/* Collapsed rail — numbered circle + vertical title */}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 flex flex-col items-center gap-6 py-7',
                  'transition-opacity duration-300 motion-reduce:transition-none',
                  isActive ? 'pointer-events-none opacity-0' : 'opacity-100',
                )}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                  {p.number}
                </span>
                <span className="font-display rotate-180 text-xl font-medium text-foreground [writing-mode:vertical-rl]">
                  {p.title}
                </span>
              </span>

              {/* Expanded content — number + heading + body, image beside it */}
              <span
                aria-hidden
                className={cn(
                  'flex h-full w-full items-stretch',
                  'transition-opacity duration-500 motion-reduce:transition-none',
                  isActive ? 'opacity-100 delay-150' : 'opacity-0',
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col justify-center p-8 xl:p-10">
                  <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                    {p.number}
                  </span>
                  <span className="font-display mt-6 text-3xl font-medium leading-tight text-foreground">
                    {p.title}
                  </span>
                  {p.body && (
                    <span className="mt-4 block text-base leading-relaxed text-muted-foreground">
                      {p.body}
                    </span>
                  )}
                  {p.checklist && p.checklist.length > 0 && (
                    <span className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {p.checklist.map((c, j) => (
                        <span
                          key={j}
                          className="flex items-start gap-2 text-sm leading-snug text-foreground/85"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
                          <span>{c}</span>
                        </span>
                      ))}
                    </span>
                  )}
                  {p.stat?.value && (
                    <span className="mt-7 flex items-center gap-4 border-t border-border pt-5">
                      <span className="font-display text-4xl font-semibold leading-none text-gold">
                        {p.stat.value}
                      </span>
                      {p.stat.caption && (
                        <>
                          <span aria-hidden className="h-9 w-px shrink-0 bg-border" />
                          <span className="text-sm leading-snug text-muted-foreground">
                            {p.stat.caption}
                          </span>
                        </>
                      )}
                    </span>
                  )}
                </span>
                <span className="relative block shrink-0 basis-2/5 overflow-hidden xl:basis-1/2">
                  <Image
                    src={p.imageUrl}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 34vw, 26vw"
                    className="object-cover"
                  />
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Tablet / mobile — stacked accordion, image above text */}
      <div className="lg:hidden">
        {pillars.map((p, i) => {
          const isOpen = i === active
          return (
            <div key={i} className="border-t border-border bg-card last:border-b">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                  {p.number}
                </span>
                <span className="font-display flex-1 text-xl font-medium text-foreground">
                  {p.title}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'size-5 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="pb-6">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={p.imageUrl}
                        alt={p.imageAlt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-6">
                      {p.body && (
                        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                          {p.body}
                        </p>
                      )}
                      {p.checklist && p.checklist.length > 0 && (
                        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                          {p.checklist.map((c, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm leading-snug text-foreground/85"
                            >
                              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2} />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {p.stat?.value && (
                        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
                          <span className="font-display text-3xl font-semibold leading-none text-gold">
                            {p.stat.value}
                          </span>
                          {p.stat.caption && (
                            <>
                              <span aria-hidden className="h-8 w-px shrink-0 bg-border" />
                              <span className="text-sm leading-snug text-muted-foreground">
                                {p.stat.caption}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
