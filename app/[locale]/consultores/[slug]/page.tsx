// Consultant profile — /consultores/[slug] (PT) · /en/consultants/[slug] (EN)
// Job: build trust in one consultant and capture a lead. Key conversion page.
export default async function ConsultorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  return (
    <main>
      <h1>Consultor: {slug}</h1>
      <p>Scaffold — Phase 4</p>
    </main>
  )
}
