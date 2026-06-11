'use client'

// Avatar — consultant/user image with a graceful initials fallback. The seed photo
// paths don't exist yet, so a broken <img> must never render: on error (or with no src)
// we show initials on a gold-tinted disc.
import { useState } from 'react'
import { cn } from '@/lib/cn'

interface AvatarProps {
  /** May point at a not-yet-existing path; failures fall back to initials. */
  src?: string
  /** Full name — drives the initials and the alt text. */
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
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

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-gold/15 font-display font-semibold text-gold ring-1 ring-line select-none',
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- needs onError fallback; next/image optimization comes in 4.5
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-label={name} role="img">
          {initials(name)}
        </span>
      )}
    </span>
  )
}
