import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header } from './components/Header'
import { Providers } from './providers'
import './globals.css'

export async function generateMetadata() {
  const payload = await getPayload({ config: await config })

  const seo = await payload.findGlobal({ slug: 'seo-settings' }).catch(() => null)

  const siteName = seo?.siteName || 'Drawvaltine'
  const description = seo?.metaDescription ?? undefined
  const ogDescription = seo?.ogDescription ?? description
  const faviconUrl = typeof seo?.favicon === 'object' && seo.favicon?.url ? seo.favicon.url : undefined
  const ogImageUrl = typeof seo?.ogImage === 'object' && seo.ogImage?.url ? seo.ogImage.url : undefined

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
    openGraph: {
      siteName,
      description: ogDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
