// Dev-only composite showcase — fetches real seed data via lib/data and passes plain
// objects down to the client showcase (components never import mock data themselves).
// Outside the localized tree + excluded from middleware; gated by flags.devShowcase,
// which is hard-off in production.
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { flags } from '@/lib/flags'
import { getConsultant, getConsultants, getListings, getRegions } from '@/lib/data'
import ptMessages from '@/messages/pt.json'
import { ComponentsShowcase } from './ComponentsShowcase'

export const metadata = {
  title: 'Components — Dev Showcase · RealFairTrust',
  robots: { index: false, follow: false },
}

export default async function ComponentsDevPage() {
  if (!flags.devShowcase) notFound()

  const [consultants, listings, regions, detail] = await Promise.all([
    getConsultants(),
    getListings(),
    getRegions('city'),
    getConsultant('ana-silva'),
  ])

  return (
    <NextIntlClientProvider locale="pt" messages={ptMessages}>
      <ComponentsShowcase consultants={consultants} listings={listings} regions={regions} detail={detail} />
    </NextIntlClientProvider>
  )
}
