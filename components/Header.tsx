'use client'

// Header — sticky top bar with primary nav, language switch, login + CTA, and a
// mobile hamburger menu. Links use the typed next-intl navigation so PT/EN paths localize.
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

const navItems = [
  { href: '/comprar', key: 'buy' },
  { href: '/arrendar', key: 'rent' },
  { href: '/vender', key: 'sell' },
  { href: '/consultores', key: 'consultants' },
  { href: '/como-funciona', key: 'howItWorks' },
] as const

export function Header() {
  const t = useTranslations('common')
  const th = useTranslations('header')
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={t('brand')} className={cn('rounded-sm', focusRing)}>
          <Logo className="text-xl" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label={t('brand')}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn('rounded-sm text-sm text-cream-muted transition-colors hover:text-cream', focusRing)}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link href="/entrar" className={cn('rounded-sm text-sm text-cream-muted hover:text-cream', focusRing)}>
            {th('login')}
          </Link>
          <Link href="/consultores">
            <Button size="sm">{t('cta.talkToConsultant')}</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn('inline-flex h-11 w-11 items-center justify-center rounded-md text-cream lg:hidden', focusRing)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? th('closeMenu') : th('openMenu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-4 w-6">
            <span className={cn('absolute left-0 block h-0.5 w-6 bg-current transition-transform', open ? 'top-1.5 rotate-45' : 'top-0')} />
            <span className={cn('absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity', open && 'opacity-0')} />
            <span className={cn('absolute left-0 block h-0.5 w-6 bg-current transition-transform', open ? 'top-1.5 -rotate-45' : 'top-3')} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-ink lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label={t('brand')}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn('rounded-md px-2 py-2.5 text-cream-muted hover:bg-cream/5 hover:text-cream', focusRing)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link href="/consultores" onClick={() => setOpen(false)}>
                <Button size="sm">{t('cta.talkToConsultant')}</Button>
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
