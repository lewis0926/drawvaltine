# Portfolio Website – Project Context

Personal art portfolio website using a modern TypeScript-first stack.
Frontend consumes content from a headless CMS.

---

## Frontend (FE)

- **Runtime**: Bun
- **Framework**: React
- **Bundler**: Vite
- **Language**: TypeScript

### Libraries
- `@tanstack/react-query`
- `zod`

### Styling
- Plain CSS with nesting
- `App.css` is for **common/root styles only**:
    - CSS variables (colors, spacing, typography)
    - Base resets and body styles
    - Common utility classes (`.container`, `.loading`, `.error`)
- **Page-level styles go in separate CSS files** (e.g., `HomePage.css`, `PortfolioPage.css`)
- Component-specific styles go alongside their components (e.g., `Header.css`)

### Schemas (Zod)
- **Do not use a single monolithic schema file**
- Separate schemas by domain (e.g., `media.schema.ts`, `artwork.schema.ts`, `portfolio.schema.ts`)
- Use `schemas/index.ts` only for re-exports

---

## Backend (BE)

- **Runtime**: Bun
- **Language**: TypeScript
- **CMS**: Strapi
- **Database**: SQLite

Strapi is used purely as a headless CMS and API provider.
Custom backend logic (hooks, services, controllers) must be written in TypeScript.

---

## Storage

- Images and uploads stored **locally**
- Use **VM-mounted Docker volumes**
- No external object storage

---

## Data Rules

- All API responses must be validated with `zod`
- Do not trust raw Strapi responses

---

## Development Setup

- Docker + Docker Compose
- One-command local startup
- Persistent volumes for:
    - SQLite database
    - Uploaded media

---

## Configuration (PKL)

- PKL generates `config.json`
- `configs` contain env-specific values
- `schemas` define structure and validation
- No hard-coded env values in code

---

## Notes

- Never commit sensitive info (API keys, secrets)
- FE and BE are separate services
- DB or storage migration may be considered later
