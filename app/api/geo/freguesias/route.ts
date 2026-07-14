// On-demand geo options — freguesias (with houses) under a concelho, for a deal type.
import { NextResponse, type NextRequest } from 'next/server'
import { freguesiasInventory, type GeoSource } from '@/lib/data/geo/inventory'

export async function GET(req: NextRequest) {
  const dealType = req.nextUrl.searchParams.get('deal') === 'rent' ? 'rent' : 'sale'
  const source: GeoSource = req.nextUrl.searchParams.get('source') === 'coverage' ? 'coverage' : 'houses'
  const concelho = req.nextUrl.searchParams.get('concelho')
  if (!concelho) return NextResponse.json([])
  return NextResponse.json(await freguesiasInventory(dealType, concelho, source))
}
