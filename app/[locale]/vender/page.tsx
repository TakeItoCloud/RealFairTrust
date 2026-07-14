// Sell / Rent with us — /vender (PT) · /en/selling (EN)
// Job: a seller/landlord picks WHERE their property is (the exact PR #9 LocationPicker, in
// coverage mode — Decision #86 / D-V1) and sees a MERIT-RANKED list of consultants who cover that
// area, via getConsultantsByArea (inclusive hierarchical coverage + strict tiered widening
// Freguesia→Concelho→Distrito, most-specific-wins). Each result links to that consultant's profile
// (where the lead form already lives). No valuation tool / upload / lead form here (Phase 5+).
// ConsultantCard is reused UNMODIFIED (D-V2 = page-level wrapper for the coverage note).
import { getTranslations } from 'next-intl/server'
import type { CoverageTier } from '@/lib/data'
import { getConsultantsByArea } from '@/lib/data'
import { concelhoDistrito, getConcelho, getDistrito, getFreguesia } from '@/lib/data/geo/caop'
import { Link } from '@/i18n/navigation'
import { Button, Eyebrow, SectionWrapper } from '@/components/ui'
import { IconArrowRight, IconCheck, IconPin, IconScale, IconTrophy } from '@/components/ui/icons'
import { ConsultantCard, Reveal } from '@/components'
import { LocationPicker } from '@/components/discovery/LocationPicker'

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

export default async function VenderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const sp = await searchParams
  const t = await getTranslations({ locale, namespace: 'vender' })

  // --- CAOP selection chain from the URL (same params as the discovery picker) ---
  const freguesiaId = str(sp.freguesia)
  const concelhoId = str(sp.concelho) ?? (freguesiaId ? freguesiaId.slice(0, 4) : undefined)
  const distritoId = str(sp.distrito) ?? (concelhoId ? concelhoDistrito(concelhoId) : undefined)
  const hasLocation = Boolean(str(sp.freguesia) || str(sp.concelho) || str(sp.distrito))

  const distritoNode = distritoId ? getDistrito(distritoId) : undefined
  const concelhoNode = concelhoId ? getConcelho(concelhoId) : undefined
  const freguesiaNode = freguesiaId ? getFreguesia(freguesiaId) : undefined
  const location = {
    distrito: distritoNode ? { id: distritoNode.id, name: distritoNode.name } : undefined,
    concelho: concelhoNode ? { id: concelhoNode.id, name: concelhoNode.name } : undefined,
    freguesia: freguesiaNode ? { id: freguesiaNode.id, name: freguesiaNode.name } : undefined,
  }

  // --- Match consultants by coverage (attribution-only; independent of the picker's options) ---
  const match = hasLocation
    ? await getConsultantsByArea({ distritoId: str(sp.distrito), concelhoId: str(sp.concelho), freguesiaId })
    : { tier: null as CoverageTier | null, consultants: [], areaName: undefined, distritoName: undefined }

  const matched = match.consultants.length > 0
  const resultsHeader =
    match.tier === 'freguesia'
      ? t('results.freguesia', { area: match.areaName ?? '' })
      : match.tier === 'concelho'
        ? t('results.concelho', { area: match.areaName ?? '' })
        : t('results.distrito', { area: match.areaName ?? '' })
  const coverageNote =
    match.tier === 'freguesia'
      ? t('coverageNote.freguesia', { area: match.areaName ?? '', distrito: match.distritoName ?? '' })
      : match.tier === 'concelho'
        ? t('coverageNote.concelho', { area: match.areaName ?? '', distrito: match.distritoName ?? '' })
        : t('coverageNote.distrito', { area: match.areaName ?? '' })

  const valueProps = [
    { icon: <IconTrophy />, title: t('value.merit.title'), body: t('value.merit.body') },
    { icon: <IconScale />, title: t('value.fair.title'), body: t('value.fair.body') },
    { icon: <IconCheck />, title: t('value.free.title'), body: t('value.free.body') },
  ]
  const steps = [t('steps.s1'), t('steps.s2'), t('steps.s3')]

  return (
    <>
      {/* Value-prop hero */}
      <SectionWrapper tone="dark" size="md">
        <div className="max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mt-3 font-display text-section font-semibold leading-[1.06] tracking-[-0.018em] text-cream">
            {t.rich('title', { gold: (chunks) => <span className="gold-title">{chunks}</span> })}
          </h1>
          <p className="mt-4 text-lg text-cream-muted">{t('lede')}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.06}
              className="rounded-[var(--card-radius)] border border-line bg-[var(--surface-card-solid)] p-[var(--card-pad)]"
            >
              <span className="inline-flex text-2xl text-gold" aria-hidden>
                {v.icon}
              </span>
              <p className="mt-3 font-display text-subsection font-semibold text-cream">{v.title}</p>
              <p className="mt-1.5 text-meta text-cream-muted">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* How it works for sellers */}
      <SectionWrapper tone="dark" size="sm">
        <Eyebrow>{t('howEyebrow')}</Eyebrow>
        <h2 className="mt-3 font-display text-subsection font-semibold text-cream">{t('howTitle')}</h2>
        <Reveal>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3.5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--gold-border-soft)] font-display text-lg font-semibold text-gold"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="pt-1 text-cream-muted">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </SectionWrapper>

      {/* Location filter + results */}
      <SectionWrapper tone="dark" size="sm">
        <Eyebrow>{t('locationEyebrow')}</Eyebrow>
        <h2 className="mt-3 font-display text-subsection font-semibold text-cream">{t('locationTitle')}</h2>
        <p className="mt-2 max-w-2xl text-meta text-cream-muted">{t('locationLede')}</p>

        <div className="mt-6 rounded-[var(--radius-lg)] border border-line bg-[var(--surface-inset)] p-5">
          <LocationPicker
            dealType="sale"
            source="coverage"
            distrito={location.distrito}
            concelho={location.concelho}
            freguesia={location.freguesia}
          />
        </div>
        <p className="mt-2 text-[11.5px] text-cream-muted/80">{t('geoAttribution')}</p>

        <section aria-live="polite" className="mt-10">
          {!hasLocation ? (
            /* Initial state — prompt to choose an area (NOT the empty-match CTA). */
            <Reveal className="rounded-[var(--radius-lg)] border border-dashed border-line bg-[var(--surface-card-solid)] px-6 py-12 text-center">
              <IconPin className="mx-auto text-3xl text-cream-muted" aria-hidden />
              <p className="mx-auto mt-3 max-w-md text-cream-muted">{t('prompt')}</p>
            </Reveal>
          ) : matched ? (
            <>
              <h3 className="text-subsection text-cream">
                {resultsHeader}
                <span className="ml-2 text-meta font-normal text-cream-muted">· {match.consultants.length}</span>
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {match.consultants.map((c, i) => (
                  <div key={c.id} className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-cream-muted">
                      <IconPin className="text-sm text-gold" aria-hidden />
                      {coverageNote}
                    </span>
                    <div className="min-h-0 flex-1">
                      <ConsultantCard consultant={c} index={i} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Fully-empty case (no Freguesia, Concelho or District match) — request a consultant. */
            <RequestConsultantCTA
              title={t('request.title', { area: location.freguesia?.name ?? location.concelho?.name ?? location.distrito?.name ?? '' })}
              body={t('request.body')}
              button={t('request.button')}
            />
          )}
        </section>
      </SectionWrapper>
    </>
  )
}

function RequestConsultantCTA({ title, body, button }: { title: string; body: string; button: string }) {
  return (
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
        <div className="relative mx-auto max-w-2xl">
          <h3 className="font-display text-subsection font-semibold text-cream">{title}</h3>
          <p className="mx-auto mt-3 max-w-xl text-cream-muted">{body}</p>
          <div className="mt-7 flex justify-center">
            <Link href="/consultores">
              <Button size="lg">
                {button}
                <IconArrowRight className="text-base" aria-hidden />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
