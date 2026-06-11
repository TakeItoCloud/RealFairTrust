// Seed reviews — collected with manual moderation at launch (Decision #23).
// Established consultants have several; Rising Talent have few or none (empty-state demo).
// Diogo Fernandes intentionally has zero reviews to exercise the "no reviews yet" state.
import type { Review, ReviewDimensions } from '@/lib/types'

const dims = (
  communication: number,
  knowledge: number,
  negotiation: number,
  responsiveness: number,
): ReviewDimensions => ({ communication, knowledge, negotiation, responsiveness })

let n = 0
function review(
  agentId: string,
  clientRef: string,
  dimensions: ReviewDimensions,
  comment: string,
  createdAt: string,
): Review {
  n += 1
  return {
    id: `rev-${String(n).padStart(3, '0')}`,
    agentId,
    clientRef,
    dimensions,
    comment,
    verified: true,
    relatedTransactionId: null,
    eligibleFrom: createdAt,
    createdAt,
  }
}

export const reviews: Review[] = [
  // Ana Silva
  review('c-ana-silva', 'Cliente verificado', dims(5, 5, 5, 5), 'Acompanhamento impecável do início ao fim. Recomendo sem reservas.', '2026-05-20'),
  review('c-ana-silva', 'Cliente verificado', dims(5, 5, 4, 5), 'Profissional, atenta e muito clara em cada etapa.', '2026-04-28'),
  review('c-ana-silva', 'Cliente verificado', dims(5, 4, 5, 5), 'Negociação firme e justa. Fiquei muito satisfeito.', '2026-04-05'),
  // Maria Santos
  review('c-maria-santos', 'Cliente verificado', dims(5, 4, 4, 5), 'Explicou-me tudo com paciência por ser a minha primeira compra.', '2026-05-12'),
  review('c-maria-santos', 'Cliente verificado', dims(4, 4, 4, 4), 'Disponível e honesta. Senti-me segura na decisão.', '2026-03-30'),
  // Sofia Martins
  review('c-sofia-martins', 'Cliente verificado', dims(5, 4, 4, 5), 'Encontrou inquilino para o meu apartamento numa semana.', '2026-05-02'),
  review('c-sofia-martins', 'Cliente verificado', dims(4, 4, 4, 4), 'Processo de arrendamento simples e bem organizado.', '2026-03-18'),
  // Catarina Ferreira
  review('c-catarina-ferreira', 'Verified client', dims(5, 5, 4, 5), 'Made our relocation to Lisbon effortless. Highly recommended.', '2026-05-25'),
  review('c-catarina-ferreira', 'Cliente verificado', dims(5, 4, 4, 5), 'Apoio em três idiomas e sempre disponível.', '2026-04-14'),
  // João Pereira
  review('c-joao-pereira', 'Cliente verificado', dims(5, 5, 5, 5), 'Leitura de mercado excelente. O investimento valeu cada euro.', '2026-05-22'),
  review('c-joao-pereira', 'Cliente verificado', dims(5, 5, 5, 4), 'Rigoroso nos números e transparente nos riscos.', '2026-04-19'),
  review('c-joao-pereira', 'Verified client', dims(5, 5, 4, 5), 'Best investment advice I have received in Porto.', '2026-03-27'),
  // Pedro Costa
  review('c-pedro-costa', 'Cliente verificado', dims(5, 4, 5, 4), 'Carteira de luxo verdadeiramente selecionada. Atendimento de topo.', '2026-05-08'),
  review('c-pedro-costa', 'Cliente verificado', dims(4, 4, 4, 4), 'Discreto e eficaz na Foz. Recomendo.', '2026-04-02'),
  // Rui Oliveira
  review('c-rui-oliveira', 'Cliente verificado', dims(4, 5, 4, 4), 'Conhece o mercado comercial do Porto como ninguém.', '2026-04-21'),
  review('c-rui-oliveira', 'Cliente verificado', dims(4, 4, 4, 4), 'Boa orientação para o meu primeiro investimento comercial.', '2026-03-15'),
  // Miguel Rodrigues
  review('c-miguel-rodrigues', 'Cliente verificado', dims(4, 4, 4, 4), 'Acompanhou a compra na planta com clareza total.', '2026-04-10'),
  // Rising Talent — few
  review('c-beatriz-almeida', 'Cliente verificado', dims(5, 4, 4, 5), 'Muito dedicada e disponível, apesar de estar a começar.', '2026-05-18'),
  review('c-ines-carvalho', 'Cliente verificado', dims(4, 4, 4, 5), 'Arrendamento tratado com cuidado e simpatia.', '2026-05-05'),
  review('c-ines-carvalho', 'Cliente verificado', dims(4, 3, 4, 4), 'Boa comunicação ao longo do processo.', '2026-04-08'),
  review('c-tiago-sousa', 'Cliente verificado', dims(4, 4, 3, 5), 'Muita energia e sempre pronto a ajudar.', '2026-05-01'),
  // Diogo Fernandes — intentionally none (empty state).
]
