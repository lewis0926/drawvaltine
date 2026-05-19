import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Artwork } from './collections/Artwork'
import { AboutPage } from './globals/AboutPage'
import { PortfolioPage } from './globals/PortfolioPage'
import { SeoSettings } from './globals/SeoSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function getStoragePlugin() {
  if (process.env.STORAGE_PROVIDER === 's3') {
    return s3Storage({
      bucket: process.env.S3_BUCKET ?? '',
      collections: {
        media: true,
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        endpoint: process.env.S3_ENDPOINT ?? '',
        forcePathStyle: true,
        region: process.env.S3_REGION ?? 'auto',
      },
    })
  }

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN
  if (blobToken) {
    return vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: blobToken,
    })
  }

  return null
}

const storagePlugin = getStoragePlugin()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Artwork],
  globals: [AboutPage, PortfolioPage, SeoSettings],
  editor: lexicalEditor(),
  email: () => ({
    name: 'noop',
    defaultFromAddress: '',
    defaultFromName: '',
    sendEmail: async () => {},
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    idType: 'uuid',
  }),
  sharp,
  plugins: [...(storagePlugin ? [storagePlugin] : [])],
})
