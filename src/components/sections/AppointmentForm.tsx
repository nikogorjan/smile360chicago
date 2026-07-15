'use client'

import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import React, { useActionState } from 'react'

import { submitAppointment, type AppointmentState } from '@/app/(frontend)/contact/actions'
import { ButtonLabel, buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { services } from '@/lib/practice'
import { cn } from '@/utilities/ui'

const field =
  'w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring'
const labelCls = 'mb-1.5 block text-sm font-semibold text-foreground'

export const AppointmentForm: React.FC = () => {
  const [state, action, pending] = useActionState<AppointmentState, FormData>(
    submitAppointment,
    null,
  )

  if (state?.ok) {
    return (
      <div className="rounded-[8px] border border-success/40 bg-success/10 p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/20 text-success">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Request received!</h3>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="rounded-[8px] border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full name *
          </label>
          <input id="name" name="name" required className={field} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={field}
            placeholder="(312) 555-0199"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={field}
            placeholder="jane@email.com"
          />
        </div>
        <div>
          <label htmlFor="preferred" className={labelCls}>
            Preferred day/time
          </label>
          <input
            id="preferred"
            name="preferred"
            className={field}
            placeholder="Weekday mornings"
          />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>
            Service
          </label>
          <Select name="service">
            <SelectTrigger id="service" className={cn(field, 'h-auto shadow-none')}>
              <SelectValue placeholder="Choose a service…" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.slug} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
              <SelectItem value="Not sure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="patientType" className={labelCls}>
            Are you a…
          </label>
          <Select name="patientType" defaultValue="New patient">
            <SelectTrigger id="patientType" className={cn(field, 'h-auto shadow-none')}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New patient">New patient</SelectItem>
              <SelectItem value="Existing patient">Existing patient</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelCls}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={field}
          placeholder="Tell us briefly what you need (please don’t include sensitive medical details)."
        />
      </div>

      <label className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 rounded border-border accent-[var(--brand)]"
        />
        <span>
          I agree that {`Smile360`} may contact me about my request. I won’t include sensitive
          medical information in this form.
        </span>
      </label>

      {state && !state.ok && (
        <p className="mt-4 rounded-sm border border-error/40 bg-error/10 px-4 py-3 text-sm text-foreground">
          {state.message}
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
            'Request my appointment'
          )}
        </ButtonLabel>
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-brand" />
        Your information is kept private and never sold.
      </p>
    </form>
  )
}
