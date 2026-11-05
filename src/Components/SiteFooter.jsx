import { Link } from 'react-router-dom';
import logo from './Assets/logo3.png';
import { CONTACT_EMAIL, CREDITS } from '../content/site';
import { Reveal } from './Reveal';

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer" tabIndex={-1}>
      <div className="grid-lines" aria-hidden="true" />
      <div className="container">
        <Reveal className="site-footer__cta">
          <p className="eyebrow">Get in touch</p>
          <h2 className="display">
            Bring the barber
            <br />
            to them.
          </h2>
          <p>Partnerships, recurring visits and custom quotes are available on request.</p>
          <div className="hero__actions" style={{ justifyContent: 'center' }}>
            <Link to="/#book" className="btn btn--accent">
              Book a visit <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn--ghost">
              Email us
            </a>
          </div>
        </Reveal>

        <div className="site-footer__cols">
          <div>
            <img className="site-footer__logo" src={logo} alt="Wayanda CareConnect" width="72" height="72" loading="lazy" />
            <p>We make personal care mobile, professional and rooted in respect. One haircut at a time.</p>
          </div>
          <div>
            <h2>Legal &amp; trust</h2>
            <p>All barbers are vetted and follow our hygiene and dignity-first care policy. We value your trust.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About us</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
              <li><Link to="/#join">For barbers</Link></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>Business email</a></li>
              <li>Ontario, Canada</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Wayanda CareConnect. All rights reserved.</p>
          <p>
            Photography via Unsplash:{' '}
            {CREDITS.map((c, i) => (
              <span key={c.who}>
                <a href={c.profile} rel="noopener noreferrer">{c.who}</a>
                {i < CREDITS.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
