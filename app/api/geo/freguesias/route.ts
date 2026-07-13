// On-demand geo options — freguesias (with houses) under a concelho, for a deal type.
import { NextResponse, type NextRequest } from 'next/server'
import { freguesiasInventory } from '@/lib/data/geo/inventory'

export async function GET(req: NextRequest) {
  const dealType = req.nextUrl.searchParams.get('deal') === 'rent' ? 'rent' : 'sale'
  const concelho = req.nextUrl.searchParams.get('concelho')
  if (!concelho) return NextResponse.json([])
  return NextResponse.json(await freguesiasInventory(dealType, concelho))
}
