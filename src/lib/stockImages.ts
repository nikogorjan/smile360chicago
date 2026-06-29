/**
 * Curated, CMS-overridable stock photography (Unsplash).
 *
 * These are used ONLY as fallbacks: a block or collection renders its uploaded
 * media when present, and falls back to one of these tasteful, on-theme photos
 * when the field is still empty — so every section looks finished immediately
 * while staying fully editable in the Payload admin. Replace by uploading real
 * practice photography before launch.
 *
 * Every URL below was verified to return 200. All are dental / clinical /
 * portrait imagery that fits the Cobalt & Gold brand (no off-brand colors).
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const stockPhotos = {
  /** Dentist showing a patient their scan — warm, human care moment. */
  careConsult: u('photo-1606811841689-23dfddce3e95'),
  /** Close-up of a gentle exam (mirror + scaler). */
  examCloseup: u('photo-1606811971618-4486d14f3f99'),
  /** Bright, modern operatory (teal chair, daylight). */
  officeBright: u('photo-1629909613654-28e377c37b09'),
  /** Clean modern operatory with blinds. */
  officeModern: u('photo-1629909615184-74f495363b67'),
  /** Warm operatory with wood + soft light. */
  officeWarm: u('photo-1598256989800-fe5f95da9787'),
  /** Clear aligner / Invisalign. */
  clearAligner: u('photo-1609840114035-3c981b782dfe'),
  /** Dentist reviewing dental X-rays on a lightbox. */
  xrayReview: u('photo-1588776814546-1ffcf47267a5'),
  /** Clinicians reviewing a 3D scan on monitors — technology. */
  scanReview: u('photo-1666214280557-f1b5022eb634'),
  /** Intra-oral scan in progress (digital dentistry). */
  intraoralScan: u('photo-1598531228433-d9f0cb960816'),
  /** Toothbrushes — preventive / oral-health detail, bright & clean. */
  toothbrushes: u('photo-1607613009820-a29f7bb81c04'),
  /** Welcoming front desk / reception. */
  reception: u('photo-1519494026892-80bbd2d6fd0d'),
} as const

/** Service photo keyed by the Services-collection slug. */
const serviceBySlug: Record<string, string> = {
  cleanings: stockPhotos.examCloseup,
  whitening: stockPhotos.officeModern,
  invisalign: stockPhotos.clearAligner,
  implants: stockPhotos.xrayReview,
  veneers: stockPhotos.intraoralScan,
  'crowns-bridges': stockPhotos.officeWarm,
  'root-canals': stockPhotos.officeBright,
  'kids-dentistry': stockPhotos.toothbrushes,
  emergency: stockPhotos.scanReview,
}

const serviceFallbacks = [
  stockPhotos.examCloseup,
  stockPhotos.officeModern,
  stockPhotos.clearAligner,
  stockPhotos.xrayReview,
  stockPhotos.intraoralScan,
  stockPhotos.officeWarm,
  stockPhotos.officeBright,
  stockPhotos.toothbrushes,
  stockPhotos.scanReview,
]

/** Pick a service photo by slug, falling back to a rotating dental set by index. */
export const getServicePhoto = (slug?: string | null, index = 0): string =>
  (slug && serviceBySlug[slug]) || serviceFallbacks[index % serviceFallbacks.length]

/** Professional team headshots (rotates by index). */
export const teamPhotos = [
  u('photo-1559839734-2b71ea197ec2', 900), // warm woman dentist
  u('photo-1622253692010-333f2da6031d', 900), // smiling man in scrubs
  u('photo-1612349316228-5942a9b489c2', 900), // friendly woman, white bg
  u('photo-1607990283143-e81e7a2c9349', 900), // laughing woman
] as const

export const getTeamPhoto = (index = 0): string => teamPhotos[index % teamPhotos.length]

/** Smiling patient portraits (testimonials & results). */
export const patientPhotos = [
  u('photo-1494790108377-be9c29b29330', 900), // woman laughing (warmest)
  u('photo-1544005313-94ddf0286df2', 900), // smiling woman
  u('photo-1599566150163-29194dcaad36', 900), // friendly man
  u('photo-1500648767791-00dcc994a43e', 900), // man, soft smile
] as const

export const getPatientPhoto = (index = 0): string =>
  patientPhotos[index % patientPhotos.length]
