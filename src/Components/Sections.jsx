import { Link } from 'react-router';
import { Reveal, MaskedLines } from './Reveal';
import { IMAGES, MISSION, VISION, STEPS } from '../content/site';

export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <picture>
          <source media="(max-width: 700px)" srcSet={IMAGES.heroHome.mobile} width="1000" height="1500" />
          <img src={IMAGES.heroHome.src} alt={IMAGES.heroHome.alt} fetchPriority="high" width="1672" height="941" />
        </picture>
      </div>
      <div className="container hero__content">
        <div className="hero__grid">
          <div>
            <p className="eyebrow">Mobile barbers for nursing homes · Ontario</p>
            <MaskedLines as="h1" id="hero-title" className="display hero__title" lines={['Where dignity', 'meets care.']} />
          </div>
          <Reveal className="hero__side" delay={0.4}>
            <p>We connect skilled, compassionate barbers with nursing homes to offer in-home haircuts for residents.</p>
            <div className="hero__actions">
              <Link to="/#book" className="btn btn--accent">
                Book a visit <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/#how-it-works" className="btn btn--ghost">
                How it works
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function MissionSplit() {
  return (
    <section className="section section--paper" aria-labelledby="mission-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container split">
        <Reveal className="split__media">
          <img src={IMAGES.mission1.src} alt={IMAGES.mission1.alt} loading="lazy" width="567" height="577" />
        </Reveal>
        <div className="split__body">
          <div className="split__head">
            <p className="eyebrow">Our mission</p>
            <p className="eyebrow muted">Ontario</p>
          </div>
          <Reveal className="split__main">
            <h2 id="mission-title" className="h2">
              Dignity,
              <br />
              one haircut
              <br />
              at a time.
            </h2>
            <p className="lede">{MISSION}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--paper section--tight" aria-labelledby="how-title" tabIndex={-1}>
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="h2">
              Three steps.
              <br />
              No hassle.
            </h2>
          </div>
          <Link to="/#book" className="btn">
            Book a visit <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" className="step" key={s.title} delay={i * 0.08}>
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="section section--paper" aria-labelledby="pricing-title" tabIndex={-1}>
      <div className="grid-lines" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 id="pricing-title" className="h2">
              Simple,
              <br />
              fair pricing.
            </h2>
          </div>
          <Link to="/#book" className="btn">
            Book a visit <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal className="price-grid">
          <div className="price-card price-card--feature">
            <p className="eyebrow accent">Per resident</p>
            <p className="price-card__price">
              $45
              <small>per adult resident haircut</small>
            </p>
          </div>
          <div className="price-card">
            <p className="eyebrow">Groups &amp; contracts</p>
            <div>
              <p className="price-card__price">
                10% off
                <small>for 5+ residents on long-term contracts</small>
              </p>
            </div>
            <ul className="booking__list">
              <li>Travel and setup included</li>
              <li>Recurring visits available</li>
            </ul>
          </div>
          <div className="price-card price-card--media">
            <img src={IMAGES.barberTools.src} alt={IMAGES.barberTools.alt} loading="lazy" width="1400" height="1050" />
          </div>
        </Reveal>
        <p className="price-note muted">We welcome partnerships, recurring visits, and custom quotes on request.</p>
      </div>
    </section>
  );
}

export function JoinCta() {
  return (
    <section className="section section--ink" aria-labelledby="join-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container join">
        <Reveal className="join__media">
          <img src={IMAGES.vision1.src} alt={IMAGES.vision1.alt} loading="lazy" width="569" height="567" />
        </Reveal>
        <Reveal className="join__text" delay={0.1}>
          <p className="eyebrow accent">For barbers</p>
          <h2 id="join-title" className="h2">
            Give back.
            <br />
            Get paid.
            <br />
            Join us.
          </h2>
          <p className="muted">
            Choose your availability and service area, get matched with facilities near you, and earn per visit while becoming part of a
            meaningful network of caregivers.
          </p>
          <Link to="/#join" className="btn btn--accent">
            Sign up as a barber <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutHero() {
  return (
    <section className="hero hero--compact" aria-labelledby="about-title">
      <div className="hero__media">
        <picture>
          <source media="(max-width: 700px)" srcSet={IMAGES.heroAbout.mobile} width="1000" height="1498" />
          <img src={IMAGES.heroAbout.src} alt="" fetchPriority="high" width="2000" height="1333" />
        </picture>
      </div>
      <div className="container hero__content">
        <p className="eyebrow">About us</p>
        <MaskedLines as="h1" id="about-title" className="display hero__title" lines={['We deliver', 'dignity', 'and care.']} />
      </div>
    </section>
  );
}

export function FounderStory() {
  return (
    <section className="section section--paper" aria-labelledby="founder-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container split split--reverse">
        <Reveal className="split__media" aria-hidden="true">
          {/* Placeholder until a founder portrait is supplied. */}
          <div className="monogram">W</div>
        </Reveal>
        <div className="split__body">
          <div className="split__head">
            <p className="eyebrow">Founder’s story</p>
            <p className="eyebrow muted">Wayanda CareConnect</p>
          </div>
          <Reveal className="split__main">
            <h2 id="founder-title" className="h2">
              Why we
              <br />
              started.
            </h2>
            <p className="lede">
              My name is Daniel Wayanda, and I created Wayanda CareConnect because I believe every senior deserves to feel seen, valued,
              and well cared for. After years of serving in healthcare and community roles, I realized that even something as simple as
              a haircut can restore confidence, dignity, and human connection.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Statements() {
  const items = [
    { label: 'Our mission', title: 'Restore dignity', text: MISSION, image: IMAGES.mission2 },
    { label: 'Our vision', title: 'Every home served', text: VISION, image: IMAGES.vision2 },
  ];
  return (
    <section className="section section--paper section--tight" aria-label="Mission and vision">
      <div className="container">
        <div className="statements">
          {items.map((s, i) => (
            <Reveal className="statement" key={s.label} delay={i * 0.08}>
              <p className="eyebrow" style={{ margin: 0 }}>{s.label}</p>
              <h2 className="h3">{s.title}</h2>
              <p>{s.text}</p>
              <div className="statement__media">
                <img src={s.image.src} alt={s.image.alt} loading="lazy" width="490" height="490" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
