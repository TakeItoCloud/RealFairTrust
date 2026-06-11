'use client'

// LanguageSwitcher — swaps locale while preserving the current localized path.
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { focusRing } from '@/components/ui/styles'

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('common.language')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className={cn('inline-flex items-center rounded-full border border-line p-0.5', className)} role="group" aria-label={t('label')}>
      {routing.locales.map((loc) => {
        const active = loc === locale
        return (
          <button
            key={loc}
            type="button"
            aria-pressed={active}
            onClick={() => {
              // usePathname types the value as the template union, but the runtime value is
              // a concrete localized path — safe to navigate to directly.
              if (!active) router.replace(pathname as Parameters<typeof router.replace>[0], { locale: loc })
            }}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors',
              active ? 'bg-gold text-ink' : 'text-cream-muted hover:text-cream',
              focusRing,
            )}
          >
            <span className="sr-only">{t(loc)}</span>
            <span aria-hidden>{loc}</span>
          </button>
        )
      })}
    </div>
  )
}
