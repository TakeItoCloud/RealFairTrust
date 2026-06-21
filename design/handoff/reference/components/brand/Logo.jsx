import React from "react";

const GOLD_GRADIENT_TEXT = {
  background: "var(--gradient-gold-title)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

/** The roofline + check mark, drawn with the bright gold gradient. */
function Mark({ size = 34 }) {
  const gid = React.useId();
  return (
    <svg
      width={size}
      height={(size * 74) / 96}
      viewBox="0 0 96 74"
      role="img"
      aria-label="RealFairTrust"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6a0" />
          <stop offset="0.3" stopColor="#ffd86e" />
          <stop offset="1" stopColor="#e3a812" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gid})`} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 50 L48 8 L90 50" />
      </g>
      <path
        d="M30 50 l13 14 l31 -40"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Logo — the RealFairTrust lockup. Roofline-check mark + wordmark with the
 * middle word "Fair" in bright gold. Optional uppercase tagline.
 */
export function Logo({
  variant = "full",
  size = 28,
  tagline = false,
  taglineText = "PERFORMANCE YOU CAN SEE",
  onIvory = false,
}) {
  const markSize = size * 1.2;
  const realColor = onIvory ? "var(--text-ink-strong)" : "var(--wordmark-cream)";
  const trustColor = onIvory ? "var(--text-ink-muted)" : "var(--wordmark-slate)";

  const word = (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-semibold)",
        fontSize: `${size}px`,
        letterSpacing: "var(--ls-tight)",
        lineHeight: 1,
      }}
    >
      <span style={{ color: realColor }}>Real</span>
      <span style={GOLD_GRADIENT_TEXT}>Fair</span>
      <span style={{ color: trustColor }}>Trust</span>
    </span>
  );

  if (variant === "mark") return <Mark size={markSize} />;
  if (variant === "wordmark") return word;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: `${size * 0.42}px` }}>
      <Mark size={markSize} />
      <span style={{ display: "inline-flex", flexDirection: "column", gap: "5px" }}>
        {word}
        {tagline && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "var(--fw-medium)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: onIvory ? "var(--text-ink-muted)" : "var(--text-faint)",
            }}
          >
            {taglineText}
          </span>
        )}
      </span>
    </span>
  );
}
