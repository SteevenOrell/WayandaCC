# Wayanda CareConnect website

The marketing site for Wayanda CareConnect, which brings mobile barbers to nursing homes in Ontario.
It is a static React single-page app built with Vite, with booking and barber sign-up forms
delivered via EmailJS.

## Stack

- React 19, React Router 7 (declarative mode), `motion` for animation, plain CSS design tokens in `src/index.css` (Tailwind 3 for preflight/utilities)
- Vite 8 for dev/build, Vitest + Testing Library for tests, Playwright for portfolio media
- EmailJS (browser SDK) for form delivery, with no backend of its own
- Hosted on Vercel (`vercel.json` holds the build settings, SPA rewrites and security headers)

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in your EmailJS values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` / `npm start` | Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serves `dist/` on port 4173 |
| `npm test` | Unit/route tests (Vitest) |
| `npm run media` | Builds, then captures 1440px and 390px screenshots and walkthrough videos to `portfolio-media/after` (git-ignored) |
| `npm run media:before -- <dir>` | Same capture for any other static build directory, saved to `portfolio-media/before` |

`npm run media` needs Chromium for Playwright. Install it once with `npx playwright install chromium`.

## Environment variables

These values are inlined into the public bundle at build time, so they are **not secrets**.
Lock the EmailJS account down using domain allow-listing and rate limits instead (see `SECURITY.md`).

| Old (Create React App) | New (Vite) |
|---|---|
| `REACT_APP_EMAILJS_SERVICE_ID` | `VITE_EMAILJS_SERVICE_ID` |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | `VITE_EMAILJS_TEMPLATE_ID` |
| `REACT_APP_EMAILJS_PUBLIC_KEY` | `VITE_EMAILJS_PUBLIC_KEY` |

Read them in code with `import.meta.env.VITE_*` (centralized in `src/lib/config.js`).

## Deploying (Vercel)

`vercel.json` sets `framework: vite`, `npm run build` and `outputDirectory: dist`, so the old
Create React App preset (`build/`) no longer applies. Before the next deploy, in the Vercel project:

1. Add the three `VITE_EMAILJS_*` variables (Production + Preview) and remove the old `REACT_APP_*` ones.
2. Clear any dashboard override of the Output Directory (`build`). Leave it empty so `vercel.json` wins.
3. After deploying, confirm the security headers (for example at securityheaders.com).

For Netlify or Cloudflare Pages, use `public/_redirects` and `public/_headers`.

## Migration notes (CRA to Vite)

- `public/index.html` moved to `/index.html`, `%PUBLIC_URL%` was removed, and a module script now points at `src/index.jsx`.
- Files containing JSX were renamed `.js` to `.jsx`.
- `react-scripts`, the ESLint `react-app` preset, `web-vitals` and Jest were removed. Tests now run on Vitest (`vite.config.js` → `test`).
- `postcss.config.cjs` now runs Tailwind explicitly. CRA used to do this implicitly.
- `src/output.css` (a stale, 404ing Tailwind build) was deleted.
- `vite preview` sends the same security headers as `vercel.json`, so CSP issues show up locally.

## Visuals still to supply

- A founder portrait (4:5, 1200×1500 or larger). Right now the About page shows a "W" monogram placeholder (`FounderStory` in `src/Components/Sections.jsx`).
- Real photos of Wayanda barbers working in partner care homes, with resident/facility consent, to replace the Unsplash stock (hero, mission, barber CTA).
- A compressed About-page video (the current MP4 is about 17.6 MB). Aim for under 4 MB (H.264/WebM, 1080p, around 15 s) and add a poster frame.
- An SVG or high-resolution transparent logo, plus a dark-on-light variant for light backgrounds, a 192/512px PWA icon set and a 1200×630 social share image.

## Project structure

```
src/
  App.jsx               layout, routes, hash scrolling / focus management
  content/site.js       copy, nav links, image imports, photo credits
  lib/booking.js        form validation + EmailJS send (whitelisted params)
  lib/config.js         public build-time config (VITE_*)
  Components/           SiteHeader, SiteFooter, Sections, Booking, Reveal
  Pages/                Home, AboutUs, ErrorPage
  assets/images/        Unsplash photos (see CREDITS.md)
scripts/media.mjs       Playwright portfolio capture
```
