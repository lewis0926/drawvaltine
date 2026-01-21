import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="site-title">Drawvaltine</Link>
        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/portfolio"
            className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
          >
            Portfolio
          </Link>
        </nav>
      </div>
    </header>
  );
}