// Methodology — /metodologia (PT) · /en/methodology (EN). NEW public route (Decision #87): the
// deep, linkable rating-model spec, deliberately separate from the client-facing /como-funciona.
// It also carries the DGT/CAOP data attribution (CC BY 4.0). Editorial long-form; pure content
// (no data) with reduced-motion-safe Reveal entrances. Confidence threshold is stated
// QUALITATIVELY — exact numeric thresholds are Phase 5 engine work (Decision #88).
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Badge, Button, Eyebrow, SectionWrapper } from '@/components/ui'
import { IconArrowRight } from '@/components/ui/icons'
import { Reveal } from '@/components'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metodologia' })
  return { title: t('h1'), description: t('lead') }
}

const SIGNAL_KEYS = ['satisfaction', 'closeRate', 'response', 'conversion', 'activity'] as const

function ChampagneBlock({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className="rft-champagne rft-champagne--fade-both">
      <div className="container-page py-16 md:py-20">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="champagne">{num}</Eyebrow>
          <h2 className="mt-2 text-section text-[var(--champagne-ink)]">{title}</h2>
          <div className="mt-4 text-[var(--champagne-ink-muted)]">{children}</div>
        </Reveal>
      </div>
    </section>
  )
}

function NavyBlock({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <SectionWrapper tone="dark" size="md">
      <Reveal>
        <Eyebrow>{num}</Eyebrow>
        <h2 className="mt-2 text-section text-cream">{title}</h2>
        <div className="mt-4">{children}</div>
      </Reveal>
    </SectionWrapper>
  )
}

export default async function MetodologiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metodologia' })
  const ts = await getTranslations({ locale, namespace: 'score' })

  return (
    <>
      {/* Navy hero */}
      <SectionWrapper tone="dark" size="lg">
        <div className="max-w-3xl">
          <h1 className="text-section text-cream">{t('h1')}</h1>
          <p className="mt-4 text-lg text-cream-muted">{t('lead')}</p>
        </div>
      </SectionWrapper>

      {/* §1 — champagne */}
      <ChampagneBlock num={t('s1.num')} title={t('s1.title')}>
        <p>{t('s1.body')}</p>
      </ChampagneBlock>

      {/* §2 — navy — the five signals as a table */}
      <NavyBlock num={t('s2.num')} title={t('s2.title')}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-4 text-eyebrow font-semibold text-cream-muted">{t('s2.cols.signal')}</th>
                <th className="py-3 pr-4 text-eyebrow font-semibold text-cream-muted">{t('s2.cols.weight')}</th>
                <th className="py-3 pr-4 text-eyebrow font-semibold text-cream-muted">{t('s2.cols.measures')}</th>
                <th className="py-3 text-eyebrow font-semibold text-cream-muted">{t('s2.cols.why')}</th>
              </tr>
            </thead>
            <tbody>
              {SIGNAL_KEYS.map((k) => (
                <tr key={k} className="border-b border-line/60 align-top">
                  <td className="py-4 pr-4 font-medium text-cream">{t(`s2.rows.${k}.signal`)}</td>
                  <td className="py-4 pr-4">
                    <span className="gold-title font-display text-[28px] font-semibold leading-none">
                      {t(`s2.rows.${k}.weight`)}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-meta text-cream-muted">{t(`s2.rows.${k}.measures`)}</td>
                  <td className="py-4 text-meta text-cream-muted">{t(`s2.rows.${k}.why`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NavyBlock>

      {/* §3 — champagne */}
      <ChampagneBlock num={t('s3.num')} title={t('s3.title')}>
        <p>{t('s3.body')}</p>
      </ChampagneBlock>

      {/* §4 — navy — fairness, echoing the real product badges */}
      <NavyBlock num={t('s4.num')} title={t('s4.title')}>
        <p className="max-w-3xl text-cream-muted">{t('s4.body')}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Badge variant="neutral">{ts('buildingTrackRecord')}</Badge>
          <Badge variant="rising">{ts('risingTalent')}</Badge>
        </div>
      </NavyBlock>

      {/* §5 — champagne */}
      <ChampagneBlock num={t('s5.num')} title={t('s5.title')}>
        <p>{t('s5.body')}</p>
      </ChampagneBlock>

      {/* §6 — navy */}
      <NavyBlock num={t('s6.num')} title={t('s6.title')}>
        <p className="max-w-3xl text-cream-muted">{t('s6.body')}</p>
      </NavyBlock>

      {/* DGT / CAOP data attribution (CC BY 4.0) */}
      <SectionWrapper tone="dark" size="md">
        <div className="max-w-2xl rounded-[var(--radius-lg)] border border-line bg-[var(--surface-card-solid)] p-6">
          <Eyebrow>{t('attribution.title')}</Eyebrow>
          <p className="mt-2 text-meta text-cream-muted">{t('attribution.body')}</p>
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-300)] underline-offset-4 hover:underline"
          >
            {t('attribution.licence')}
            <IconArrowRight className="text-base" aria-hidden />
          </a>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper tone="dark" size="lg">
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
            <div className="relative flex justify-center">
              <Link href="/consultores">
                <Button size="lg">
                  {t('finalCta')}
                  <IconArrowRight className="text-base" aria-hidden />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  )
}
