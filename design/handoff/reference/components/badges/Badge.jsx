import React from "react";

/**
 * Badge — a small status chip. Gold for merit/standing, green for verified,
 * neutral for quiet metadata. Keep labels short.
 */
export function Badge({ children, variant = "neutral", iconLeft = null }) {
  const palettes = {
    gold: {
      background: "var(--gold-tint)",
      border: "1px solid var(--gold-border)",
      color: "var(--gold-300)",
    },
    rising: {
      background: "rgba(201,162,74,0.10)",
      border: "1px solid var(--gold-border-soft)",
      color: "var(--gold-calm-soft)",
    },
    success: {
      background: "var(--green-tint)",
      border: "1px solid var(--green-border)",
      color: "var(--green-verified)",
    },
    neutral: {
      background: "rgba(245,241,234,0.06)",
      border: "1px solid var(--hairline-strong)",
      color: "var(--text-body)",
    },
  };
  const p = palettes[variant] || palettes.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 11px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "0.02em",
        lineHeight: 1,
        ...p,
      }}
    >
      {iconLeft}
      {children}
    </span>
  );
}
