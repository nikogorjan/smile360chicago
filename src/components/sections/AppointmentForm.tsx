'use client'

import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import React, { useActionState } from 'react'

import { submitAppointment, type AppointmentState } from '@/app/(frontend)/contact/actions'
import { services } from '@/lib/practice'

const field =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring'
const labelCls = 'mb-1.5 block text-sm font-semibold text-foreground'

export const AppointmentForm: React.FC = () => {
  const [state, action, pending] = useActionState<AppointmentState, FormData>(
    submitAppointment,
    null,
  )

  if (state?.ok) {
    return (
      <div className="rounded-3xl border border-success/40 bg-success/10 p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/20 text-success">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Request received!</h3>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
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
          <select id="service" name="service" className={field} defaultValue="">
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="patientType" className={labelCls}>
            Are you a…
          </label>
          <select id="patientType" name="patientType" className={field} defaultValue="New patient">
            <option value="New patient">New patient</option>
            <option value="Existing patient">Existing patient</option>
          </select>
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
        <p className="mt-4 rounded-xl border border-error/40 bg-error/10 px-4 py-3 text-sm text-foreground">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          'Request my appointment'
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-brand" />
        Your information is kept private and never sold.
      </p>
    </form>
  )
}
