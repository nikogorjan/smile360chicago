# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Smile360 Chicago site
A custom dental-practice website (Next.js 16 · Tailwind v4 · shadcn · MongoDB).
See `BUILD_NOTES.md` for the full architecture, what's built, and the launch checklist.

Key facts:
- **Everything is CMS-editable.** Marketing pages are Payload Pages built from **blocks** (`src/blocks/*`, registered in `RenderBlocks.tsx` + Pages `layout`). The client adds/reorders/edits sections in admin with live preview.
- **Dynamic blocks** (ServicesGrid, TeamGrid, Reviews, Faq, BeforeAfter, GalleryGrid) pull from collections via `src/lib/queries.ts`.
- **Globals → chrome:** `site-settings` (NAP/hours/announcement/social) + `header` (nav + CTA) read in the layout via `src/lib/getSiteSettings.ts` and `src/lib/nav.ts`.
- **Fallback:** `src/lib/practice.ts` holds defaults and seeds the CMS; the data layer falls back to it if a collection/global is empty.
- **Seed:** `npx payload run` is unreliable here — trigger `src/seed/dentalSeed.ts` via the dev route `GET /dental-seed?key=smile360seed` (delete that route before launch).
- **Service detail** `/services/[slug]` is a collection-driven route (reads the Services collection).
- **Theme:** brand tokens in `src/app/(frontend)/globals.css`; light is the forced default, dark fully supported.
- Full detail in `BUILD_NOTES.md`.
