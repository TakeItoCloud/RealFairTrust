'use client'

// PropertyCard — "Editorial Overlay" (Decision #45): photo-first with a bottom scrim, frosted
// type + demo chips, gold price on the image, then a compact body (title, location, icon spec
// row with the energy cert in green, agent mini-avatar, CTA). Keeps the graceful image fallback
// and shows the isDemo flag visibly (Decision #20).
import { motion, useReducedMotion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import type { ListingWithAgent, Locale } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { formatArea, formatListingPrice } from '@/lib/format'
import { Avatar } from '@/components/ui'
import { IconArea, IconBath, IconBed, IconBolt, IconPin } from '@/components/ui/icons'
import { MediaImage } from './MediaImage'

export function PropertyCard({ listing, index = 0 }: { listing: ListingWithAgent; index?: number }) {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const reduce = useReducedMotion()
  const location = listing.zoneName ? `${listing.zoneName}, ${listing.regionName}` : listing.regionName

  return (
    <Link href={{ pathname: '/imovel/[id]', params: { id: listing.id } }} className="group block">
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.42, ease: 'easeOut', delay: reduce ? 0 : Math.min(index * 0.07, 0.42) }}
        whileHover={reduce ? undefined : { y: -5 }}
        whileTap={reduce ? undefined : { y: 1 }}
        style={{ boxShadow: 'var(--shadow-card)' }}
        className="overflow-hidden rounded-[20px] border border-line bg-[var(--surface-card)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-raised)]"
      >
        {/* Photo + overlay */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[var(--dur-img)] ease-out group-hover:scale-[var(--img-zoom)] motion-reduce:transform-none">
            <MediaImage src={listing.media[0]} alt={listing.title} />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: 'var(--overlay-scrim)' }}
            aria-hidden
          />

          {/* Frosted chips */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            <span className="rounded-full bg-[var(--plate-bg)] px-2.5 py-0.5 text-meta font-medium text-cream backdrop-blur">
              {listing.type === 'sale' ? t('listing.forSale') : t('listing.forRent')}
            </span>
            {listing.isDemo ? (
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-meta font-semibold text-on-gold backdrop-blur">
                {t('common.demoBadge')}
              </span>
            ) : null}
          </div>

          {/* Gold price on the image */}
          <p className="gold-title absolute bottom-3 left-3 font-display text-2xl font-semibold transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none">
            {formatListingPrice(listing.price, listing.type, locale, t('listing.perMonth'))}
          </p>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="line-clamp-2 text-base font-medium text-cream">{listing.title}</p>
          <p className="mt-1 flex items-center gap-1 text-meta text-cream-muted">
            <IconPin className="text-sm" aria-hidden /> {location}
          </p>

          {/* Icon spec row */}
          <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-cream-muted">
            <li className="flex items-center gap-1">
              <IconBed className="text-base" aria-hidden /> {listing.beds} <span className="sr-only">{t('listing.beds')}</span>
            </li>
            <li className="flex items-center gap-1">
              <IconBath className="text-base" aria-hidden /> {listing.baths} <span className="sr-only">{t('listing.baths')}</span>
            </li>
            <li className="flex items-center gap-1">
              <IconArea className="text-base" aria-hidden /> {formatArea(listing.areaM2, locale)}
            </li>
            <li className="flex items-center gap-1 text-verified">
              <IconBolt className="text-base" aria-hidden /> {listing.energyCert}
              <span className="sr-only">{t('listing.energyCert')}</span>
            </li>
          </ul>

          {/* Agent + CTA */}
          <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
            <Avatar name={listing.agent.name} size="sm" />
            <span className="truncate text-meta text-cream-muted">{listing.agent.name}</span>
            <span className="ml-auto text-meta font-medium text-gold">{t('common.actions.viewDetail')} →</span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
