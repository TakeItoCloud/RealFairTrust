'use client'

// PropertyCard — listing summary with agent + rating chip. The isDemo flag is shown
// visibly as a "Demo data" badge (Decision #20) so seed inventory is never mistaken for real.
import { useLocale, useTranslations } from 'next-intl'
import type { ListingWithAgent, Locale } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { formatArea, formatListingPrice } from '@/lib/format'
import { Avatar, VerifiedBadge } from '@/components/ui'
import { focusRing } from '@/components/ui/styles'
import { MediaImage } from './MediaImage'

export function PropertyCard({ listing }: { listing: ListingWithAgent }) {
  const t = useTranslations()
  const locale = useLocale() as Locale

  return (
    <Link
      href={{ pathname: '/imovel/[id]', params: { id: listing.id } }}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-transform',
        'hover:-translate-y-0.5 motion-reduce:transform-none',
        focusRing,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <MediaImage src={listing.media[0]} alt={listing.title} />
        <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-ink/85 px-2 py-0.5 text-xs font-medium text-gold">
          {listing.type === 'sale' ? t('listing.forSale') : t('listing.forRent')}
        </span>
        {listing.isDemo ? (
          <span className="absolute right-2 top-2 inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-ink">
            {t('common.demoBadge')}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-display text-lg text-gold">
          {formatListingPrice(listing.price, listing.type, locale, t('listing.perMonth'))}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-medium text-cream">{listing.title}</p>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream-muted">
          <li>{listing.beds} {t('listing.beds')}</li>
          <li>{listing.baths} {t('listing.baths')}</li>
          <li>{formatArea(listing.areaM2, locale)}</li>
          <li>{t('listing.energyCert')} {listing.energyCert}</li>
        </ul>

        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <Avatar name={listing.agent.name} size="sm" />
          <span className="truncate text-xs text-cream-muted">
            {t('listing.by')} {listing.agent.name}
          </span>
          {listing.agent.verified ? (
            <VerifiedBadge label={t('score.verified')} iconOnly size="sm" className="ml-auto" />
          ) : null}
        </div>
      </div>
    </Link>
  )
}
