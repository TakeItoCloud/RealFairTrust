// How rating works — /como-funciona (PT) · /en/how-it-works (EN)
// Job: earn trust via transparency about the periodic performance rating engine. Client-facing,
// light. Pure content (no data); Reveal (client) provides the reduced-motion-safe entrance.
// The deep, linkable rating-model spec lives on /metodologia (Decision #87).
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RATING_WEIGHTS } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { Button, Eyebrow, SectionWrapper, StatBlock } from '@/components/ui'
import { IconArrowRight, IconVerified } from '@/components/ui/icons'
import { Reveal } from '@/components'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'comoFunciona' })
  return { title: t('h1'), description: t('lead') }
}

export default async function ComoFuncionaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'comoFunciona' })

  const steps = (['s1', 's2', 's3'] as const).map((k) => ({
    title: t(`steps.${k}.title`),
    body: t(`steps.${k}.body`),
  }))
  // Five weights as a compact strip, in the canonical order + percentages (Decision #16).
  const weights = [
    { key: 'satisfaction', pct: RATING_WEIGHTS.satisfaction },
    { key: 'closeRate', pct: RATING_WEIGHTS.closeRate },
    { key: 'response', pct: RATING_WEIGHTS.responsiveness },
    { key: 'conversion', pct: RATING_WEIGHTS.conversion },
    { key: 'activity', pct: RATING_WEIGHTS.activity },
  ] as const

  return (
    <>
      {/* Navy hero */}
      <SectionWrapper tone="dark" size="lg">
        <div className="max-w-3xl">
          <h1 className="text-section text-cream">{t('h1')}</h1>
          <p className="mt-4 text-lg text-cream-muted">{t('lead')}</p>
        </div>
      </SectionWrapper>

      {/* Champagne band — the three numbered steps */}
      <section className="rft-champagne rft-champagne--fade-both">
        <div className="container-page py-20 md:py-24">
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={i}>
                <Reveal delay={i * 0.08} className="rft-step-card flex h-full flex-col gap-3.5">
                  <span className="rft-step-coin" aria-hidden>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <h3 className="text-[21px]">{s.title}</h3>
                  <p className="text-[14.5px] leading-relaxed">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Navy — "the score in 60 seconds" */}
      <SectionWrapper tone="dark" size="md">
        <div className="max-w-2xl">
          <Eyebrow>{t('score60.title')}</Eyebrow>
          <p className="mt-3 text-lg text-cream-muted">{t('score60.intro')}</p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {weights.map((w) => (
            <StatBlock
              key={w.key}
              gold
              value={`${Math.round(w.pct * 100)}%`}
              label={t(`weights.${w.key}`)}
            />
          ))}
        </dl>

        <p className="mt-8 max-w-2xl text-cream-muted">{t('score60.window')}</p>

        <Link
          href="/metodologia"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] underline-offset-4 hover:underline"
        >
          {t('score60.linkText')} <span className="text-gold">{t('score60.linkLabel')}</span>
          <IconArrowRight className="text-base" aria-hidden />
        </Link>

        {/* Green = verification note — the ONLY verified-green use on this page (#34). */}
        <div className="mt-10 flex max-w-2xl items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--green-border)] bg-[var(--surface-card-solid)] px-5 py-4">
          <IconVerified className="mt-0.5 shrink-0 text-xl text-verified" aria-hidden />
          <p className="text-meta text-verified-strong">{t('greenNote')}</p>
        </div>
      </SectionWrapper>

      {/* Dual CTA band */}
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
            <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/consultores">
                <Button size="lg">
                  {t('cta.findConsultant')}
                  <IconArrowRight className="text-base" aria-hidden />
                </Button>
              </Link>
              <Link href="/vender">
                <Button size="lg" variant="secondary">
                  {t('cta.sell')}
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  )
}
