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
  background:var(--surface-card); border:var(--border-hairline); box-shadow:var(--shadow-card);
  transition:transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out); }
.rftprop:hover{ transform:translateY(var(--lift-card-media)); border-color:var(--gold-border-soft); box-shadow:var(--shadow-raised); }
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

const Bed = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v11M3 12h18v6M21 18v-4a3 3 0 0 0-3-3H8" /></svg>
);
const Bath = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0" /></svg>
);
const Ruler = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16 16 4l4 4L8 20zM9 9l1.5 1.5M12 6l1.5 1.5" /></svg>
);
const Bolt = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--green-verified)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
);

/**
 * PropertyCard — a listing tile with the "Editorial Overlay" treatment: warm
 * photography under a gradient scrim, the gold price sitting on the image,
 * key specs (incl. energy cert), and the consultant attribution that ties
 * every listing back to a ranked agent. Image zooms on hover.
 */
export function PropertyCard({
  image,
  price,
  priceSuffix = null, // e.g. "/mês"
  title,
  location,
  deal = "sale",
  beds,
  baths,
  area,
  energy = null, // energy certificate, e.g. "A+"
  demo = true, // show the "Dados de demonstração" badge
  agentName,
  agentPhoto,
  detailLabel = "Ver detalhe",
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
          {price}
          {priceSuffix && <small> {priceSuffix}</small>}
        </span>
      </div>
      <div className="rftprop__body">
        <div>
          <div className="rftprop__title">{title}</div>
          <div className="rftprop__loc">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flex: "0 0 auto" }}>
              <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {location}
          </div>
        </div>
        {(beds != null || baths != null || area != null || energy != null) && (
          <div className="rftprop__specs">
            {beds != null && <span className="s"><Bed /><b>{beds}</b> quartos</span>}
            {baths != null && <span className="s"><Bath /><b>{baths}</b> wc</span>}
            {area != null && <span className="s"><Ruler /><b>{area}</b> m²</span>}
            {energy != null && <span className="s s--cert"><Bolt /><b>{energy}</b></span>}
          </div>
        )}
        {agentName && (
          <div className="rftprop__agent">
            <Avatar src={agentPhoto} name={agentName} size={26} />
            <span className="nm">{agentName}</span>
            <a className="rftprop__link" href="#" onClick={(e) => e.preventDefault()}>{detailLabel} →</a>
          </div>
        )}
      </div>
    </div>
  );
}
