// Root layout — owns the HTML shell and font CSS variables.
// lang is not locale-aware yet (root layout can't read [locale] params);
// Phase 4 will set it from the middleware-injected header.
import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const display = Fraunces({ subsets: ['latin'], variable: '--rft-font-display', display: 'swap' })
const sans    = Inter({    subsets: ['latin'], variable: '--rft-font-sans',    display: 'swap' })

export const metadata: Metadata = {
  title: 'RealFairTrust',
  description: 'Merit-based real estate marketplace for Portugal.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
