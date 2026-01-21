import { useQuery } from '@tanstack/react-query';
import { getPortfolio } from '../api/api';
import { getConfig } from '../config';
import type { Artwork } from '../schemas';
import './PortfolioPage.css';

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const config = getConfig();
  const firstImage = artwork.image[0];
  const imageUrl = firstImage
    ? `${config.apiUrl.replace('/api', '')}${firstImage.formats?.medium?.url || firstImage.url}`
    : null;

  return (
    <article className="artwork-card">
      {imageUrl && (
        <div className="artwork-image-container">
          <img
            src={imageUrl}
            alt={firstImage?.alternativeText || artwork.title || 'Artwork'}
            className="artwork-image"
            loading="lazy"
          />
        </div>
      )}
      <div className="artwork-info">
        {artwork.title && <h3 className="artwork-title">{artwork.title}</h3>}
        {artwork.description && <p className="artwork-description">{artwork.description}</p>}
      </div>
    </article>
  );
}

export function PortfolioPage() {
  const { data: portfolio, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
  });

  if (isLoading) {
    return (
      <div className="portfolio-page">
        <div className="loading">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-page">
        <div className="error">Failed to load portfolio. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <h1>Portfolio</h1>
      {portfolio?.description && (
        <p className="portfolio-description">{portfolio.description}</p>
      )}
      <div className="gallery">
        {portfolio?.artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
      {portfolio?.artworks.length === 0 && (
        <p className="empty-message">No artworks to display yet.</p>
      )}
    </div>
  );
}