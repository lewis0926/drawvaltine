'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getAboutPage } from './lib/api'
import { serializeRichText } from './utils/richtext'
import './HomePage.css'

export default function HomePage() {
  const { data: aboutPage, isLoading, error } = useQuery({
    queryKey: ['aboutpage'],
    queryFn: getAboutPage,
  })

  if (isLoading) {
    return (
      <div className="home-page">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error">Failed to load page content</div>
      </div>
    )
  }

  const profilePicUrl = aboutPage?.profileImage?.url ?? null
  const bodyHtml = aboutPage?.body ? serializeRichText(aboutPage.body) : ''

  return (
    <div className="home-page">
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h1>{aboutPage?.title}</h1>
            {aboutPage?.subtitle && (
              <p className="subtitle">{aboutPage.subtitle}</p>
            )}
            {bodyHtml && (
              <div
                className="body-content"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            )}
            <Link href="/portfolio" className="cta-button">
              View Portfolio
            </Link>
          </div>
          {profilePicUrl && (
            <div className="about-image">
              <img
                src={profilePicUrl}
                alt={aboutPage?.profileImage?.alt || 'Profile picture'}
                className="profile-pic"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
