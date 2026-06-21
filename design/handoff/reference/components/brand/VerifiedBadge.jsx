import React from "react";

/** Small green check used in the inline pill. Green = verified/success only. */
function Check({ size = 13, color = "var(--green-verified)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto" }}>
      <path d="M5 13 l4.5 4.5 L19 7" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The circular RFT seal (Concept B), gold ring + green verification check. */
function Seal({ size = 64 }) {
  const gid = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" role="img" aria-label="Verified consultant" style={{ display: "block" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6a0" />
          <stop offset="0.35" stopColor="#ffd86e" />
          <stop offset="1" stopColor="#d19e1d" />
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="60" fill="none" stroke={`url(#${gid})`} strokeWidth="3" />
      <circle cx="64" cy="64" r="50" fill="none" stroke="rgba(227,168,18,0.30)" strokeWidth="1.5" />
      <text x="64" y="58" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="32" fontWeight="700" fill={`url(#${gid})`}>
        RFT
      </text>
      <path d="M48 78 l10 10 l22 -24" fill="none" stroke="#3fb984" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * VerifiedBadge — the in-product trust mark for approved consultants.
 * `pill` for inline use beside a name; `seal` (Concept B) for profile headers.
 */
export function VerifiedBadge({ variant = "pill", label = "Verified", sealSize = 64 }) {
  if (variant === "seal") return <Seal size={sealSize} />;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px 4px 8px",
        borderRadius: "var(--radius-pill)",
        background: "var(--green-tint)",
        border: "1px solid var(--green-border)",
        color: "var(--green-verified)",
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "0.02em",
        lineHeight: 1,
      }}
    >
      <Check />
      {label}
    </span>
  );
}
