import { getApi } from './client';
import {
  PortfolioSchema,
  AboutPageSchema,
  ArtworkSchema,
  StrapiResponseSchema,
  StrapiArrayResponseSchema,
  type Portfolio,
  type AboutPage,
  type Artwork,
} from '../schemas';

export async function getPortfolio(): Promise<Portfolio> {
  const response = await getApi<unknown>('/portfolio');
  const validated = StrapiResponseSchema(PortfolioSchema).parse(response);
  return validated.data;
}

export async function getArtworks(): Promise<Artwork[]> {
  const response = await getApi<unknown>('/artworks?populate=image');
  const validated = StrapiArrayResponseSchema(ArtworkSchema).parse(response);
  return validated.data;
}

export async function getAboutPage(): Promise<AboutPage> {
  const response = await getApi<unknown>('/aboutpage?populate=profilePic');
  const validated = StrapiResponseSchema(AboutPageSchema).parse(response);
  return validated.data;
}
