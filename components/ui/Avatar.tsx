'use client'

// Avatar — consultant/user image with a graceful initials fallback. The seed photo paths
// don't exist yet, so a broken <img> (with its alt text) must never show. The initials sit
// underneath and the image only becomes visible once it has actually loaded; a mount check
// resolves load/error events that fired before React hydration could attach the handlers.
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

interface AvatarProps {
  /** May point at a not-yet-existing path; failures fall back to initials. */
  src?: string
  /** Full name — drives the initials and the alt text. */
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Gold-gradient ring (border-box layering) — reserve for featured / top-ranked (§2.13). */
  ring?: boolean
  className?: string
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase() || '?'
}

export function Avatar({ src, name, size = 'md', ring = false, className }: AvatarProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(!src)

  useEffect(() => {
    const img = imgRef.current
    if (!img || !img.complete) return
    // The load/error fired before hydration — reconcile from the element's final state.
    const setter = img.naturalWidth > 0 ? setLoaded : setErrored
    setter(true)
  }, [])

  const showImage = src && !errored

  const avatar = (
    <span
      role="img"
      aria-label={name}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-gold/15 font-display font-semibold text-gold select-none',
        ring ? 'ring-0' : 'ring-1 ring-line',
        sizeClasses[size],
        !ring && className,
      )}
    >
      <span aria-hidden className="absolute inset-0 flex items-center justify-center">
        {initials(name)}
      </span>
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- needs onError fallback; next/image optimization comes in 4.5
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
    </span>
  )

  if (!ring) return avatar

  // Gold-gradient ring via border-box layering: the inner avatar sits inside a 2px gradient frame.
  return (
    <span
      className={cn('inline-block shrink-0 rounded-full', className)}
      style={{ padding: 2, background: 'var(--gradient-gold-title)', borderRadius: 9999 }}
    >
      {avatar}
    </span>
  )
}
