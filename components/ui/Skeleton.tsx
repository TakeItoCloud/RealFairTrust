// Skeleton — loading placeholder. Pulse is reduced-motion-safe (motion-safe: only).
import { cn } from '@/lib/cn'

interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle'
  className?: string
  /** Decorative by default; pass a label to announce loading to screen readers. */
  label?: string
}

const variantClasses: Record<NonNullable<SkeletonProps['variant']>, string> = {
  text: 'h-4 w-full rounded-sm',
  rect: 'h-full w-full rounded-md',
  circle: 'aspect-square rounded-full',
}

export function Skeleton({ variant = 'text', className, label }: SkeletonProps) {
  return (
    <span
      className={cn(
        'block bg-cream/10 motion-safe:animate-pulse',
        variantClasses[variant],
        className,
      )}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
