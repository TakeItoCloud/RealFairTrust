'use client'

// Footer — four-column site map + language switch (Phase 1 §7).
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { focusRing } from '@/components/ui/styles'
import { LanguageSwitcher } from './LanguageSwitcher'

function FooterCol({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <nav aria-label={heading}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted">{heading}</p>
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
        className={cn('rounded-sm text-sm text-cream-muted transition-colors hover:text-cream', focusRing)}
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
    <footer className="border-t border-line bg-ink text-cream">
      <div className="container-page py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-display text-lg font-semibold">{t('brand')}</p>
            <p className="mt-1 text-sm text-cream-muted">{t('tagline')}</p>
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
            <FooterLink href="/contacto">{tf('contact')}</FooterLink>
            <FooterLink href="/recursos">{tf('resources')}</FooterLink>
          </FooterCol>

          <FooterCol heading={tf('legal')}>
            <FooterLink href="/privacidade">{tf('privacy')}</FooterLink>
            <FooterLink href="/termos">{tf('terms')}</FooterLink>
            <FooterLink href="/cookies">{tf('cookies')}</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-cream-muted">
            © {new Date().getFullYear()} {t('brand')}. {tf('rights')}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
