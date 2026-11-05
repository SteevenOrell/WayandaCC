import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ErrorPage from './Pages/ErrorPage';
import SiteHeader from './Components/SiteHeader';
import SiteFooter from './Components/SiteFooter';

const TITLES = {
  '/': 'Wayanda CareConnect | Mobile barbers for nursing homes',
  '/about-us': 'About us | Wayanda CareConnect',
};

/** Scrolls to #hash targets (and moves focus there) or to top on page change. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Page not found | Wayanda CareConnect';
  }, [pathname]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    let tries = 0;
    let raf;
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (el.tabIndex >= -1) el.focus({ preventScroll: true });
      } else if (tries++ < 20) {
        raf = requestAnimationFrame(go);
      }
    };
    raf = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const hasHero = pathname === '/' || pathname === '/about-us';
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader overHero={hasHero} />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
