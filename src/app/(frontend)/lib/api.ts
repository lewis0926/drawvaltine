import { getApi } from './client'
import {
  PortfolioSchema,
  AboutPageSchema,
  ArtworkSchema,
  PayloadCollectionResponseSchema,
  type Portfolio,
  type AboutPage,
  type Artwork,
} from '../schemas'

export async function getPortfolio(): Promise<Portfolio> {
  const response = await getApi<unknown>('/globals/portfolio-page?depth=1')
  return PortfolioSchema.parse(response)
}

export async function getArtworks(): Promise<Artwork[]> {
  const response = await getApi<unknown>('/artwork?depth=1')
  const validated = PayloadCollectionResponseSchema(ArtworkSchema).parse(response)
  return validated.docs
}

export async function getAboutPage(): Promise<AboutPage> {
  const response = await getApi<unknown>('/globals/about-page?depth=1')
  return AboutPageSchema.parse(response)
}
