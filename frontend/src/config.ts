import { z } from 'zod';

const ConfigSchema = z.object({
  port: z.number(),
  apiUrl: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

let config: Config | null = null;

export async function loadConfig(): Promise<Config> {
  if (config) return config;

  const response = await fetch('/config.json');
  const data = await response.json();
  config = ConfigSchema.parse(data);
  return config;
}

export function getConfig(): Config {
  if (!config) {
    throw new Error('Config not loaded. Call loadConfig() first.');
  }
  return config;
}