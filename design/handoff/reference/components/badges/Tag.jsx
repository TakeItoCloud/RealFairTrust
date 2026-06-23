import React from "react";

/**
 * Tag — a quiet outline chip for metadata: specializations, zones, deal type.
 * Lower emphasis than Badge. Use plural sets (e.g. an agent's specialities).
 */
export function Tag({ children, onIvory = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 11px",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-body)",
        fontSize: "12.5px",
        fontWeight: "var(--fw-medium)",
        lineHeight: 1,
        background: onIvory ? "var(--ivory-100)" : "rgba(245,241,234,0.05)",
        border: onIvory ? "1px solid var(--ivory-200)" : "1px solid var(--hairline)",
        color: onIvory ? "var(--text-ink)" : "var(--text-muted)",
      }}
    >
      {children}
    </span>
  );
}
