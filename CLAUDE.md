# Portfolio Website – Project Context

Personal art portfolio website using a modern TypeScript-first stack.
A single Next.js app that serves both the Payload CMS admin and the public-facing portfolio frontend.

---

## Stack

- **Runtime**: Bun
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **CMS**: Payload CMS (embedded in Next.js)
- **Database**: PostgreSQL (via `@payloadcms/db-postgres`)
- **Deployment**: Vercel

---

## Project Structure

```
src/
  app/
    (frontend)/       ← Public portfolio site
      layout.tsx      ← Root layout (Providers + Header)
      page.tsx        ← Home / About page
      portfolio/
        page.tsx      ← Portfolio gallery page
      components/     ← Shared UI components (e.g. Header)
      lib/            ← API client and fetch functions
      schemas/        ← Zod schemas for Payload API responses
      utils/          ← Utilities (e.g. richtext serialiser)
    (payload)/        ← Payload CMS admin (auto-generated, do not edit)
  collections/        ← Payload collection definitions
  globals/            ← Payload global definitions
  payload.config.ts   ← Payload configuration
```

---

## Frontend (src/app/(frontend)/)

### Libraries
- `@tanstack/react-query` — client-side data fetching
- `zod` — API response validation

### API
- All API calls go through `lib/client.ts` using `NEXT_PUBLIC_API_URL` (defaults to `/api`)
- All responses validated with Zod before use — do not trust raw Payload responses

### Styling
- Plain CSS with nesting
- `globals.css` is for **common/root styles only**:
    - CSS variables (colors, spacing, typography)
    - Base resets and body styles
    - Common utility classes (`.container`, `.loading`, `.error`)
- **Page-level styles go in separate CSS files** (e.g., `HomePage.css`, `PortfolioPage.css`)
- Component-specific styles go alongside their components (e.g., `Header.css`)

#### CSS Nesting Rules
- **Always use nested structure** for related selectors (improves readability)
- Nest child selectors, pseudo-classes, and pseudo-elements inside their parent
- Nest `@media` queries inside the relevant selector block
- Example:
    ```css
    .parent {
      color: blue;

      .child {
        color: red;
      }

      &:hover {
        color: green;
      }

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
    ```
- **Avoid flat selectors** like `.parent .child { }` when nesting is clearer

### Schemas (Zod)
- **Do not use a single monolithic schema file**
- Separate schemas by domain (e.g., `media.schema.ts`, `artwork.schema.ts`, `portfolio.schema.ts`)
- Use `schemas/index.ts` only for re-exports

---

## Backend (Payload CMS)

Payload is embedded in the Next.js app — no separate backend service.
Custom logic (hooks, access control, collections) lives in `src/collections/` and `src/globals/`.

---

## Storage

- `BLOB_READ_WRITE_TOKEN` present → Vercel Blob
- Not present → local `media/` directory

---

## Configuration (PKL)

- PKL generates `config.json` (used for local tooling only)
- `pkl/configs` contain env-specific values (gitignored)
- `pkl/schemas` define structure and validation
- Runtime config uses environment variables (`.env`)

---

## Notes

- Never commit sensitive info (API keys, secrets, `.env`)
- FE and CMS are one unified Next.js app — no separate services
- Database schema changes are handled manually — no migration workflow
