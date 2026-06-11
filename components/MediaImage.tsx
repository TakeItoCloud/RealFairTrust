'use client'

// MediaImage — <img> with a graceful placeholder. The seed listing media paths don't
// exist yet, so on error (or with no src) we render a gold-tinted placeholder instead of
// a broken image. next/image optimization is deferred to milestone 4.5.
import { useState } from 'react'
import { cn } from '@/lib/cn'

interface MediaImageProps {
  src?: string
  alt: string
  className?: string
}

export function MediaImage({ src, alt, className }: MediaImageProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- needs onError fallback; next/image in 4.5
      <img src={src} alt={alt} className={cn('h-full w-full object-cover', className)} onError={() => setFailed(true)} />
    )
  }

  return (
    <div
      className={cn('flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-ink-elev', className)}
      role="img"
      aria-label={alt}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold/40">
        <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
