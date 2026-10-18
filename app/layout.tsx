import './globals.css'
import type { Metadata, Viewport } from 'next'
export const metadata: Metadata = {
  title: 'Vault & Split',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Vault & Split', statusBarStyle: 'default' },
  icons: { apple: '/icons/apple-touch-icon.png' },
}
export const viewport: Viewport = { themeColor: '#0071E3', viewportFit: 'cover' }
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
