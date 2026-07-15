// About — /sobre (PT) · /en/about (EN)
// Job: the brand story — why merit-first, why the rolling window. Pure content (no data);
// Reveal (client) provides the reduced-motion-safe entrance. Same section vocabulary as
// Home / Como funciona (navy stage + champagne band + primitives).
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button, Eyebrow, SectionWrapper } from '@/components/ui'
import { IconArrowRight, IconCheck, IconGlobe, IconScale, IconTrophy } from '@/components/ui/icons'
import { Reveal } from '@/components'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sobre' })
  return { title: t('h1'), description: t('lead') }
}

const PRINCIPLES: { key: string; icon: ReactNode }[] = [
  { key: 'merit', icon: <IconTrophy /> },
  { key: 'fairness', icon: <IconScale /> },
  { key: 'honesty', icon: <IconCheck /> },
  { key: 'portugal', icon: <IconGlobe /> },
]

export default async function SobrePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sobre' })

  return (
    <>
      {/* Navy hero */}
      <SectionWrapper tone="dark" size="lg">
        <div className="max-w-3xl">
          <h1 className="text-section text-cream">{t('h1')}</h1>
          <p className="mt-4 text-lg text-cream-muted">{t('lead')}</p>
        </div>
      </SectionWrapper>

      {/* Champagne band — problem / response (two-column desktop, stacked mobile) */}
      <section className="rft-champagne rft-champagne--fade-both">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <h2 className="text-subsection text-[var(--champagne-ink)]">{t('problemTitle')}</h2>
              <p className="mt-3 text-[var(--champagne-ink-muted)]">{t('problemBody')}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-subsection text-[var(--champagne-ink)]">{t('responseTitle')}</h2>
              <p className="mt-3 text-[var(--champagne-ink-muted)]">{t('responseBody')}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Navy — principles (4 tiles) */}
      <SectionWrapper tone="dark" size="md">
        <Eyebrow>{t('principlesTitle')}</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.key}
              delay={i * 0.06}
              className="rounded-[var(--card-radius)] border border-line bg-[var(--surface-card-solid)] p-[var(--card-pad)]"
            >
              <span className="inline-flex text-2xl text-gold" aria-hidden>
                {p.icon}
              </span>
              <h3 className="mt-3 font-display text-[19px] font-semibold text-cream">
                {t(`principles.${p.key}.title`)}
              </h3>
              <p className="mt-1.5 text-meta text-cream-muted">{t(`principles.${p.key}.body`)}</p>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA band */}
      <SectionWrapper tone="dark" size="md">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gold-border)] px-6 py-12 text-center md:px-12"
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
            <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/consultores">
                <Button size="lg">
                  {t('cta.consultants')}
                  <IconArrowRight className="text-base" aria-hidden />
                </Button>
              </Link>
              <Link href="/como-funciona">
                <Button size="lg" variant="secondary">
                  {t('cta.howItWorks')}
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  )
}
