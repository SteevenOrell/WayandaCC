import emailjs from '@emailjs/browser';
import { emailjsConfig, isEmailConfigured } from './config';

// Limits keep payloads small and stop the form being used to relay large
// blobs of text through the EmailJS template.
export const LIMITS = { name: 80, email: 120, area: 120, minResidents: 1, maxResidents: 30 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const MIN_LEAD_HOURS = 3;
const MAX_LEAD_MONTHS = 3;
const OPEN_HOUR = 7; // 7:00
const CLOSE_HOUR = 20; // 20:00 (last slot)
const COOLDOWN_MS = 30_000;

let lastSentAt = 0;

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

/**
 * Validates and normalises a booking / sign-up submission.
 * Returns { ok: true, params } or { ok: false, error }.
 * `kind` is fixed by the code (never read from the form) so it cannot be tampered with in the UI.
 */
export function validateSubmission(kind, raw, now = new Date()) {
  if (raw.company) {
    // Honeypot field filled in: almost certainly a bot. Pretend success, send nothing.
    return { ok: false, bot: true };
  }
  const name = clean(raw.name, LIMITS.name);
  const email = clean(raw.email, LIMITS.email);
  const dateStr = clean(raw.date, 40);

  if (name.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Please enter a valid email address.' };

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return { ok: false, error: 'Please choose a valid date and time.' };

  const earliest = new Date(now.getTime() + MIN_LEAD_HOURS * 3600_000);
  const latest = new Date(now);
  latest.setMonth(latest.getMonth() + MAX_LEAD_MONTHS);
  if (date < earliest) return { ok: false, error: `Bookings need at least ${MIN_LEAD_HOURS} hours' notice.` };
  if (date > latest) return { ok: false, error: `Bookings can be made up to ${MAX_LEAD_MONTHS} months ahead.` };

  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes < OPEN_HOUR * 60 || minutes > CLOSE_HOUR * 60) {
    return { ok: false, error: 'Please choose a time between 7:00 a.m. and 8:00 p.m.' };
  }

  const params = { clientType: kind === 'barber' ? 'Barber' : 'Nursing Home', name, email, date: dateStr };

  if (kind === 'barber') {
    const area = clean(raw.ariaOfWork, LIMITS.area);
    if (area.length < 2) return { ok: false, error: 'Please tell us your service area.' };
    params.ariaOfWork = area;
  } else {
    const n = Number.parseInt(raw.numberOfResident, 10);
    if (!Number.isInteger(n) || n < LIMITS.minResidents || n > LIMITS.maxResidents) {
      return { ok: false, error: `Number of residents must be between ${LIMITS.minResidents} and ${LIMITS.maxResidents}.` };
    }
    params.numberOfResident = String(n);
  }
  return { ok: true, params };
}

/** Sends a validated submission. Only whitelisted params are sent (not the raw form). */
export async function sendSubmission(params) {
  if (!isEmailConfigured()) {
    throw new Error('not-configured');
  }
  const since = Date.now() - lastSentAt;
  if (since < COOLDOWN_MS) {
    throw new Error('cooldown');
  }
  await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, params, {
    publicKey: emailjsConfig.publicKey,
    blockHeadless: true,
    limitRate: { id: 'wcc-forms', throttle: COOLDOWN_MS },
  });
  lastSentAt = Date.now();
}
