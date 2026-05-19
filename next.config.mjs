import { withPayload } from '@payloadcms/next/withPayload'

const remotePatterns = [
  { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
]

if (process.env.S3_PUBLIC_URL) {
  remotePatterns.push({
    protocol: 'https',
    hostname: new URL(process.env.S3_PUBLIC_URL).hostname,
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
