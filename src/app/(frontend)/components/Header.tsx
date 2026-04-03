'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Header.css'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="header-content">
        <Link href="/" className="site-title">Drawvaltine</Link>
        <nav className="nav">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className={`nav-link ${pathname === '/portfolio' ? 'active' : ''}`}
          >
            Portfolio
          </Link>
        </nav>
      </div>
    </header>
  )
}
