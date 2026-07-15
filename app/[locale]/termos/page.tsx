// Terms of service — /termos (PT) · /en/terms (EN)
// DRAFT (Decision #89): a structurally-sound, GDPR-aware DRAFT — NOT lawyer-reviewed. Renders a
// calm neutral draft-notice banner (NOT green — verification-only) at the top; bracketed
// placeholder fields (contact) are intentional, to be filled before launch. Pure content.
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SectionWrapper } from '@/components/ui'
import { IconClock } from '@/components/ui/icons'

const SECTION_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termos' })
  return { title: t('title') }
}

export default async function TermosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termos' })

  return (
    <SectionWrapper tone="dark" size="lg">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-section text-cream">{t('title')}</h1>

        {/* Calm neutral draft notice — NOT green (verification-only). */}
        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-[var(--radius-lg)] border border-line bg-[var(--surface-card-solid)] px-4 py-3"
        >
          <IconClock className="mt-0.5 shrink-0 text-base text-cream-muted" aria-hidden />
          <p className="text-meta text-cream-muted">{t('draftBanner')}</p>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {SECTION_KEYS.map((k, i) => (
            <section key={k}>
              <h2 className="text-subsection text-cream">
                <span className="mr-2 text-gold">{i + 1}.</span>
                {t(`sections.${k}.title`)}
              </h2>
              <p className="mt-2 leading-relaxed text-cream-muted">{t(`sections.${k}.body`)}</p>
            </section>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
