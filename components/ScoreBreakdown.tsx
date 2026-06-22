'use client'

// ScoreBreakdown — the five sub-signals as bars against a target band. The composite
// number is revealed only when confidence is high (Decision #18); otherwise we show the
// "building track record" state. Bar fills animate with a motion-safe transition.
import { useTranslations } from 'next-intl'
import type { PerformanceScore, PerformanceSubScores } from '@/lib/types'
import { RATING_WEIGHTS } from '@/lib/types'
import { Badge, Card, PerformanceBadge } from '@/components/ui'

const SIGNALS: { key: keyof PerformanceSubScores; labelKey: string }[] = [
  { key: 'satisfaction', labelKey: 'satisfaction' },
  { key: 'closeRate', labelKey: 'closeRate' },
  { key: 'responsiveness', labelKey: 'responsiveness' },
  { key: 'conversion', labelKey: 'conversion' },
  { key: 'activity', labelKey: 'activity' },
]

interface ScoreBreakdownProps {
  score: PerformanceScore
  /** Centre of the target band (0–100). */
  target?: number
  /** Half-width of the target band. */
  band?: number
  className?: string
}

export function ScoreBreakdown({ score, target = 80, band = 5, className }: ScoreBreakdownProps) {
  const t = useTranslations('score')
  const revealComposite = score.confidence === 'high'

  return (
    <Card variant="default" padding={20} className={className}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.14em] text-cream-muted">{t('composite')}</span>
        {revealComposite ? (
          <PerformanceBadge variant="score" label={t('composite')} value={score.composite} />
        ) : (
          <Badge variant="neutral">{t('buildingTrackRecord')}</Badge>
        )}
      </div>

      <ul className="space-y-4">
        {SIGNALS.map(({ key, labelKey }) => {
          const value = score.sub[key]
          return (
            <li key={key}>
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="flex items-baseline gap-1.5 text-cream-muted">
                  {t(labelKey)}
                  {/* weight (#16: 35/25/15/15/10) */}
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-cream-muted">
                    {Math.round(RATING_WEIGHTS[key] * 100)}%
                  </span>
                </span>
                <span className="font-display text-cream tabular-nums">{value}</span>
              </div>
              <div
                className="relative h-2 w-full rounded-full bg-cream/10"
                role="meter"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t(labelKey)}
              >
                {/* target band */}
                <span
                  className="absolute inset-y-0 rounded-full bg-cream/10"
                  style={{ left: `${target - band}%`, width: `${band * 2}%` }}
                  aria-hidden
                />
                {/* target centre marker */}
                <span className="absolute inset-y-[-2px] w-px bg-cream-muted" style={{ left: `${target}%` }} aria-hidden />
                {/* value fill */}
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                  aria-hidden
                />
              </div>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 text-xs text-cream-muted">
        {t('target')}: {target}
      </p>
    </Card>
  )
}
