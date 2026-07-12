// Rent listings — /arrendar (PT) · /en/renting (EN)
// Job: browse and filter properties for rent. Shared Discovery template in "rent" mode.
import { Discovery } from '@/components/discovery/Discovery'

export default function ArrendarPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <Discovery dealType="rent" params={params} searchParams={searchParams} />
}
