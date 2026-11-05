import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import logo from './Assets/logo3.png';
import { NAV_LINKS, CONTACT_EMAIL } from '../content/site';

const MENU_LINKS = [{ label: 'Home', to: '/' }, ...NAV_LINKS];

function NavItem({ item, onNavigate }) {
  const { pathname } = useLocation();
  const isCurrent = !item.to.includes('#') && pathname === item.to;
  return (
    <Link to={item.to} onClick={onNavigate} aria-current={isCurrent ? 'page' : undefined}>
      {item.label}
      <span className="arrow" aria-hidden="true">→</span>
    </Link>
  );
}

/**
 * Fixed header: menu button on the left, logo centred, booking button on the right.
 * Transparent over the hero, solid ink once scrolled (or always on pages without a
 * dark hero). The menu slides in from the left on desktop and fills the screen on phones.
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
    menuRef.current?.querySelector('a')?.focus();
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
  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header${solid ? ' is-solid' : ''}`}>
        <div className="container site-header__bar">
          <div className="site-header__left">
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="menu-toggle__icon" aria-hidden="true" />
              <span className="menu-toggle__label" aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>

          <Link to="/" className="site-header__logo" aria-label="Wayanda CareConnect, home">
            <img src={logo} alt="" width="64" height="64" />
          </Link>

          <div className="site-header__right">
            <Link to="/#book" className="btn btn--accent site-header__book">
              Book<span className="hide-sm"> a visit</span>
            </Link>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div className="site-menu__backdrop" onClick={close} aria-hidden="true" />
          <div id="site-menu" className="site-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site menu">
            <nav aria-label="Main">
              <ul>
                {MENU_LINKS.map((item) => (
                  <li key={item.label}>
                    <NavItem item={item} onNavigate={close} />
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-menu__foot">
              <Link to="/#book" className="btn btn--accent" onClick={close}>
                Book a visit <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <p>
                Questions? <a href={`mailto:${CONTACT_EMAIL}`}>Email us</a>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
