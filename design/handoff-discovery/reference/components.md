# Component reference — source snapshots

These are **read-only snapshots** of the RealFairTrust design-system components this page
consumes. They are reference material for re-implementation — not files to compile or import.
The TypeScript blocks are the public prop contracts (`.d.ts`); the JSX block is the full
`PropertyCard` source (the most important component to replicate faithfully).

---

## PropertyCard — prop contract

```ts
export interface PropertyCardProps {
  /** Photo URL (warm-toned architecture). Falls back to a navy gradient. */
  image?: string;
  /** Pre-formatted price string, e.g. "€ 720 000". */
  price: string;
  /** Optional suffix shown smaller after the price, e.g. "/mês". */
  priceSuffix?: string;
  title: string;
  location: string;
  deal?: "sale" | "rent";
  beds?: number;
  baths?: number;
  /** Floor area in m². */
  area?: number;
  /** Energy certificate, e.g. "A+". Rendered in verified-green. */
  energy?: string;
  /** Show the "Dados de demonstração" badge. Default true. */
  demo?: boolean;
  /** Listing consultant — ties the property to a ranked agent. */
  agentName?: string;
  agentPhoto?: string;
  /** Detail-link label. Defaults to "Ver detalhe". */
  detailLabel?: string;
}
```

## PropertyCard — full source (React + the component's scoped CSS)

```jsx
import React from "react";
import { Avatar } from "../surfaces/Avatar.jsx";

function useStyleOnce(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CSS = `
.rftprop{ position:relative; display:flex; flex-direction:column; border-radius:var(--radius-lg); overflow:hidden;
  background:var(--surface-card-solid); border:1px solid var(--hairline-strong);
  box-shadow:inset 0 1px 0 rgba(245,241,234,0.07), var(--shadow-raised);
  transition:transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out); }
.rftprop:hover{ transform:translateY(var(--lift-card-media)); border-color:var(--gold-border-soft); box-shadow:inset 0 1px 0 rgba(245,241,234,0.11), 0 44px 96px -34px rgba(2,8,18,0.98); }
.rftprop__media{ position:relative; height:220px; overflow:hidden; }
.rftprop__media img{ width:100%; height:100%; object-fit:cover; display:block; transition:transform var(--dur-img) var(--ease-out); }
.rftprop:hover .rftprop__media img{ transform:scale(var(--img-zoom)); }
.rftprop__ph{ width:100%; height:100%; background:linear-gradient(150deg,#16335c,#0a1a34); display:flex; align-items:center; justify-content:center;
  color:var(--text-faint); font-family:var(--font-body); font-size:12px; }
.rftprop__scrim{ position:absolute; inset:0; background:var(--overlay-scrim); pointer-events:none; }
.rftprop__tags{ position:absolute; top:14px; left:14px; right:14px; display:flex; justify-content:space-between; align-items:flex-start; gap:8px; }
.rftprop__chip{ display:inline-flex; align-items:center; padding:4px 11px; border-radius:var(--radius-pill); font-family:var(--font-body); font-size:11.5px; font-weight:var(--fw-semibold);
  background:rgba(8,18,38,0.7); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); }
.rftprop__chip--deal{ color:var(--text-strong); border:1px solid var(--hairline-strong); }
.rftprop__chip--demo{ color:var(--gold-300); border:1px solid var(--gold-border); letter-spacing:0.02em; }
.rftprop__price{ position:absolute; left:18px; bottom:16px; white-space:nowrap; font-family:var(--font-display); font-weight:var(--fw-semibold); font-size:30px; line-height:1; letter-spacing:var(--ls-tight);
  background:var(--gradient-gold-title); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  transition:transform var(--dur-slow) var(--ease-out); }
.rftprop__price small{ font-size:14px; font-weight:var(--fw-medium); }
.rftprop:hover .rftprop__price{ transform:translateY(-3px); }
.rftprop__body{ display:flex; flex-direction:column; gap:14px; padding:18px; }
.rftprop__title{ font-family:var(--font-body); font-size:16px; font-weight:var(--fw-semibold); color:var(--text-strong); line-height:1.4; }
.rftprop__loc{ font-family:var(--font-body); font-size:13px; color:var(--text-muted); display:flex; align-items:center; gap:6px; margin-top:4px; }
.rftprop__specs{ display:flex; gap:14px; flex-wrap:wrap; padding-top:14px; border-top:var(--border-hairline); font-family:var(--font-body); font-size:12.5px; color:var(--text-body); }
.rftprop__specs .s{ display:inline-flex; align-items:center; gap:6px; }
.rftprop__specs .s b{ color:var(--text-strong); font-weight:var(--fw-semibold); }
.rftprop__specs .s--cert b{ color:var(--green-verified); }
.rftprop__agent{ display:flex; align-items:center; gap:9px; padding-top:14px; border-top:var(--border-hairline); }
.rftprop__agent .nm{ font-family:var(--font-body); font-size:12.5px; color:var(--text-muted); }
.rftprop__link{ margin-left:auto; display:inline-flex; align-items:center; gap:6px; font-family:var(--font-body); font-size:13px; font-weight:var(--fw-semibold); color:var(--gold-300);
  transition:gap var(--dur-base) var(--ease-out); }
.rftprop:hover .rftprop__link{ gap:10px; }
`;

const dealLabel = { sale: "Venda", rent: "Arrenda" };

// Specs icons are Lucide-shaped: bed, bath, ruler, zap(bolt, in verified-green).

export function PropertyCard({
  image, price, priceSuffix = null, title, location,
  deal = "sale", beds, baths, area, energy = null,
  demo = true, agentName, agentPhoto, detailLabel = "Ver detalhe",
}) {
  useStyleOnce("rft-propertycard", CSS);
  return (
    <div className="rftprop">
      <div className="rftprop__media">
        {image ? <img src={image} alt={title} /> : <div className="rftprop__ph">Sem fotografia</div>}
        <div className="rftprop__scrim"></div>
        <div className="rftprop__tags">
          <span className="rftprop__chip rftprop__chip--deal">{dealLabel[deal] || deal}</span>
          {demo && <span className="rftprop__chip rftprop__chip--demo">Dados de demonstração</span>}
        </div>
        <span className="rftprop__price">
          {price}{priceSuffix && <small> {priceSuffix}</small>}
        </span>
      </div>
      <div className="rftprop__body">
        <div>
          <div className="rftprop__title">{title}</div>
          <div className="rftprop__loc">{/* map-pin glyph */}{location}</div>
        </div>
        {(beds != null || baths != null || area != null || energy != null) && (
          <div className="rftprop__specs">
            {beds != null && <span className="s">{/* bed */}<b>{beds}</b> quartos</span>}
            {baths != null && <span className="s">{/* bath */}<b>{baths}</b> wc</span>}
            {area != null && <span className="s">{/* ruler */}<b>{area}</b> m²</span>}
            {energy != null && <span className="s s--cert">{/* bolt */}<b>{energy}</b></span>}
          </div>
        )}
        {agentName && (
          <div className="rftprop__agent">
            <Avatar src={agentPhoto} name={agentName} size={26} />
            <span className="nm">{agentName}</span>
            <a className="rftprop__link" href="#">{detailLabel} →</a>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Button — prop contract

```ts
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` = calm gold gradient CTA. */
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Set true when the button sits on the warm ivory/champagne section. */
  onIvory?: boolean;
  /** Stretch to fill the container width. */
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}
// primary = calm gold gradient on navy, pill shape. Press settles translateY(1px).
```

## Input — prop contract

```ts
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional field label rendered above the input. */
  label?: string;
  /** Leading icon (e.g. a search glyph). */
  iconLeft?: ReactNode;
}
// Single-line field — inset on the navy stage with a gold focus ring.
```

## Select — prop contract

```ts
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Options as strings or {value,label} objects. */
  options?: (string | SelectOption)[];
}
// Styled native dropdown — the workhorse of discovery filters. Same inset + gold-focus well as Input.
```

## Badge — prop contract

```ts
export interface BadgeProps {
  /** `gold` = merit/standing, `rising` = Rising Talent, `success` = verified, `neutral` = metadata. */
  variant?: "gold" | "rising" | "success" | "neutral";
  iconLeft?: ReactNode;
  children?: ReactNode;
}
```

## Tag — prop contract

```ts
export interface TagProps {
  /** Set true on the ivory/champagne light section. */
  onIvory?: boolean;
  children?: ReactNode;
}
// Quiet outline chip for metadata: specializations, zones, deal type.
```
