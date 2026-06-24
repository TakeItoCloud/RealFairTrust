'use client'

// HomeHero — REVISION R4: rebuilt to the marketing kit's Home hero (#F). Two columns on the
// navy stage (dark-first, #33): left = value + an inline search-PILL (city Select + search Input
// + primary "Procurar" → /consultores) + a lucide trust row; right = a featured ConsultantCard
// (the AgentCard "Spotlight" spec, #G) with a floating "raised" stat card + a soft gold glow.
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ConsultantSummary } from '@/lib/types'
import { useRouter } from '@/i18n/navigation'
import { Button, Card, Eyebrow, Input, Select } from '@/components/ui'
import { IconPin, IconRefresh, IconSearch, IconSparkUp, IconVerified } from '@/components/ui/icons'
import { ConsultantCard } from '@/components/ConsultantCard'
import { Reveal } from '@/components/Reveal'

export function HomeHero({ topConsultant }: { topConsultant: ConsultantSummary | null }) {
  const t = useTranslations('home.hero')
  const router = useRouter()
  const [city, setCity] = useState('Lisboa')
  const [q, setQ] = useState('')

  const trust = [
    { Icon: IconVerified, label: t('trustVerified') },
    { Icon: IconRefresh, label: t('trustMonthly') },
    { Icon: IconPin, label: t('trustCities') },
  ]

  return (
    // Transparent so the page-level navy radial reads through the hero (dark-first, #33).
    <section>
      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        {/* Left — value + search pill + trust row */}
        <div className="flex flex-col gap-6">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="max-w-xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.015em] text-cream sm:text-5xl lg:text-[length:var(--fs-display-1)] lg:leading-[1.02]">
            {t.rich('headline', { gold: (chunks) => <span className="gold-title">{chunks}</span> })}
          </h1>
          <p className="max-w-md text-lead text-[var(--text-body)]">{t('subtitle')}</p>

          {/* Search pill — raised Card, pill radius, holds city Select + search Input + Procurar */}
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              router.push({
                pathname: '/consultores',
                query: { ...(city ? { cidade: city } : {}), ...(q.trim() ? { q: q.trim() } : {}) },
              })
            }}
            className="w-full max-w-[520px]"
          >
            <Card
              variant="raised"
              padding={8}
              style={{ borderRadius: 'var(--radius-pill)' }}
              className="flex items-stretch gap-2"
            >
              <div className="w-[122px] shrink-0">
                <Select
                  options={['Lisboa', 'Porto']}
                  value={city}
                  onValueChange={setCity}
                  aria-label={t('cityLabel')}
                />
              </div>
              <div className="relative flex-1">
                <IconSearch
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-cream-muted"
                  aria-hidden
                />
                <Input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  aria-label={t('searchPlaceholder')}
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="primary">
                {t('searchButton')}
              </Button>
            </Card>
          </form>

          {/* Trust row */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {trust.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[13px] text-cream-muted">
                <Icon className="text-base text-gold" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — featured ConsultantCard + floating stat + gold glow */}
        {topConsultant ? (
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-12 h-80 w-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(227,168,18,0.16), transparent 70%)', filter: 'blur(8px)' }}
            />
            <div className="relative">
              <ConsultantCard consultant={topConsultant} featured />
              <Reveal delay={0.15} className="absolute -bottom-5 -left-5">
                {/* R4 AA: default (.035) fill, not raised (.06) — keeps cream-muted caption at
                    4.66:1 over the hero's bright centre (raised would drop it to 4.38). */}
                <Card variant="default" padding={16} className="flex items-center gap-3 shadow-[var(--shadow-raised)]">
                  <IconSparkUp className="text-xl text-verified" aria-hidden />
                  <p className="text-[12.5px] leading-tight text-cream-muted">
                    <b className="font-semibold text-cream">{t('statValue')}</b>
                    <br />
                    {t('statCaption')}
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
