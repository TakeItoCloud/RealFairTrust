// Home — / (PT) · /en (EN). REVISION RH4: rebuilt to the full-bleed marketing-kit Home (home
// handoff): full-bleed video hero · "Top este mês" merit spotlight (featured #1 on a gold-glow
// pedestal + floating "+6 lugares" badge, then a 3-card row) · champagne "Como funciona" (slim
// fades) · featured listings · "Para consultores" gold-glow CTA. Champagne is confined to
// "Como funciona" + the (shared) footer. Server component; data via lib/data; copy via next-intl.
import { getTranslations } from 'next-intl/server'
import { getConsultants, getListings } from '@/lib/data'
import { Link } from '@/i18n/navigation'
import { Button, Eyebrow, SectionWrapper } from '@/components/ui'
import { ConsultantCard, PropertyCard, Reveal } from '@/components'
import { IconArrowRight, IconBarChart, IconSparkUp, IconStar, IconUsers } from '@/components/ui/icons'
import { HeroFullBleed } from '@/components/home/HeroFullBleed'
import { HowItWorks } from '@/components/home/HowItWorks'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  const [ranked, listings] = await Promise.all([getConsultants({ view: 'ranked' }), getListings()])
  const featuredConsultant = ranked[0] ?? null
  const rowConsultants = ranked.slice(1, 4)
  const featuredListings = listings.slice(0, 3)

  return (
    <>
      {/* 1 · HERO — full-bleed cinematic */}
      <HeroFullBleed
        line1={t('hero.line1')}
        line2={t('hero.line2')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.ctaFind')}
        ctaPrimaryHref="/consultores"
        ctaSecondary={t('hero.ctaView')}
        ctaSecondaryHref="/comprar"
        scrollCue={t('hero.scrollCue')}
        ariaLabel={`${t('hero.line1')} ${t('hero.line2')}`}
        beats={[
          { word: 'Real', phrase: t('brand.realPhrase') },
          { word: 'Fair', phrase: t('brand.fairPhrase') },
          { word: 'Trust', phrase: t('brand.trustPhrase') },
        ]}
      />

      {/* 2 · TOP ESTE MÊS — merit spotlight (navy) */}
      <SectionWrapper tone="dark">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t('topMonth.eyebrow')}</Eyebrow>
            <h2 className="mt-2 text-section text-cream">{t('topMonth.title')}</h2>
          </div>
          <Link
            href="/consultores"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] underline-offset-4 hover:underline"
          >
            {t('topMonth.seeAll')} <IconArrowRight className="text-base" aria-hidden />
          </Link>
        </Reveal>

        {/* Featured #1 — gold-glow pedestal + floating "+6 lugares" badge */}
        {featuredConsultant ? (
          <div className="relative mx-auto mt-10 max-w-[620px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -bottom-5 -top-11"
              style={{ background: 'radial-gradient(56% 58% at 50% 30%, rgba(227,168,18,0.20), transparent 72%)' }}
            />
            <div className="relative" style={{ filter: 'drop-shadow(0 40px 72px rgba(2,8,18,0.6))' }}>
              <ConsultantCard consultant={featuredConsultant} featured index={0} />
              <div className="absolute -top-4 right-5 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--green-border)] bg-[var(--surface-card-solid)] px-3.5 py-2 shadow-[var(--shadow-green-glow)]">
                <IconSparkUp className="text-base text-verified" aria-hidden />
                <span className="text-[12.5px] font-semibold text-verified">{t('topMonth.floatingBadge')}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Ranks #2–#4 */}
        {rowConsultants.length > 0 ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {rowConsultants.map((c, i) => (
              <ConsultantCard key={c.id} consultant={c} index={i + 1} />
            ))}
          </div>
        ) : null}
      </SectionWrapper>

      {/* 3 · COMO FUNCIONA — champagne, slim fades */}
      <HowItWorks />

      {/* 4 · IMÓVEIS EM DESTAQUE (navy) */}
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
          {featuredListings.map((l, i) => (
            <PropertyCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* 5 · PARA CONSULTORES — gold-glow CTA panel (navy) */}
      <SectionWrapper tone="dark">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gold-border)] p-10 md:p-14"
            style={{
              background: 'linear-gradient(135deg, rgba(18,42,79,0.92), rgba(8,20,40,0.96))',
              boxShadow: 'var(--shadow-gold-glow)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-28 h-[420px] w-[420px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(227,168,18,0.18), transparent 70%)' }}
            />
            <div className="relative flex max-w-[600px] flex-col gap-5">
              <Eyebrow>{t('agentCta.eyebrow')}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-[-0.018em] text-cream sm:text-5xl lg:text-[length:var(--fs-display-2)]">
                {t.rich('agentCta.title', { gold: (chunks) => <span className="gold-title">{chunks}</span> })}
              </h2>
              <p className="text-[17px] leading-[1.62] text-[var(--text-body)]">{t('agentCta.body1')}</p>
              <p className="text-[17px] leading-[1.62] text-[var(--text-body)]">{t('agentCta.body2')}</p>
              <ul className="mt-1 flex flex-wrap gap-x-7 gap-y-3">
                <li className="inline-flex items-center gap-2.5 text-[14.5px] font-medium text-cream">
                  <IconStar className="text-lg text-gold" aria-hidden /> {t('agentCta.feature1')}
                </li>
                <li className="inline-flex items-center gap-2.5 text-[14.5px] font-medium text-cream">
                  <IconBarChart className="text-lg text-gold" aria-hidden /> {t('agentCta.feature2')}
                </li>
                <li className="inline-flex items-center gap-2.5 text-[14.5px] font-medium text-cream">
                  <IconUsers className="text-lg text-gold" aria-hidden /> {t('agentCta.feature3')}
                </li>
              </ul>
              <div className="mt-2">
                <Link href="/consultores/aderir">
                  <Button size="lg">{t('agentCta.button')}</Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  )
}
