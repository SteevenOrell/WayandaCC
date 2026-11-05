import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { validateSubmission, sendSubmission, LIMITS } from '../lib/booking';
import { isEmailConfigured } from '../lib/config';
import { CONTACT_EMAIL } from '../content/site';
import { Reveal } from './Reveal';

const AUDIENCES = {
  'nursing-home': {
    tab: 'For nursing homes',
    eyebrow: 'Nursing homes',
    title: 'Book a visit',
    text: 'We bring licensed barbers directly to your facility. Tell us when and how many residents. We handle the rest.',
    points: ['All tools brought on site', 'Strict hygiene protocols', 'Each resident treated with care and respect'],
    submit: 'Request a booking',
  },
  barber: {
    tab: 'For barbers',
    eyebrow: 'Barbers',
    title: 'Join the network',
    text: 'Flexible opportunities for licensed barbers to give back and earn by serving seniors in local nursing homes.',
    points: ['Choose your availability and service area', 'Get matched with facilities near you', 'Earn per visit and make a difference'],
    submit: 'Sign up',
  },
};

/** Value for <input type="datetime-local" min>: now + 3h, in local time. */
function localMin(hoursAhead = 3) {
  const d = new Date(Date.now() + hoursAhead * 3600_000);
  d.setSeconds(0, 0);
  const off = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
}

function Field({ id, label, hint, error, ...input }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={error ? 'true' : undefined} aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined} {...input} />
      {hint && <span id={hintId} className="field__hint">{hint}</span>}
      {error && <span id={errId} className="field__error">{error}</span>}
    </div>
  );
}

function BookingForm({ kind }) {
  const uid = useId();
  const id = (n) => `${uid}-${n}`;
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const min = useMemo(() => localMin(3), []);
  const cfg = AUDIENCES[kind];

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const result = validateSubmission(kind, Object.fromEntries(new FormData(form)));
    if (result.bot) {
      form.reset();
      setStatus({ type: 'success', message: 'Thank you. Your information was sent.' });
      return;
    }
    if (!result.ok) {
      setStatus({ type: 'error', message: result.error });
      return;
    }
    if (!isEmailConfigured()) {
      setStatus({ type: 'error', message: `Online requests are temporarily unavailable. Please email us at ${CONTACT_EMAIL}.` });
      return;
    }
    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      await sendSubmission(result.params);
      form.reset();
      setStatus({ type: 'success', message: 'Thank you. Your information was sent. We will be in touch shortly.' });
    } catch (err) {
      const msg =
        err?.message === 'cooldown'
          ? 'You just sent a request. Please wait a few seconds before sending another.'
          : `We couldn't send your information. Please try again later or email ${CONTACT_EMAIL}.`;
      setStatus({ type: 'error', message: msg });
    } finally {
      setSending(false);
    }
  }

  return (
    <form ref={formRef} className="form" noValidate={false} onSubmit={onSubmit} aria-describedby={id('privacy')}>
      <div className="form__row">
        <Field id={id('name')} label="Full name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={LIMITS.name} placeholder="Jane Doe" />
        <Field id={id('email')} label="Email" name="email" type="email" autoComplete="email" required maxLength={LIMITS.email} placeholder="you@example.com" />
      </div>
      <div className="form__row">
        <Field
          id={id('date')}
          label={kind === 'barber' ? 'Availability' : 'Preferred date & time'}
          hint="Between 7:00 a.m. and 8:00 p.m., 3 hours to 3 months ahead."
          name="date"
          type="datetime-local"
          required
          min={min}
        />
        {kind === 'barber' ? (
          <Field id={id('area')} label="Area of service" name="ariaOfWork" type="text" autoComplete="address-level2" required minLength={2} maxLength={LIMITS.area} placeholder="e.g. Toronto, Mississauga" />
        ) : (
          <Field
            id={id('residents')}
            label="Residents to serve"
            hint={`${LIMITS.minResidents}–${LIMITS.maxResidents} per visit`}
            name="numberOfResident"
            type="number"
            inputMode="numeric"
            required
            min={LIMITS.minResidents}
            max={LIMITS.maxResidents}
            placeholder="e.g. 8"
          />
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id('company')}>Company</label>
        <input id={id('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        className={`form__status${status.type ? ` form__status--${status.type}` : ''}`}
        role={status.type === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {status.message}
      </div>

      <div>
        <button type="submit" className="btn" disabled={sending}>
          {sending ? 'Sending…' : cfg.submit} <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p id={id('privacy')} className="form__privacy">
        We use these details only to respond to your request. They are sent by email through our form provider (EmailJS) and are
        not stored on this website.
      </p>
    </form>
  );
}

/** Audience tabs (WAI-ARIA tabs pattern) with booking / sign-up forms. */
export default function Booking() {
  const location = useLocation();
  const [active, setActive] = useState(location.hash === '#join' ? 'barber' : 'nursing-home');
  const tabRefs = useRef({});
  const keys = Object.keys(AUDIENCES);

  useEffect(() => {
    if (location.hash === '#join') setActive('barber');
    if (location.hash === '#book') setActive('nursing-home');
  }, [location.hash, location.key]);

  function onKeyDown(e) {
    const i = keys.indexOf(active);
    let next = null;
    if (e.key === 'ArrowRight') next = keys[(i + 1) % keys.length];
    if (e.key === 'ArrowLeft') next = keys[(i - 1 + keys.length) % keys.length];
    if (e.key === 'Home') next = keys[0];
    if (e.key === 'End') next = keys[keys.length - 1];
    if (next) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <section id="book" className="section section--paper" aria-labelledby="book-title" tabIndex={-1}>
      <span id="join" tabIndex={-1} />
      <div className="grid-lines" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Get started</p>
            <h2 id="book-title" className="h2">
              Book a visit.
              <br />
              Or join us.
            </h2>
          </div>
        </Reveal>

        <div className="tabs__list" role="tablist" aria-label="Who are you?">
          {keys.map((k) => (
            <button
              key={k}
              ref={(el) => {
                tabRefs.current[k] = el;
              }}
              id={`tab-${k}`}
              type="button"
              role="tab"
              className="tabs__tab"
              aria-selected={active === k}
              aria-controls={`panel-${k}`}
              tabIndex={active === k ? 0 : -1}
              onClick={() => setActive(k)}
              onKeyDown={onKeyDown}
            >
              {AUDIENCES[k].tab}
            </button>
          ))}
        </div>

        {keys.map((k) => {
          const a = AUDIENCES[k];
          return (
            <div key={k} id={`panel-${k}`} role="tabpanel" aria-labelledby={`tab-${k}`} hidden={active !== k} className="booking">
              <div className="booking__info">
                <div>
                  <p className="eyebrow">{a.eyebrow}</p>
                  <h3 className="h2" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)' }}>{a.title}</h3>
                </div>
                <p className="lede">{a.text}</p>
                <ul className="booking__list">
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="booking__form">{active === k && <BookingForm kind={k} />}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
