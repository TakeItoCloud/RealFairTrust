// Seed regions — Lisboa + Porto only at launch (Decision #13).
// district → city → zone. Adding a city later = insert rows + flip `live` (no code).
import type { Region } from '@/lib/types'

export const regions: Region[] = [
  // Districts
  { id: 'reg-lisboa-d', type: 'district', parentId: null, name: 'Lisboa', slug: 'lisboa-distrito', live: true },
  { id: 'reg-porto-d', type: 'district', parentId: null, name: 'Porto', slug: 'porto-distrito', live: true },

  // Cities
  { id: 'reg-lisboa', type: 'city', parentId: 'reg-lisboa-d', name: 'Lisboa', slug: 'lisboa', live: true },
  { id: 'reg-porto', type: 'city', parentId: 'reg-porto-d', name: 'Porto', slug: 'porto', live: true },

  // Lisboa zones
  { id: 'reg-chiado', type: 'zone', parentId: 'reg-lisboa', name: 'Chiado', slug: 'chiado', live: true },
  { id: 'reg-alfama', type: 'zone', parentId: 'reg-lisboa', name: 'Alfama', slug: 'alfama', live: true },
  { id: 'reg-parque-nacoes', type: 'zone', parentId: 'reg-lisboa', name: 'Parque das Nações', slug: 'parque-das-nacoes', live: true },
  { id: 'reg-belem', type: 'zone', parentId: 'reg-lisboa', name: 'Belém', slug: 'belem', live: true },

  // Porto zones
  { id: 'reg-cedofeita', type: 'zone', parentId: 'reg-porto', name: 'Cedofeita', slug: 'cedofeita', live: true },
  { id: 'reg-foz', type: 'zone', parentId: 'reg-porto', name: 'Foz do Douro', slug: 'foz-do-douro', live: true },
  { id: 'reg-ribeira', type: 'zone', parentId: 'reg-porto', name: 'Ribeira', slug: 'ribeira', live: true },
  { id: 'reg-bonfim', type: 'zone', parentId: 'reg-porto', name: 'Bonfim', slug: 'bonfim', live: true },
]
