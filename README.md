# Dr. Mohamed Atef — Website

Bilingual (Arabic `/ar` · English `/en`) static website for **Dr. Mohamed Atef**, Consultant of General & Laparoscopic Surgery.
Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Framer Motion · `output: 'export'`.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000/ar/
npm run build      # static site → ./out  (+ postbuild prefetch fix)
npm start          # preview ./out locally
```

## Content status

**Verified from public sources** — name *Dr. Mohamed Atef ElKordy*, title from his logo
(*Colon Surgery Consultant — استشاري جراحة أمراض القولون والمستقيم والشرج*), Assistant Professor of Surgical
Oncology at the National Cancer Institute – Cairo University, MD Surgical Oncology (Cairo University),
RCS / ESSO / Egyptian Society memberships, Maadi clinic addresses, clinic phone 01021228989 (Vezeeta & Dalili listings).

**Still to confirm / replace before going live:**

| What | Where |
| --- | --- |
| Domain (canonical, hreflang, sitemap, JSON-LD) | `.env` → `NEXT_PUBLIC_SITE_URL` (see `.env.example`) |
| Instagram & TikTok profile links (placeholders), email, YouTube | `src/config/site.ts` |
| Which clinic address is current, working hours, map coordinates | `src/data/clinics.ts` |
| Statistics (sample numbers) and any years for the timeline | `src/data/doctor.ts` |
| Patient reviews (sample — publish only genuine, consented reviews) | `src/data/reviews.ts` |
| YouTube IDs for every video | `src/data/videos.ts` → `youtubeId` |
| Doctor photos (hero 2560×1080 + mobile 828×1300, portrait 4:5) | `public/images/doctor/` |
| Procedure / service / article / video images | `public/images/{procedures,services,articles,videos}/` |

The bundled photos are free Unsplash stock images used as stand-ins.

Brand assets: `public/images/brand/` (cropped from `DR Mohamed Atef LOGO1.png`). The footer credit badge
(Transition → https://transitioneg.com/) is configured in `src/config/site.ts` → `credit`.
The original large logo files in `public/images/` (`logo-01.png` 640 KB, `DR Mohamed Atef LOGO1.png`) are not
referenced by the site and can be moved out of `public/` so they are not uploaded.

## Brand palette

Defined once in `src/app/globals.css` (`@theme`):

- **Primary** `gold` `#ffb701` — CTAs, active / selected states, badges, highlights (always with `ink` text for AA contrast)
- **Secondary** `silver` `#c6c6c4` — card borders, secondary buttons, tags, muted section surfaces (`paper` is a silver tint)
- **Neutrals** `ink` `#111827`, `ink-800` `#1f2937`, white

## Structure

```
src/
  app/[lang]/…            pages (home, about, services, reviews, videos, articles/[slug], contact)
  app/(root)/             "/" → /ar/ redirect page
  app/global-not-found.tsx, sitemap.ts, robots.ts, manifest.ts
  components/shared/      UnifiedHero, CtaBanner, FloatingActions, VideoFacade, Navbar, Footer, Accordion…
  components/sections/    page sections (home/, about/, services/, contact/, articles/…)
  data/                   typed bilingual content (ready to move to Supabase)
  dictionaries/           ar.ts / en.ts UI copy
  lib/                    routes, SEO metadata, JSON-LD schema builders
```

## Deploying to Hostinger

1. `npm run build`
2. Upload the **contents** of `./out` (including the hidden `.htaccess`) to `public_html/`.

`.htaccess` handles HTTPS, the `/` → `/ar/` 301, trailing slashes, the 404 page, compression and caching.

> `scripts/fix-segment-prefetch.mjs` runs automatically after `next build`. It works around a Next.js 16.4 static-export
> mismatch in segment-prefetch file names; it is a no-op once Next.js fixes it.
