'use server'

import { practice } from '@/lib/practice'

export type AppointmentState = {
  ok: boolean
  message: string
} | null

/**
 * Appointment / contact request handler.
 *
 * HIPAA-aware: we intentionally collect only scheduling + contact details and a
 * short free-text note — never clinical/medical history through this channel.
 *
 * Email delivery: if RESEND_API_KEY is set, the request is emailed to the
 * practice inbox. Otherwise it succeeds and is logged server-side so the form is
 * always functional in development. Wire a provider key before launch.
 */
export async function submitAppointment(
  _prev: AppointmentState,
  formData: FormData,
): Promise<AppointmentState> {
  const name = String(formData.get('name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const service = String(formData.get('service') || '').trim()
  const preferred = String(formData.get('preferred') || '').trim()
  const patientType = String(formData.get('patientType') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const consent = formData.get('consent')

  if (!name || !phone) {
    return { ok: false, message: 'Please enter your name and a phone number so we can reach you.' }
  }
  if (!consent) {
    return { ok: false, message: 'Please agree to be contacted about your request.' }
  }

  const summary = [
    `New appointment request — ${practice.name}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || '—'}`,
    `Patient: ${patientType || '—'}`,
    `Service: ${service || '—'}`,
    `Preferred time: ${preferred || '—'}`,
    `Message: ${message || '—'}`,
  ].join('\n')

  const key = process.env.RESEND_API_KEY
  if (key) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || 'Smile360 Website <onboarding@resend.dev>',
          to: [process.env.CONTACT_TO || practice.email],
          reply_to: email || undefined,
          subject: `New appointment request from ${name}`,
          text: summary,
        }),
      })
      if (!res.ok) throw new Error(`Resend responded ${res.status}`)
    } catch (err) {
      console.error('[appointment] email failed:', err)
      return {
        ok: false,
        message: `Something went wrong sending your request. Please call us at ${practice.phone}.`,
      }
    }
  } else {
    console.info('[appointment] (no RESEND_API_KEY set, logged only)\n' + summary)
  }

  return {
    ok: true,
    message: `Thanks, ${name.split(' ')[0]}! We’ve received your request and will call you shortly to confirm.`,
  }
}
