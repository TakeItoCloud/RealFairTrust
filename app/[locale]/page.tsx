// Home — / (PT) · /en (EN). REVISION R4: rebuilt to the marketing kit's Home (#F) — navy hero
// (search-pill + featured card + floating stat) · champagne HowItWorks · navy Leaderboard · navy
// FeaturedProperties · navy gold-bordered AgentCTA · champagne footer (shared layout). The old
// "Clients/consultants split" (ivory) and "Trust band" sections are dropped (not in the kit).
import { getTranslations } from 'next-intl/server'
import { getConsultants, getListings } from '@/lib/data'
import { Link } from '@/i18n/navigation'
import { Button, Eyebrow, SectionWrapper } from '@/components/ui'
import { ConsultantCard, PropertyCard } from '@/components'
import { IconArrowRight } from '@/components/ui/icons'
import { Reveal } from '@/components/Reveal'
import { HomeHero } from '@/components/home/HomeHero'
import { HowItWorks } from '@/components/home/HowItWorks'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  const [ranked, listings] = await Promise.all([getConsultants({ view: 'ranked' }), getListings()])
  const topConsultant = ranked[0] ?? null
  const topConsultants = ranked.slice(0, 3)
  const featured = listings.slice(0, 3)

  return (
    <>
      <HomeHero topConsultant={topConsultant} />

      <HowItWorks />

      {/* Leaderboard — navy stage; frosted ConsultantCards float on the radial */}
      <SectionWrapper tone="dark">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t('leaderboard.eyebrow')}</Eyebrow>
            <h2 className="mt-2 text-section text-cream">{t('leaderboard.title')}</h2>
          </div>
          <Link
            href="/consultores"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] underline-offset-4 hover:underline"
          >
            {t('leaderboard.seeAll')} <IconArrowRight className="text-base" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topConsultants.map((c, i) => (
            <ConsultantCard key={c.id} consultant={c} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Featured listings — navy stage */}
      <SectionWrapper tone="dark">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t('featured.eyebrow')}</Eyebrow>
            <h2 className="mt-2 text-section text-cream">{t('featured.title')}</h2>
          </div>
          <Link
            href="/comprar"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] underline-offset-4 hover:underline"
          >
            {t('featured.seeAll')} <IconArrowRight className="text-base" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l, i) => (
            <PropertyCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Agent CTA — navy gold-bordered panel (signature gold-on-dark close) */}
      <SectionWrapper tone="dark">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gold-border)] p-10 md:p-14"
            style={{
              background: 'linear-gradient(135deg, rgba(18,42,79,0.9), rgba(10,26,52,0.95))',
              boxShadow: 'var(--shadow-gold-glow)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(227,168,18,0.18), transparent 70%)' }}
            />
            <div className="relative flex max-w-xl flex-col gap-5">
              <Eyebrow>{t('agentCta.eyebrow')}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.014em] text-cream sm:text-5xl lg:text-[length:var(--fs-display-2)]">
                {t.rich('agentCta.title', { gold: (chunks) => <span className="gold-title">{chunks}</span> })}
              </h2>
              <p className="text-[var(--text-body)]">{t('agentCta.body')}</p>
              <div className="mt-1 flex flex-wrap gap-3.5">
                <Link href="/consultores/aderir">
                  <Button size="lg">{t('agentCta.apply')}</Button>
                </Link>
                <Link href="/como-funciona">
                  <Button variant="secondary" size="lg">
                    {t('agentCta.methodology')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  )
}
