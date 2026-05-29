// Root layout — owns the HTML shell.
// lang attribute is set by app/[locale]/layout.tsx via suppressHydrationWarning;
// Phase 4 will read the locale from middleware headers and set it here properly.
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RealFairTrust',
  description: 'Merit-based real estate marketplace for Portugal.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
