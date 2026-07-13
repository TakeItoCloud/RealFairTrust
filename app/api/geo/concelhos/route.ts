// On-demand geo options — concelhos (with houses) under a distrito, for a deal type.
import { NextResponse, type NextRequest } from 'next/server'
import { concelhosInventory } from '@/lib/data/geo/inventory'

export async function GET(req: NextRequest) {
  const dealType = req.nextUrl.searchParams.get('deal') === 'rent' ? 'rent' : 'sale'
  const distrito = req.nextUrl.searchParams.get('distrito')
  if (!distrito) return NextResponse.json([])
  return NextResponse.json(await concelhosInventory(dealType, distrito))
}
