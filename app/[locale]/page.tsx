// Home — / (PT) · /en (EN). Server component: fetches via lib/data and composes the
// page from existing components. Interactive bits (hero search, step animation) live in
// the client components under components/home/.
import { getTranslations } from 'next-intl/server'
import { getConsultants, getListings } from '@/lib/data'
import { Link } from '@/i18n/navigation'
import { Button, Card, Eyebrow, SectionWrapper } from '@/components/ui'
import { ConsultantCard, PropertyCard } from '@/components'
import { IconCheck } from '@/components/ui/icons'
import { HomeHero } from '@/components/home/HomeHero'
import { HowItWorks } from '@/components/home/HowItWorks'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  const [ranked, listings] = await Promise.all([getConsultants({ view: 'ranked' }), getListings()])
  const topConsultant = ranked[0] ?? null
  const topConsultants = ranked.slice(0, 3)
  const featured = listings.slice(0, 6)

  return (
    <>
      <HomeHero topConsultant={topConsultant} />

      <HowItWorks />

      {/* Top consultants */}
      <SectionWrapper tone="dark">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t('topConsultants.eyebrow')}</Eyebrow>
            <h2 className="mt-2 text-section text-cream">{t('topConsultants.title')}</h2>
          </div>
          <Link href="/consultores">
            <Button variant="ghost">{tc('actions.seeAll')}</Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {topConsultants.map((c, i) => (
            <ConsultantCard key={c.id} consultant={c} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Featured listings — navy stage (frosted PropertyCards float on the radial) */}
      <SectionWrapper tone="dark">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t('featured.eyebrow')}</Eyebrow>
            <h2 className="mt-2 text-section text-cream">{t('featured.title')}</h2>
          </div>
          <Link href="/comprar">
            <Button variant="ghost">{tc('actions.seeAll')}</Button>
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l, i) => (
            <PropertyCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Clients / consultants split — IVORY light break (content; white Card panels) */}
      <SectionWrapper tone="ivory">
        <div className="grid gap-6 md:grid-cols-2">
          <Card variant="ivory" padding={32}>
            <h2 className="text-subsection text-[var(--text-ink-strong)]">{t('split.clientsTitle')}</h2>
            <p className="mt-2 text-[var(--text-ink-muted)]">{t('split.clientsDesc')}</p>
            <Link href="/consultores" className="mt-5 inline-block">
              <Button onLight>{tc('cta.findConsultant')}</Button>
            </Link>
          </Card>
          <Card variant="ivory" padding={32}>
            <h2 className="text-subsection text-[var(--text-ink-strong)]">{t('split.consultantsTitle')}</h2>
            <p className="mt-2 text-[var(--text-ink-muted)]">{t('split.consultantsDesc')}</p>
            <Link href="/consultores/aderir" className="mt-5 inline-block">
              <Button variant="secondary" onLight>
                {tc('cta.joinAsConsultant')}
              </Button>
            </Link>
          </Card>
        </div>
      </SectionWrapper>

      {/* Trust band */}
      <SectionWrapper tone="dark">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t('trust.eyebrow')}</Eyebrow>
          <h2 className="mt-3 text-section text-cream">{t('trust.title')}</h2>
          <p className="mt-3 text-lg text-cream-muted">{t('trust.desc')}</p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[t('trust.point1'), t('trust.point2'), t('trust.point3')].map((point) => (
            <li key={point} className="flex items-start gap-2 rounded-lg border border-line bg-ink-elev p-4">
              <span className="mt-0.5 text-verified" aria-hidden>
                <IconCheck className="text-lg" />
              </span>
              <span className="text-sm text-cream">{point}</span>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      {/* Join CTA — navy stage (signature gold-on-dark close) */}
      <SectionWrapper tone="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-section text-cream">{t('join.title')}</h2>
          <p className="mt-3 text-cream-muted">{t('join.desc')}</p>
          <Link href="/consultores/aderir" className="mt-6 inline-block">
            <Button size="lg">{t('join.button')}</Button>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
