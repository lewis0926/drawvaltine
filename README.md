# Drawvaltine

Personal art portfolio website with React frontend and Strapi CMS backend.

## Prerequisites

- Docker and Docker Compose
- PKL CLI (optional, for config generation)

## Quick Start

Start the development environment:

```bash
docker-compose up
```

This will start:
- Frontend at http://localhost:5173
- Strapi admin at http://localhost:1337/admin

## Project Structure

```
drawvaltine/
├── frontend/          # React + Vite + TypeScript
├── backend/           # Strapi CMS
├── configs/           # PKL configuration
└── docker-compose.yml
```

## Development

### Frontend

The frontend uses:
- React with TypeScript
- Vite for bundling
- TanStack Query for data fetching
- Zod for API response validation

Source files are volume-mounted for hot-reload.

### Backend

The backend uses:
- Strapi CMS with TypeScript
- SQLite database
- Local file uploads

On first run, access the Strapi admin panel to create your admin account.

### Configuration

Environment-specific configuration is managed with PKL:

```bash
# Generate config.json from local.pkl
pkl eval configs/local.pkl -f json -o config.json
```

## Volumes

Persistent data is stored in:
- `./backend/database/` - SQLite database
- `./backend/public/uploads/` - Uploaded media files
