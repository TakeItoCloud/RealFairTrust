// Dev-only hero showcase — verifies the full-bleed HeroMedia + staged entrance in isolation
// (the live Home is NOT recomposed until RH4). Gated by flags.devShowcase (hard-off in production).
// Copy is literal here (the component takes it via props; i18n is wired in RH4).
import { notFound } from 'next/navigation'
import { flags } from '@/lib/flags'
import { HeroFullBleed } from '@/components/home/HeroFullBleed'

export const metadata = {
  title: 'Hero — Dev Showcase · RealFairTrust',
  robots: { index: false, follow: false },
}

export default function HeroDevPage() {
  if (!flags.devShowcase) notFound()

  return (
    <main className="min-h-screen">
      {/* absorb the hero's -mt-16 (which pulls it under the sticky nav on the real Home) */}
      <div className="h-16" />
      <HeroFullBleed
        line1="O futuro do imobiliário"
        line2="está em cada um de nós."
        subtitle="O marketplace imobiliário onde o desempenho dos consultores é medido com justiça, atualizado todos os meses e mostrado abertamente. Lisboa & Porto."
        ctaPrimary="Encontrar consultor"
        ctaSecondary="Ver imóveis"
        scrollCue="Explorar"
        beats={[
          { word: 'Real', phrase: 'Pessoas antes de imóveis.' },
          { word: 'Fair', phrase: 'Mérito, não antiguidade.' },
          { word: 'Trust', phrase: 'Confiança pela transparência.' },
        ]}
      />
      {/* navy below so the hero's bottom fade dissolves into the stage */}
      <div className="h-[60vh]" />
    </main>
  )
}
