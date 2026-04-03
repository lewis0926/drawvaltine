# Drawvaltine

Personal art portfolio website — Next.js + Payload CMS, deployed on Vercel with Neon (PostgreSQL) and Vercel Blob.

## Stack

- **Framework**: Next.js (App Router)
- **CMS**: Payload CMS (embedded)
- **Database**: Neon (PostgreSQL)
- **Storage**: Vercel Blob (optional — falls back to local when `BLOB_READ_WRITE_TOKEN` is not set)
- **Deployment**: Vercel

## Getting started

Generate your `.env` from PKL:

```bash
bun run env local
```

Install dependencies and start the dev server:

```bash
bun i
bun run dev
```

App runs at [http://localhost:3000](http://localhost:3000). Admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

## Configuration

Environment values are managed with PKL:

```bash
bun run env local       # uses pkl/configs/local.pkl
bun run env production  # uses pkl/configs/production.pkl
```

Config fields: `databaseUrl`, `payloadSecret`, `blobReadWriteToken` (optional).

## Seed

Populate the database with sample content:

```bash
bun run seed
```
