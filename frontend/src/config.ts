import { z } from 'zod';

const StylesSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
});

const ConfigSchema = z.object({
  port: z.number(),
  apiUrl: z.string(),
  styles: StylesSchema,
});

export type Config = z.infer<typeof ConfigSchema>;

let config: Config | null = null;

export async function loadConfig(): Promise<Config> {
  if (config) return config;

  const response = await fetch('/config.json');
  const data = await response.json();
  config = ConfigSchema.parse(data);

  applyConfigStyles(config.styles);

  return config;
}

export function getConfig(): Config {
  if (!config) {
    throw new Error('Config not loaded. Call loadConfig() first.');
  }
  return config;
}

function applyConfigStyles(styles: z.infer<typeof StylesSchema>) {
  const root = document.documentElement;
  root.style.setProperty('--config-primary', styles.primaryColor);
  root.style.setProperty('--config-secondary', styles.secondaryColor);
}
