'use client'

// ReviewItem — one verified review: overall stars (mean of the four dimensions),
// client reference, date, and comment.
import { useLocale, useTranslations } from 'next-intl'
import type { Locale, Review } from '@/lib/types'
import { formatDate } from '@/lib/format'
import { StarRating, VerifiedBadge } from '@/components/ui'

function overall(review: Review): number {
  const { communication, knowledge, negotiation, responsiveness } = review.dimensions
  return Math.round(((communication + knowledge + negotiation + responsiveness) / 4) * 10) / 10
}

export function ReviewItem({ review }: { review: Review }) {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const rating = overall(review)

  return (
    <article className="rounded-[var(--radius-lg)] border border-line bg-[var(--surface-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-[var(--blur-panel)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <StarRating value={rating} size="sm" label={t('score.reviews')} />
          <span className="font-display text-sm text-cream tabular-nums">{rating.toFixed(1)}</span>
        </div>
        {review.verified ? <VerifiedBadge label={t('score.verified')} iconOnly size="sm" /> : null}
      </div>
      <p className="mt-3 text-sm text-cream">{review.comment}</p>
      <p className="mt-2 text-xs text-cream-muted">
        {review.clientRef} · {formatDate(review.createdAt, locale)}
      </p>
    </article>
  )
}
