'use client'

// PropertyCard — "Editorial Overlay" (zip PropertyCard reference; #51). Full-bleed 220px media
// under a scrim with the gold price sitting on the image; frosted deal chip + gold demo chip
// (#20); spec row with lucide bed/bath/ruler; energy cert in verified-GREEN per #52 (reverses the
// old neutral, exception to #34); agent mini-row. Media stays full-bleed per the zip (top corners
// follow the card radius via overflow-hidden) — MediaImage gives a graceful placeholder until real
// imagery lands (4.5). Motion (#37): Framer entrance + image settle, CSS group-hover zoom/lift,
// reduced-motion-safe.
import { motion, useReducedMotion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import type { ListingWithAgent, Locale } from '@/lib/types'
import { Link } from '@/i18n/navigation'
import { formatArea, formatListingPrice } from '@/lib/format'
import { Avatar } from '@/components/ui'
import { IconArea, IconBath, IconBed, IconBolt, IconPin } from '@/components/ui/icons'
import { MediaImage } from './MediaImage'

const EASE = [0.22, 0.61, 0.36, 1] as const

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
        transition={{ duration: 0.42, ease: EASE, delay: reduce ? 0 : Math.min(index * 0.07, 0.42) }}
        whileHover={reduce ? undefined : { y: -5 }}
        whileTap={reduce ? undefined : { y: 1 }}
        style={{ boxShadow: 'var(--shadow-card)' }}
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-[var(--surface-card)] backdrop-blur-[var(--blur-panel)] transition-[box-shadow,border-color] duration-[var(--dur-base)] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-[var(--gold-border-soft)] group-hover:shadow-[var(--shadow-raised)]"
      >
        {/* Media — full-bleed 220px + scrim + chips + price */}
        <div className="relative h-[220px] w-full overflow-hidden">
          <motion.div
            initial={reduce ? false : { scale: 1.04 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="h-full w-full"
          >
            <div className="h-full w-full transition-transform duration-[var(--dur-img)] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[var(--img-zoom)] motion-reduce:transform-none motion-reduce:transition-none">
              <MediaImage src={listing.media[0]} alt={listing.title} />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'var(--overlay-scrim)' }} aria-hidden />

          {/* Frosted chips */}
          <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between gap-2">
            <span className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] bg-[rgba(8,18,38,0.7)] px-2.5 py-1 text-[11.5px] font-semibold text-cream backdrop-blur-[6px]">
              {listing.type === 'sale' ? t('listing.forSale') : t('listing.forRent')}
            </span>
            {listing.isDemo ? (
              <span className="inline-flex items-center rounded-full border border-[var(--gold-border)] bg-[rgba(8,18,38,0.7)] px-2.5 py-1 text-[11.5px] font-semibold tracking-[0.02em] text-[var(--gold-300)] backdrop-blur-[6px]">
                {t('common.demoBadge')}
              </span>
            ) : null}
          </div>

          {/* Gold price on the image */}
          <p className="gold-title absolute bottom-4 left-[18px] font-display text-[30px] font-semibold leading-none transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-[3px] motion-reduce:transform-none">
            {formatListingPrice(listing.price, listing.type, locale, t('listing.perMonth'))}
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3.5 p-[18px]">
          <div>
            <p className="line-clamp-2 text-base font-semibold leading-snug text-cream">{listing.title}</p>
            <p className="mt-1 flex items-center gap-1.5 text-meta text-cream-muted">
              <IconPin className="text-sm" aria-hidden /> {location}
            </p>
          </div>

          {/* Spec row — energy cert in verified-green (#52) */}
          <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-1 border-t border-line pt-3.5 text-[12.5px] text-cream-muted">
            <li className="flex items-center gap-1.5">
              <IconBed className="text-base" aria-hidden /> <b className="font-semibold text-cream">{listing.beds}</b>
              <span className="sr-only">{t('listing.beds')}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <IconBath className="text-base" aria-hidden /> <b className="font-semibold text-cream">{listing.baths}</b>
              <span className="sr-only">{t('listing.baths')}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <IconArea className="text-base" aria-hidden /> <b className="font-semibold text-cream">{formatArea(listing.areaM2, locale)}</b>
            </li>
            <li className="flex items-center gap-1.5 text-verified-strong">
              <IconBolt className="text-base" aria-hidden /> <b className="font-semibold">{listing.energyCert}</b>
              <span className="sr-only">{t('listing.energyCert')}</span>
            </li>
          </ul>

          {/* Agent + CTA */}
          <div className="flex items-center gap-2 border-t border-line pt-3.5">
            <Avatar name={listing.agent.name} size="sm" />
            <span className="truncate text-[12.5px] text-cream-muted">{listing.agent.name}</span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-gold transition-[gap] duration-[var(--dur-base)] group-hover:gap-2.5">
              {t('common.actions.viewDetail')} →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
