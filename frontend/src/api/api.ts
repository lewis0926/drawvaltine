import { getApi } from './client';
import { PortfolioSchema, StrapiResponseSchema, type Portfolio } from '../schemas';

export async function getPortfolio(): Promise<Portfolio> {
  const response = await getApi<unknown>('/portfolio?populate[artworks][populate]=*');
  const validated = StrapiResponseSchema(PortfolioSchema).parse(response);
  return validated.data;
}