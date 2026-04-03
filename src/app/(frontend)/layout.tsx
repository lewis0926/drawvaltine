import React from 'react'
import { Header } from './components/Header'
import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'Drawvaltine',
  description: 'Art portfolio',
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
