import { useQuery } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { getAboutPage } from '../api/api';
import { getConfig } from '../config';
import './HomePage.css';

export function HomePage() {
  const config = getConfig();
  const { data: aboutPage, isLoading, error } = useQuery({
    queryKey: ['aboutpage'],
    queryFn: getAboutPage,
  });

  if (isLoading) {
    return (
      <div className="home-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error">Failed to load page content</div>
      </div>
    );
  }

  const profilePicUrl = aboutPage?.profilePic
    ? `${config.apiUrl.replace('/api', '')}${aboutPage.profilePic.formats?.medium?.url || aboutPage.profilePic.url}`
    : null;

  return (
    <div className="home-page">
      <section className="hero">
        {profilePicUrl && (
          <img
            src={profilePicUrl}
            alt={aboutPage?.profilePic?.alternativeText || 'Profile picture'}
            className="profile-pic"
          />
        )}
        <h1>{aboutPage?.title}</h1>
        {aboutPage?.subtitle && (
          <p className="subtitle">{aboutPage.subtitle}</p>
        )}
        {aboutPage?.body && (
          <div className="body-content">
            <Markdown>{aboutPage.body}</Markdown>
          </div>
        )}
        <Link to="/portfolio" className="cta-button">
          View Portfolio
        </Link>
      </section>
    </div>
  );
}
