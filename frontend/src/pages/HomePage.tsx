import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Drawvaltine</h1>
        <p className="description">A personal art portfolio showcasing creative works</p>
        <Link to="/portfolio" className="cta-button">
          View Portfolio
        </Link>
      </section>
    </div>
  );
}