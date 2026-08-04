import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './globals/SiteSettings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    // Cap the connection pool. Mongoose defaults to maxPoolSize 100 PER instance, and on
    // Vercel each warm serverless instance keeps its own pool — a few instances at 100 each
    // blow straight past the M0 free-tier ceiling of 500, which is what triggers the Atlas
    // "nearing connection limit" alert. A low-traffic site needs only a handful of sockets
    // per instance; idle ones are reaped so cold/idle instances give their connections back.
    connectOptions: {
      maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE || 5),
      minPoolSize: 0,
      maxIdleTimeMS: 10_000,
      // Fail fast instead of piling up connection attempts if the cluster is briefly busy.
      serverSelectionTimeoutMS: 10_000,
      waitQueueTimeoutMS: 10_000,
    },
  }),
  // Outbound mail for the form-builder plugin's "Emails" panel — plain SMTP through the
  // practice's own mailbox, so there's no third-party sending service to pay for or hand
  // over at launch.
  //
  // Only registered when SMTP_HOST is present. Without an adapter Payload logs the message
  // to the console instead, which keeps local dev quiet; submissions are stored in
  // Form Submissions either way, so a missing config can never lose an enquiry.
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromName: process.env.EMAIL_FROM_NAME || 'Smile360 Chicago',
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'hello@smile360chicago.com',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            // 465 is implicit TLS; 587 upgrades via STARTTLS after connecting.
            secure: Number(process.env.SMTP_PORT || 587) === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
      }
    : {}),
  collections: [Pages, Posts, Services, Testimonials, FAQs, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
