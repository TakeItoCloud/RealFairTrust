import React from "react";

/**
 * Card — the base surface that floats content on the navy stage. `featured`
 * adds a gold hairline + glow; `ivory` is the light-section variant.
 */
export function Card({ children, variant = "default", padding = 24, className = "", style = {}, ...rest }) {
  const base = {
    borderRadius: "var(--radius-lg)",
    padding: typeof padding === "number" ? `${padding}px` : padding,
    transition: "var(--transition-base)",
  };
  const variants = {
    default: {
      background: "var(--surface-card)",
      border: "var(--border-hairline)",
      boxShadow: "var(--shadow-card)",
      backdropFilter: "blur(var(--blur-panel))",
      WebkitBackdropFilter: "blur(var(--blur-panel))",
    },
    raised: {
      background: "var(--surface-card-raised)",
      border: "var(--border-hairline-strong)",
      boxShadow: "var(--shadow-raised)",
    },
    featured: {
      background: "var(--surface-card-raised)",
      border: "var(--border-gold)",
      boxShadow: "var(--shadow-gold-glow)",
    },
    ivory: {
      background: "var(--ivory-card)",
      border: "var(--border-ivory)",
      boxShadow: "var(--shadow-ivory)",
      color: "var(--text-ink)",
    },
  };
  return (
    <div style={{ ...base, ...(variants[variant] || variants.default), ...style }} className={className} {...rest}>
      {children}
    </div>
  );
}
