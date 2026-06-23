import React from "react";

/**
 * StatBlock — a single performance metric. Value in Fraunces (gold optional),
 * quiet label beneath, optional positive/negative delta. The building block of
 * agent profiles and the rating-engine surfaces.
 */
export function StatBlock({ value, label, delta = null, gold = false, align = "left" }) {
  const deltaUp = typeof delta === "string" && delta.trim().startsWith("+");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: align === "center" ? "center" : "flex-start", textAlign: align }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-semibold)",
            fontSize: "30px",
            lineHeight: 1,
            letterSpacing: "var(--ls-tight)",
            ...(gold
              ? {
                  background: "var(--gradient-gold-title)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }
              : { color: "var(--text-strong)" }),
          }}
        >
          {value}
        </span>
        {delta && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: "var(--fw-semibold)",
              color: deltaUp ? "var(--green-verified)" : "var(--text-muted)",
            }}
          >
            {delta}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: "var(--fw-medium)",
          color: "var(--text-muted)",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
