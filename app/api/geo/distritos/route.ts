// On-demand geo options — distritos/RA to offer for a deal type (inventory-driven).
// Keeps the 355 KB CAOP dataset server-side; the client LocationPicker fetches small lists.
import { NextResponse, type NextRequest } from 'next/server'
import { districtsInventory, type GeoSource } from '@/lib/data/geo/inventory'

export async function GET(req: NextRequest) {
  const dealType = req.nextUrl.searchParams.get('deal') === 'rent' ? 'rent' : 'sale'
  const source: GeoSource = req.nextUrl.searchParams.get('source') === 'coverage' ? 'coverage' : 'houses'
  return NextResponse.json(await districtsInventory(dealType, source))
}
