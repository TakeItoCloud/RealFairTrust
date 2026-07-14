'use client'

// Footer — REVISION R4: champagne background (#E/#F — the footer is one of the two champagne
// surfaces; the other is Home "Como Funciona"). Shared across all pages. Real-route link columns
// only (no invented routes); the language switch lives in the Header (navy stage).
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { focusRingLight } from '@/components/ui/styles'
import { Logo } from './Logo'

function FooterCol({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <nav aria-label={heading}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--champagne-eyebrow)]">{heading}</p>
      <ul className="mt-3 space-y-2">{children}</ul>
    </nav>
  )
}

function FooterLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <li>
      {/* hrefs below are all declared pathnames; cast keeps the typed Link happy in a list */}
      <Link
        href={href as Parameters<typeof Link>[0]['href']}
        className={cn(
          // Home handoff §8: footer body links use --champagne-ink (#2b2415) for contrast — NOT the
          // lighter --champagne-ink-muted. Hover dims slightly for affordance.
          'rounded-sm text-sm text-[var(--champagne-ink)] transition-opacity hover:opacity-70',
          focusRingLight,
        )}
      >
        {children}
      </Link>
    </li>
  )
}

export function Footer() {
  const t = useTranslations('common')
  const tf = useTranslations('footer')

  return (
    <footer className="rft-champagne rft-champagne--fade-top text-[var(--champagne-ink-muted)]">
      <div className="container-page py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo className="text-lg" onIvory tagline />
            <p className="mt-3 max-w-[260px] text-sm text-[var(--champagne-ink)]">{t('tagline')}</p>
          </div>

          <FooterCol heading={tf('explore')}>
            <FooterLink href="/comprar">{t('nav.buy')}</FooterLink>
            <FooterLink href="/arrendar">{t('nav.rent')}</FooterLink>
            <FooterLink href="/vender">{t('nav.sell')}</FooterLink>
            <FooterLink href="/consultores">{t('nav.consultants')}</FooterLink>
          </FooterCol>

          <FooterCol heading={tf('forConsultants')}>
            <FooterLink href="/consultores/aderir">{t('cta.joinAsConsultant')}</FooterLink>
            <FooterLink href="/como-funciona">{t('nav.howItWorks')}</FooterLink>
          </FooterCol>

          <FooterCol heading={tf('company')}>
            <FooterLink href="/sobre">{tf('about')}</FooterLink>
            <FooterLink href="/metodologia">{tf('methodology')}</FooterLink>
            <FooterLink href="/contacto">{tf('contact')}</FooterLink>
            <FooterLink href="/recursos">{tf('resources')}</FooterLink>
          </FooterCol>

          <FooterCol heading={tf('legal')}>
            <FooterLink href="/privacidade">{tf('privacy')}</FooterLink>
            <FooterLink href="/termos">{tf('terms')}</FooterLink>
            <FooterLink href="/cookies">{tf('cookies')}</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--champagne-border)] pt-6 text-xs text-[var(--champagne-ink)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {t('brand')} · {tf('slogan')}
          </p>
          <p>{tf('madeIn')} 🇵🇹</p>
        </div>
      </div>
    </footer>
  )
}
