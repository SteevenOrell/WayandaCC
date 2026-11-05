import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './Assets/logo3.png';
import { NAV_LINKS, CONTACT_EMAIL } from '../content/site';

function NavItem({ item, onNavigate }) {
  const { pathname } = useLocation();
  const isCurrent = !item.to.includes('#') && pathname === item.to;
  return (
    <Link to={item.to} onClick={onNavigate} aria-current={isCurrent ? 'page' : undefined}>
      {item.label}
    </Link>
  );
}

/**
 * Fixed header. Transparent over the hero, solid ink once scrolled (or always
 * on pages without a dark hero). Mobile: full-screen menu dialog.
 */
export default function SiteHeader({ overHero = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return undefined;
    const first = menuRef.current?.querySelector('a');
    first?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        // Keep focus inside the menu + toggle while open.
        const nodes = [toggleRef.current, ...menuRef.current.querySelectorAll('a, button')].filter(Boolean);
        const firstEl = nodes[0];
        const lastEl = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const solid = scrolled || !overHero || open;

  return (
    <>
      <header className={`site-header${solid ? ' is-solid' : ''}`}>
        <div className="container site-header__bar">
          <Link to="/" className="site-header__logo" aria-label="Wayanda CareConnect, home">
            <img src={logo} alt="" width="64" height="64" />
          </Link>

          <nav className="site-nav" aria-label="Main">
            <ul>
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__cta">
            <Link to="/#book" className="btn btn--accent">
              Book a visit
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle__icon" aria-hidden="true" />
          </button>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site menu">
          <nav aria-label="Mobile">
            <ul>
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} onNavigate={() => setOpen(false)} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot">
            <Link to="/#book" className="btn btn--accent" onClick={() => setOpen(false)}>
              Book a visit <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <p>
              Questions? <a href={`mailto:${CONTACT_EMAIL}`}>Email us</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
