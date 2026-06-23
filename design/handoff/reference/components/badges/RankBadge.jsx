import React from "react";

/**
 * RankBadge — the leaderboard position. Top three render in bright gold
 * gradient on a dark coin; the rest are quiet neutral. The signature element
 * of the merit ranking.
 */
export function RankBadge({ rank, size = 44 }) {
  const isTop = rank <= 3;
  const fs = Math.round(size * 0.4);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "var(--radius-md)",
        flex: "0 0 auto",
        background: isTop ? "rgba(2,8,18,0.55)" : "rgba(245,241,234,0.05)",
        border: isTop ? "1px solid var(--gold-border)" : "1px solid var(--hairline)",
        boxShadow: isTop ? "var(--shadow-gold-glow)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--fw-semibold)",
          fontSize: `${fs}px`,
          lineHeight: 1,
          ...(isTop
            ? {
                background: "var(--gradient-gold-title)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }
            : { color: "var(--text-muted)" }),
        }}
      >
        {rank}
      </span>
    </span>
  );
}
