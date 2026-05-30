// Property detail — /imovel/[id] (PT) · /en/property/[id] (EN)
// Job: present one property and convert visitor to a lead.
export default async function ImovelPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { id } = await params
  return (
    <main>
      <h1>Imóvel {id}</h1>
      <p>Scaffold — Phase 4</p>
    </main>
  )
}
