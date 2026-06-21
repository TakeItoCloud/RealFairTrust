import React from "react";

/**
 * Injects a component's CSS rules once per document. Lets design-system
 * components express hover/focus/active states while still sourcing every
 * value from the global CSS custom properties (no CSS-in-JS runtime).
 */
function useStyleOnce(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CSS = `
.rftbtn{
  --_pad-y:14px; --_pad-x:26px; --_fs:15px;
  display:inline-flex; align-items:center; justify-content:center; gap:9px;
  font-family:var(--font-body); font-weight:var(--fw-semibold); font-size:var(--_fs);
  line-height:1; letter-spacing:0.01em; white-space:nowrap;
  padding:var(--_pad-y) var(--_pad-x); border-radius:var(--radius-pill);
  border:1px solid transparent; cursor:pointer; user-select:none;
  transition:transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
}
.rftbtn:focus-visible{ outline:none; box-shadow:0 0 0 3px rgba(227,168,18,0.35); }
.rftbtn:active{ transform:translateY(1px); }
.rftbtn[disabled]{ opacity:0.45; cursor:not-allowed; transform:none; }

.rftbtn--sm{ --_pad-y:9px; --_pad-x:18px; --_fs:13px; }
.rftbtn--lg{ --_pad-y:17px; --_pad-x:34px; --_fs:17px; }

/* Primary — luxe gold: bright metallic gradient, polished top-sheen */
.rftbtn--primary{ background:var(--gradient-gold-button); color:#2a1d04; border-color:rgba(140,92,18,0.35);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 34px -12px rgba(227,168,18,0.6); }
.rftbtn--primary:hover{ background:var(--gradient-gold-button-hover);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.6), 0 16px 42px -12px rgba(255,216,110,0.7); }

/* Secondary — gold hairline outline, ivory text */
.rftbtn--secondary{ background:rgba(255,255,255,0.02); color:var(--text-strong); border-color:var(--gold-border-soft); }
.rftbtn--secondary:hover{ background:var(--gold-tint); border-color:var(--gold-border); }

/* Ghost — quiet text button */
.rftbtn--ghost{ background:transparent; color:var(--text-body); border-color:transparent; padding-left:14px; padding-right:14px; }
.rftbtn--ghost:hover{ color:var(--text-strong); background:rgba(255,255,255,0.04); }

/* On the ivory section */
.rftbtn--onIvory.rftbtn--secondary{ color:var(--text-ink-strong); border-color:var(--ivory-200); background:#fff; }
.rftbtn--onIvory.rftbtn--secondary:hover{ background:var(--ivory-100); border-color:var(--gold-border-soft); }
.rftbtn--onIvory.rftbtn--ghost{ color:var(--text-ink); }
.rftbtn--onIvory.rftbtn--ghost:hover{ color:var(--text-ink-strong); background:rgba(28,41,66,0.05); }

.rftbtn--block{ display:flex; width:100%; }
`;

/**
 * Button — the primary call to action. Calm gold on the navy stage.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  onIvory = false,
  block = false,
  iconLeft = null,
  iconRight = null,
  className = "",
  ...rest
}) {
  useStyleOnce("rft-button", CSS);
  const cls = [
    "rftbtn",
    `rftbtn--${variant}`,
    size !== "md" ? `rftbtn--${size}` : "",
    onIvory ? "rftbtn--onIvory" : "",
    block ? "rftbtn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
