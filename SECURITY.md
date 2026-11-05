# Security notes: Wayanda CareConnect website

Last review: 2026-11-04, on branch `vizam/security-ux`. An automated and manual review is not a
guarantee of security. Get an independent review before handling any personal data at scale.

## Reporting a vulnerability

Please email the business contact listed in the site footer. Do not open a public GitHub issue
for security problems.

## Architecture (attack surface)

- A static single-page app (React 19 + React Router 6) with no backend, database, login or session.
- There are two public forms: a nursing-home booking form and a barber sign-up form. They send
  name, email, date, residents/service area **directly from the browser to EmailJS**
  (`api.emailjs.com`). Nothing is stored by this site.
- There is no mock API, JSON server or serverless function.

## Findings

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| 1 | Medium | `.env` with the EmailJS service ID, template ID and public key was **committed to git** (first added in commit `4fef1c5`, and still present in history and on GitHub). These values are designed to be public (they ship in the JS bundle), but anyone can reuse them to send email through the account, which risks spam and quota exhaustion. | **Fixed going forward:** `.env` is untracked and ignored, and `.env.example` was added. **Open:** rotate the IDs and key in EmailJS, enable domain allow-listing, CAPTCHA and rate limits, and decide whether to purge history (see below). |
| 2 | High (runtime) | `react-router-dom` 6.30.1 pulled in `@remix-run/router`, which has open-redirect/XSS advisories. 6.x also carries further open-redirect advisories that are fixed only in 7.18+. | **Fixed:** upgraded to `react-router@^7.18.5`. The app never passes user input to `<Link>`/`navigate`, so it was not practically exploitable. |
| 3 | High/Critical (build-time) | About 70 advisories in the Create React App toolchain (`react-scripts` 5: webpack-dev-server, ws, postcss, node-forge, etc.). These affect the developer machine and dev server, not the shipped static bundle. CRA is unmaintained, so they cannot be fixed in place. | **Fixed** by migrating to Vite (see the audit results below). |
| 4 | Medium | There were no security headers or CSP, and no deploy config. | **Fixed:** added `vercel.json` and `public/_headers` (Netlify/Cloudflare Pages) with CSP, HSTS, nosniff, frame-ancestors/XFO, Referrer-Policy, Permissions-Policy and COOP, plus SPA rewrites. **Open:** verify these on the real host, which is unknown. |
| 5 | Medium | The forms used `emailjs.sendForm(form)`, which sent every form field, including the hidden `clientType` field that users can edit. There were no length limits, no bot protection, and the time window check didn't match its message (it allowed 6:00 to 20:59 but said 7am to 8pm). | **Fixed:** `src/lib/booking.js` validates and trims input, caps lengths, checks email format, residents 1–30, 3 h–3 months lead time and 07:00–20:00. It sends only whitelisted params, sets `clientType` from code, adds a honeypot field, a 30 s client throttle (EmailJS `limitRate`) and `blockHeadless`. **Open:** client-side checks can be bypassed by calling EmailJS directly, so server-side protection must be configured in EmailJS (see #1). |
| 6 | Low | `console.log` printed EmailJS responses and errors in production. | **Fixed:** removed. |
| 7 | Low | Unused dependencies (`@formspree/react`, `web-vitals`) widened the supply-chain surface. | **Fixed:** removed. |
| 8 | Low | `public/index.html` linked to `../src/output.css`, which returns 404 in production. | **Fixed:** removed as part of the Vite migration. |
| 9 | Info | No `dangerouslySetInnerHTML`, `eval`, `innerHTML`, `localStorage` or cookie use was found. React escapes all rendered text. There is no auth or session to review. | No action. |
| 10 | Info / privacy | The forms collect personal data (name, email) and send it to a third party (EmailJS). There is no privacy notice or consent text. Ontario/Canada PIPEDA may apply. | **Partly addressed:** a short notice was added under the forms. **Open:** the owner should publish a privacy policy. |
| 11 | Info | The git history contains the committer's personal (school) email address. | **Open:** owner's choice. GitHub "keep my email private" plus a noreply address for future commits. |

## Required owner actions (cannot be done from code)

1. **Rotate EmailJS credentials.** In the EmailJS dashboard, regenerate the public key, and
   optionally create a new template/service ID. Under *Account → Security*, enable
   *Allowed origins* (your production domain only), and turn on reCAPTCHA and rate limiting for the template.
   Never put the EmailJS **private** key in a client env var.
2. **Set the new env vars on the host** using the `VITE_` names (see README).
3. **Git history.** The old values remain in commit `4fef1c5` on GitHub. Once you rotate them,
   the leaked values are useless, which is usually enough. If you also want them gone, rewrite history with
   `git filter-repo --path .env --invert-paths` and force-push. This is destructive, needs every
   collaborator to re-clone, and was **not** done here.
4. Check the headers on the deployed site, for example with https://securityheaders.com.
5. Enable GitHub Dependabot alerts and secret scanning on the repository.

## Dependency audit (`npm audit`, 2026-11-05)

| Stage | Total | Critical | High | Moderate | Low |
|---|---|---|---|---|---|
| Before (CRA, `master`) | 71 | 4 | 35 | 13 | 19 |
| After (Vite, this branch), all deps | 3 | 0 | 0 | 3 | 0 |
| After, production deps only (`--omit=dev`) | **0** | 0 | 0 | 0 | 0 |

The 3 remaining moderate advisories (`glob`/`minimatch` via `sucrase`, pulled in by Tailwind 3)
are dev/build-time only, and no non-breaking fix exists yet. Re-check after a Tailwind upgrade.

## Things that were verified locally

- The production build is served with the `vercel.json` headers (`vite preview`), with no CSP violations in the console on `/`, `/about-us` or 404.
- axe-core (WCAG 2 A/AA + best practice) reports 0 violations on all three routes at 1440px and 390px.
- Client validation rejects bad input in the browser, and unit tests cover `src/lib/booking.js`.

## Not verified

- A real EmailJS send under the CSP was not tested (no real emails were sent). Test one booking after deploying.
- Headers on the live Vercel deployment, which only change once this branch is deployed.
- Git history was scanned with `git log -p` and pattern greps, not a dedicated tool like gitleaks or trufflehog.
