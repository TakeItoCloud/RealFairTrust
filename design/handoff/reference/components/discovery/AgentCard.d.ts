export interface AgentStat {
  value: string;
  label: string;
}

export interface AgentCardProps {
  /** Leaderboard position; 1–3 get a gold rank coin + avatar ring. */
  rank?: number;
  name: string;
  /** Portrait URL; falls back to initials. */
  photo?: string;
  /** City / zone line, e.g. "Lisboa · Príncipe Real". */
  city?: string;
  /** Merit score for the rolling 90-day window, e.g. "94". */
  score: string | number;
  /** Label under the score. Defaults to "Mérito · 90d". */
  scoreLabel?: string;
  /** Standing badge: "top" (Top deste mês) or "rising" (Rising Talent). */
  badge?: "top" | "rising" | null;
  verified?: boolean;
  specialities?: string[];
  stats?: AgentStat[];
  /** Small footer note, e.g. "Resposta média 1.2h". Falls back to rank · city. */
  meta?: string;
  /** Profile-link label. Defaults to "Ver perfil". */
  profileLabel?: string;
  featured?: boolean;
}

/**
 * The marketplace's crown-jewel surface: a consultant's merit score, rank,
 * verification, specialities and key stats in one comparable, honest card.
 * @startingPoint section="Marketplace" subtitle="Ranked consultant card" viewport="700x320"
 */
export function AgentCard(props: AgentCardProps): JSX.Element;
