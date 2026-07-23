'use client'

import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { Form as FormDoc } from '@/payload-types'
import RichText from '@/components/RichText'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utilities/ui'

const field =
  'w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring'
const labelCls = 'mb-1.5 block text-sm font-semibold text-foreground'

type FormField = NonNullable<FormDoc['fields']>[number]

/** Half-width fields pair up on sm+; everything else spans the row. */
const spanClass = (width?: number | null) =>
  width && width <= 50 ? 'sm:col-span-1' : 'sm:col-span-2'

/**
 * Renders a form-builder form in the site's own styling.
 *
 * The plugin ships its own renderer, but it emits generic markup — this keeps the exact
 * inputs, animated submit button and consent row the hand-built contact form had, while
 * every field, label, option and email route now comes from the CMS.
 *
 * Submissions POST to /api/form-submissions, which stores the record AND fires whatever
 * emails are configured on the form. A failed request surfaces a real error rather than a
 * false "thanks" — a silent success on an appointment request loses a patient.
 */
export const CmsForm: React.FC<{ form: FormDoc }> = ({ form }) => {
  const [done, setDone] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fields = (form.fields || []) as FormField[]

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setPending(true)

    const data = new FormData(e.currentTarget)
    const submissionData = fields
      .filter((f) => 'name' in f && f.name)
      .map((f) => {
        const name = (f as { name: string }).name
        const raw = data.get(name)
        // Checkboxes post "on" when ticked and nothing when not — normalise to a boolean
        // so the stored submission reads true/false rather than "on"/"".
        const value = f.blockType === 'checkbox' ? data.get(name) !== null : String(raw ?? '')
        return { field: name, value }
      })

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setDone(true)
    } catch (err) {
      console.error('[form] submit failed:', err)
      setError('Something went wrong sending your request. Please call us instead.')
    } finally {
      setPending(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-[8px] border border-success/40 bg-success/10 p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/20 text-success">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Request received!</h3>
        {form.confirmationMessage && (
          <RichText
            className="mt-2 text-sm text-muted-foreground"
            data={form.confirmationMessage as DefaultTypedEditorState}
            enableGutter={false}
          />
        )}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[8px] border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f, i) => {
          if (f.blockType === 'message') {
            return (
              <div key={i} className="sm:col-span-2">
                <RichText data={f.message as DefaultTypedEditorState} enableGutter={false} />
              </div>
            )
          }

          if (!('name' in f) || !f.name) return null
          const { name, label, required } = f as {
            name: string
            label?: string | null
            required?: boolean | null
          }

          if (f.blockType === 'checkbox') {
            return (
              <label
                key={i}
                className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2"
              >
                <input
                  type="checkbox"
                  name={name}
                  required={!!required}
                  className="mt-0.5 size-4 rounded-sm border-border text-brand focus:ring-ring"
                />
                <span>{label}</span>
              </label>
            )
          }

          return (
            <div key={i} className={spanClass(f.width)}>
              <label htmlFor={name} className={labelCls}>
                {label}
                {required && <span className="text-brand"> *</span>}
              </label>

              {f.blockType === 'select' ? (
                <Select name={name} defaultValue={f.defaultValue || undefined}>
                  <SelectTrigger id={name} className={cn(field, 'h-auto shadow-none')}>
                    <SelectValue placeholder="Choose one…" />
                  </SelectTrigger>
                  <SelectContent>
                    {(f.options || []).map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : f.blockType === 'textarea' ? (
                <textarea id={name} name={name} rows={4} required={!!required} className={field} />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={
                    f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'tel' : 'text'
                  }
                  required={!!required}
                  className={field}
                />
              )}
            </div>
          )
        })}
      </div>

      {error && (
        <p className="mt-4 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={buttonVariants({
          variant: 'default',
          size: 'clear',
          className: 'mt-6 flex w-full px-6 py-3.5 text-base font-bold disabled:opacity-70',
        })}
      >
        <ButtonLabel>
          {pending ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Sending…
            </>
          ) : (
            form.submitButtonLabel || 'Submit'
          )}
        </ButtonLabel>
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
        We only use these details to contact you about your visit. Please don’t send sensitive
        medical information through this form.
      </p>
    </form>
  )
}
