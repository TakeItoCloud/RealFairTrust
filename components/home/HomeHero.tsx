'use client'

// HomeHero — split hero (Decision #25): value proposition + inline search on the left,
// a poster-first media panel on the right with a "Top this month" proof card surfacing
// the current #1 consultant. Poster is an optimized gradient placeholder for now — no
// video yet (Decision #38); a real poster image drops in during 4.5.
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ConsultantSummary } from '@/lib/types'
import { Link, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { Avatar, Button, Eyebrow, Input, RankIndicator } from '@/components/ui'

export function HomeHero({ topConsultant }: { topConsultant: ConsultantSummary | null }) {
  const t = useTranslations('home.hero')
  const tc = useTranslations('common')
  const ts = useTranslations('score')
  const router = useRouter()
  const [q, setQ] = useState('')

  return (
    // Transparent so the page-level navy glow (Decision #42) reads through the hero.
    <section>
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Left — value + search + CTAs */}
        <div>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          {/* Hero display heading — gold-title clip + hero type scale (Decision #45). */}
          <h1 className="mt-4 max-w-2xl text-balance gold-title font-display text-4xl leading-[1.05] tracking-[-0.015em] sm:text-5xl lg:text-[length:var(--fs-hero)] lg:leading-[1.03]">
            {t('headline')}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-cream-muted">{t('subtitle')}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              router.push({ pathname: '/comprar', query: q.trim() ? { q: q.trim() } : undefined })
            }}
            className="mt-7 flex max-w-md gap-2"
            role="search"
          >
            <Input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
            />
            <Button type="submit" variant="secondary">
              {tc('actions.search')}
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/consultores">
              <Button>{tc('cta.findConsultant')}</Button>
            </Link>
            <Link href="/comprar">
              <Button variant="ghost">{tc('cta.browseHomes')}</Button>
            </Link>
          </div>
        </div>

        {/* Right — poster + proof card */}
        <div className="relative">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line bg-linear-to-br from-surface via-ink-elev to-ink"
            role="img"
            aria-label={t('posterAlt')}
          >
            {/* subtle brand motif on the optimized poster placeholder */}
            <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,rgba(216,163,60,0.28),transparent_55%)]" aria-hidden />
          </div>

          {topConsultant ? (
            <div className="absolute inset-x-4 -bottom-5 rounded-lg border border-line bg-surface/95 p-4 shadow-2xl backdrop-blur sm:inset-x-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{ts('topThisMonth')}</p>
              <div className="mt-2 flex items-center gap-3">
                <Avatar src={topConsultant.photo} name={topConsultant.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate font-display text-cream">{topConsultant.name}</p>
                  <p className="truncate text-xs text-cream-muted">
                    {ts('closeRate')} {topConsultant.score?.sub.closeRate}%
                  </p>
                </div>
                <RankIndicator rank={topConsultant.score?.rank ?? 1} label={ts('rank')} className="ml-auto" />
              </div>
              <Link
                href={{ pathname: '/consultores/[slug]', params: { slug: topConsultant.slug } }}
                className={cn('mt-3 inline-block text-sm font-medium text-gold underline-offset-2 hover:underline')}
              >
                {tc('actions.viewProfile')}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
