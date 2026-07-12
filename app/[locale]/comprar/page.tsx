// Buy listings — /comprar (PT) · /en/buying (EN)
// Job: browse and filter properties for sale. Shared Discovery template in "sale" mode.
import { Discovery } from '@/components/discovery/Discovery'

export default function ComprarPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <Discovery dealType="sale" params={params} searchParams={searchParams} />
}
