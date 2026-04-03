'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loading } from '../components/Loading'
import { useQuery } from '@tanstack/react-query'
import { getPortfolio, getArtworks } from '../lib/api'
import { serializeRichText } from '../utils/richtext'
import type { Artwork, Media } from '../schemas'
import './PortfolioPage.css'

interface LightboxProps {
  image: Media
  artwork: Artwork
  onClose: () => void
}

function Lightbox({ image, artwork, onClose }: LightboxProps) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <Image
          src={image.url}
          alt={image.alt || artwork.title || 'Artwork'}
          className="lightbox-image"
          width={1600}
          height={1200}
        />
        {(artwork.title || artwork.description) && (
          <div className="lightbox-info">
            {artwork.title && <h2 className="lightbox-title">{artwork.title}</h2>}
            {artwork.description && <p className="lightbox-description">{artwork.description}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

interface ArtworkCardProps {
  artwork: Artwork
  onClick: () => void
}

function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const image = artwork.image
  const imageUrl = image?.url ?? null

  return (
    <article className="artwork-card" onClick={onClick}>
      {imageUrl && (
        <div className="artwork-image-container">
          <Image
            src={imageUrl}
            alt={image?.alt || artwork.title || 'Artwork'}
            className="artwork-image"
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="artwork-info">
        {artwork.title && <h3 className="artwork-title">{artwork.title}</h3>}
        {artwork.description && <p className="artwork-description">{artwork.description}</p>}
      </div>
    </article>
  )
}

export default function PortfolioPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)

  const { data: portfolio } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
  })

  const { data: artworks, isLoading, error } = useQuery({
    queryKey: ['artworks'],
    queryFn: getArtworks,
  })

  if (isLoading) {
    return (
      <div className="portfolio-page">
        <Loading label="Loading portfolio…" />
      </div>
    )
  }

  if (error) {
    console.error('Error fetching portfolio data:', error)
    return (
      <div className="portfolio-page">
        <div className="error">Failed to load portfolio. Please try again later.</div>
      </div>
    )
  }

  const contentHtml = portfolio?.content ? serializeRichText(portfolio.content) : ''

  return (
    <div className="portfolio-page">
      <h1>{portfolio?.title || 'Portfolio'}</h1>
      {portfolio?.subtitle && (
        <p className="portfolio-subtitle">{portfolio.subtitle}</p>
      )}
      {contentHtml && (
        <div
          className="portfolio-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
      <div className="gallery">
        {artworks?.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => setSelectedArtwork(artwork)}
          />
        ))}
      </div>
      {artworks?.length === 0 && (
        <p className="empty-message">No artworks to display yet.</p>
      )}
      {selectedArtwork && selectedArtwork.image && (
        <Lightbox
          image={selectedArtwork.image}
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  )
}
