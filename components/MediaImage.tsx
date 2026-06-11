'use client'

// MediaImage — <img> with a graceful Midnight Gold placeholder. The seed listing media
// paths don't exist yet, so a broken image (with its alt text) must never show: the
// placeholder sits underneath and the image only becomes visible once it has loaded. A
// mount check resolves load/error events that fired before React hydration.
// next/image optimization is deferred to milestone 4.5.
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

interface MediaImageProps {
  src?: string
  alt: string
  className?: string
}

function Placeholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface to-ink-elev" aria-hidden>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gold/40">
        <path
          d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function MediaImage({ src, alt, className }: MediaImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(!src)

  useEffect(() => {
    const img = imgRef.current
    if (!img || !img.complete) return
    // Reconcile a load/error that fired before hydration from the element's final state.
    const setter = img.naturalWidth > 0 ? setLoaded : setErrored
    setter(true)
  }, [])

  const showImage = src && !errored

  return (
    <div role="img" aria-label={alt} className={cn('relative h-full w-full', className)}>
      <Placeholder />
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- needs onError fallback; next/image in 4.5
        <img
          ref={imgRef}
          src={src}
          alt=""
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-200',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      ) : null}
    </div>
  )
}
