// Locale-aware formatting helpers. Pure functions — safe to import anywhere.
import type { ListingType, Locale } from '@/lib/types'

const localeTag: Record<Locale, string> = { pt: 'pt-PT', en: 'en-GB' }

/** Format an EUR amount. Rentals append the caller-provided "/mo" suffix. */
export function formatPrice(value: number, locale: Locale, opts?: { suffix?: string }): string {
  const formatted = new Intl.NumberFormat(localeTag[locale], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
  return opts?.suffix ? `${formatted}${opts.suffix}` : formatted
}

/** Convenience: price for a listing, with the rent suffix when applicable. */
export function formatListingPrice(
  value: number,
  type: ListingType,
  locale: Locale,
  rentSuffix: string,
): string {
  return type === 'rent' ? formatPrice(value, locale, { suffix: ` ${rentSuffix}` }) : formatPrice(value, locale)
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag[locale], { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(iso),
  )
}

/** Compact area like "132 m²". */
export function formatArea(m2: number, locale: Locale): string {
  return `${new Intl.NumberFormat(localeTag[locale]).format(m2)} m²`
}
