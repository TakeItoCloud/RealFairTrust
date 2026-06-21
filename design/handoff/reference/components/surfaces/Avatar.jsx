import React from "react";

/**
 * Avatar — a circular consultant portrait. Optional gold ring marks featured /
 * top-ranked agents; falls back to initials when no image is supplied.
 */
export function Avatar({ src, name = "", size = 56, ring = false }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "var(--radius-pill)",
        flex: "0 0 auto",
        overflow: "hidden",
        background: "linear-gradient(160deg, #16335c, #0a1a34)",
        border: ring ? "2px solid transparent" : "1px solid var(--hairline-strong)",
        backgroundClip: ring ? "padding-box" : undefined,
        boxShadow: ring ? "var(--shadow-gold-glow)" : "none",
        ...(ring
          ? {
              backgroundImage:
                "linear-gradient(160deg, #16335c, #0a1a34), var(--gradient-gold-title)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }
          : {}),
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
      ) : (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-semibold)",
            fontSize: `${Math.round(size * 0.36)}px`,
            color: "var(--gold-200)",
          }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}
