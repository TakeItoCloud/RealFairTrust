// Seed listings — ~24 sale + rent across Lisboa + Porto (Decision #40).
// All flagged isDemo: true and shown clearly as demo data until real inventory exists
// (Decision #20). Media are placeholder paths; optimized imagery arrives in 4.3/4.5.
import type { EnergyCert, ListingType, Property, PropertyKind } from '@/lib/types'

// [id, agentId, type, title, price(EUR; rent = monthly), regionId, zoneId, beds, baths, areaM2, energyCert, kind]
type Seed = [
  string,
  string,
  ListingType,
  string,
  number,
  string,
  string,
  number,
  number,
  number,
  EnergyCert,
  PropertyKind,
]

const seeds: Seed[] = [
  // ---- Lisboa — sale ----
  ['p-001', 'c-ana-silva', 'sale', 'Apartamento T3 com vista no Chiado', 985000, 'reg-lisboa', 'reg-chiado', 3, 2, 132, 'A', 'apartment'],
  ['p-002', 'c-ana-silva', 'sale', 'T2 renovado junto ao Tejo em Belém', 720000, 'reg-lisboa', 'reg-belem', 2, 2, 98, 'B', 'apartment'],
  ['p-003', 'c-maria-santos', 'sale', 'T1 luminoso em Alfama', 365000, 'reg-lisboa', 'reg-alfama', 1, 1, 54, 'C', 'apartment'],
  ['p-004', 'c-maria-santos', 'sale', 'T2 ideal para primeira compra no Parque das Nações', 480000, 'reg-lisboa', 'reg-parque-nacoes', 2, 1, 76, 'B', 'apartment'],
  ['p-005', 'c-catarina-ferreira', 'sale', 'T4 familiar com terraço em Belém', 1150000, 'reg-lisboa', 'reg-belem', 4, 3, 178, 'A', 'house'],
  ['p-006', 'c-beatriz-almeida', 'sale', 'Estúdio reabilitado no coração de Alfama', 245000, 'reg-lisboa', 'reg-alfama', 0, 1, 38, 'D', 'studio'],
  // ---- Lisboa — rent ----
  ['p-007', 'c-sofia-martins', 'rent', 'T2 mobilado no Parque das Nações', 1650, 'reg-lisboa', 'reg-parque-nacoes', 2, 1, 82, 'B', 'apartment'],
  ['p-008', 'c-sofia-martins', 'rent', 'T1 com varanda no Chiado', 1400, 'reg-lisboa', 'reg-chiado', 1, 1, 56, 'C', 'apartment'],
  ['p-009', 'c-ines-carvalho', 'rent', 'T3 amplo para arrendamento no Parque das Nações', 2200, 'reg-lisboa', 'reg-parque-nacoes', 3, 2, 118, 'A', 'apartment'],
  ['p-010', 'c-ines-carvalho', 'rent', 'Estúdio funcional em Alfama', 950, 'reg-lisboa', 'reg-alfama', 0, 1, 34, 'D', 'studio'],
  ['p-011', 'c-catarina-ferreira', 'rent', 'T2 pronto a habitar em Belém', 1750, 'reg-lisboa', 'reg-belem', 2, 2, 90, 'B', 'apartment'],
  ['p-012', 'c-ana-silva', 'rent', 'T4 de luxo no Chiado', 4200, 'reg-lisboa', 'reg-chiado', 4, 3, 165, 'A', 'apartment'],

  // ---- Porto — sale ----
  ['p-013', 'c-joao-pereira', 'sale', 'T2 para investimento em Cedofeita', 395000, 'reg-porto', 'reg-cedofeita', 2, 1, 84, 'B', 'apartment'],
  ['p-014', 'c-joao-pereira', 'sale', 'Prédio reabilitado para rendimento na Ribeira', 1250000, 'reg-porto', 'reg-ribeira', 6, 4, 320, 'C', 'building'],
  ['p-015', 'c-pedro-costa', 'sale', 'Apartamento de luxo na Foz do Douro', 1450000, 'reg-porto', 'reg-foz', 4, 3, 195, 'A', 'apartment'],
  ['p-016', 'c-pedro-costa', 'sale', 'T3 com vista rio na Foz', 890000, 'reg-porto', 'reg-foz', 3, 2, 142, 'A', 'apartment'],
  ['p-017', 'c-miguel-rodrigues', 'sale', 'T2 em novo empreendimento no Bonfim', 410000, 'reg-porto', 'reg-bonfim', 2, 2, 88, 'A', 'apartment'],
  ['p-018', 'c-miguel-rodrigues', 'sale', 'T3 em planta no Bonfim', 525000, 'reg-porto', 'reg-bonfim', 3, 2, 110, 'A', 'apartment'],
  ['p-019', 'c-diogo-fernandes', 'sale', 'T1 com potencial de valorização na Ribeira', 285000, 'reg-porto', 'reg-ribeira', 1, 1, 48, 'D', 'apartment'],
  ['p-020', 'c-rui-oliveira', 'sale', 'Loja comercial em Cedofeita', 340000, 'reg-porto', 'reg-cedofeita', 0, 1, 95, 'C', 'commercial'],
  // ---- Porto — rent ----
  ['p-021', 'c-rui-oliveira', 'rent', 'Escritório no Bonfim', 1800, 'reg-porto', 'reg-bonfim', 0, 1, 120, 'B', 'commercial'],
  ['p-022', 'c-tiago-sousa', 'rent', 'T1 acolhedor em Cedofeita', 850, 'reg-porto', 'reg-cedofeita', 1, 1, 50, 'C', 'apartment'],
  ['p-023', 'c-tiago-sousa', 'rent', 'T2 para primeira casa em Cedofeita', 1100, 'reg-porto', 'reg-cedofeita', 2, 1, 72, 'B', 'apartment'],
  ['p-024', 'c-pedro-costa', 'rent', 'T3 de prestígio na Foz do Douro', 3200, 'reg-porto', 'reg-foz', 3, 2, 150, 'A', 'house'],
]

// Stagger createdAt across the last ~3 months so lists can sort by recency.
function createdAt(index: number): string {
  const base = new Date('2026-06-01T09:00:00Z')
  base.setDate(base.getDate() - index * 3)
  return base.toISOString()
}

export const listings: Property[] = seeds.map(
  ([id, agentId, type, title, price, regionId, zoneId, beds, baths, areaM2, energyCert, kind], i) => ({
    id,
    agentId,
    type,
    kind,
    title,
    price,
    regionId,
    zoneId,
    beds,
    baths,
    areaM2,
    energyCert,
    description: `${title}. Imóvel de demonstração apresentado durante o pré-lançamento da RealFairTrust.`,
    media: [`/images/listings/${id}-1.jpg`, `/images/listings/${id}-2.jpg`, `/images/listings/${id}-3.jpg`],
    status: 'active',
    isDemo: true,
    createdAt: createdAt(i),
  }),
)
