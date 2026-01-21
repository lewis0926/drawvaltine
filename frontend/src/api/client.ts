import { z } from 'zod'
import { ArtworkListResponseSchema, ArtworkResponseSchema } from './schemas'
import type { ArtworkListResponse, ArtworkResponse } from './schemas'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337'

async function fetchApi<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const response = await fetch(`${API_URL}/api${endpoint}`)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return schema.parse(data)
}

export async function getArtworks(
  page = 1,
  pageSize = 12,
): Promise<ArtworkListResponse> {
  const params = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    'populate': 'image',
    'sort': 'createdAt:desc',
  })
  return fetchApi(`/artworks?${params}`, ArtworkListResponseSchema)
}

export async function getArtwork(id: number): Promise<ArtworkResponse> {
  return fetchApi(`/artworks/${id}?populate=image`, ArtworkResponseSchema)
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) {
    return path
  }
  return `${API_URL}${path}`
}
