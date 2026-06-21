export interface RankBadgeProps {
  /** Leaderboard position. 1–3 render in bright gold. */
  rank: number;
  /** Coin size in px. */
  size?: number;
}

/** The merit-ranking position coin — bright gold for the top three. */
export function RankBadge(props: RankBadgeProps): JSX.Element;
