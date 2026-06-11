'use client'

// Pagination — controlled prev / pages / next. Keyboard-operable; current page marked
// with aria-current. Collapses long ranges with ellipses.
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/cn'
import { focusRing } from '@/components/ui/styles'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

/** Page numbers to render, with `'…'` gaps. Always shows first, last, and neighbours. */
function pageList(page: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, page, page - 1, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out: (number | 'gap')[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) out.push('gap')
    out.push(p)
    prev = p
  }
  return out
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const t = useTranslations('pagination')
  if (totalPages <= 1) return null

  const cellBase = cn(
    'inline-flex h-10 min-w-10 items-center justify-center rounded-md px-2 text-sm transition-colors',
    focusRing,
  )

  return (
    <nav aria-label={t('page', { page, total: totalPages })} className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        className={cn(cellBase, 'text-cream-muted hover:text-cream disabled:opacity-40 disabled:hover:text-cream-muted')}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        {t('previous')}
      </button>

      {pageList(page, totalPages).map((p, i) =>
        p === 'gap' ? (
          <span key={`gap-${i}`} className="px-1 text-cream-muted" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            className={cn(cellBase, p === page ? 'bg-gold font-semibold text-ink' : 'text-cream-muted hover:text-cream')}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(cellBase, 'text-cream-muted hover:text-cream disabled:opacity-40 disabled:hover:text-cream-muted')}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        {t('next')}
      </button>
    </nav>
  )
}
