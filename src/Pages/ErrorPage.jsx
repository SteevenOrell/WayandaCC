import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section className="section section--paper" aria-labelledby="nf-title">
      <div className="grid-lines" aria-hidden="true" />
      <div className="container not-found">
        <p className="eyebrow">Error 404</p>
        <h1 id="nf-title">
          <span className="display" style={{ display: 'block' }} aria-hidden="true">
            404
          </span>
          <span className="h2" style={{ display: 'block' }}>
            Page not found
          </span>
        </h1>
        <p className="lede muted">Sorry, we couldn’t find the page you’re looking for. It may have moved, or the link may be mistyped.</p>
        <div className="hero__actions">
          <Link to="/" className="btn">
            Go back home <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link to="/#book" className="btn btn--ghost">
            Book a visit
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
