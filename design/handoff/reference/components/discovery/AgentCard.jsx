import React from "react";
import { Avatar } from "../surfaces/Avatar.jsx";
import { RankBadge } from "../badges/RankBadge.jsx";
import { Badge } from "../badges/Badge.jsx";
import { Tag } from "../badges/Tag.jsx";
import { VerifiedBadge } from "../brand/VerifiedBadge.jsx";

function useStyleOnce(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CSS = `
.rftagent{ position:relative; display:flex; flex-direction:column; gap:18px; border-radius:var(--card-radius); padding:var(--card-pad); overflow:hidden;
  background:var(--surface-card); border:var(--border-hairline); box-shadow:var(--shadow-card);
  backdrop-filter:blur(var(--blur-panel)); -webkit-backdrop-filter:blur(var(--blur-panel));
  transition:transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.rftagent::before{ content:""; position:absolute; top:0; left:0; right:0; height:3px; background:var(--accent-bar);
  transform:scaleX(0); transform-origin:left; transition:transform var(--dur-slow) var(--ease-out); }
.rftagent:hover{ transform:translateY(var(--lift-card)); border-color:var(--gold-border-soft); box-shadow:var(--shadow-raised); }
.rftagent:hover::before{ transform:scaleX(1); }
.rftagent--featured{ background:var(--surface-card-raised); border:var(--border-gold); box-shadow:var(--shadow-gold-glow); }
.rftagent--featured::before{ transform:scaleX(1); }
.rftagent__row{ display:flex; align-items:center; gap:14px; }
.rftagent__name{ font-family:var(--font-display); font-weight:var(--fw-semibold); font-size:21px; color:var(--text-strong); line-height:1.12; letter-spacing:var(--ls-tight); }
.rftagent__meta{ font-family:var(--font-body); font-size:13.5px; color:var(--text-muted); }
.rftagent__score{ font-family:var(--font-display); font-weight:var(--fw-semibold); font-size:38px; line-height:1; letter-spacing:var(--ls-tight);
  background:var(--gradient-gold-title); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  transition:filter var(--dur-base) var(--ease-out); }
.rftagent:hover .rftagent__score, .rftagent--featured .rftagent__score{ filter:drop-shadow(0 0 14px rgba(255,216,110,0.45)); }
.rftagent__scoreLabel{ font-family:var(--font-body); font-size:10.5px; font-weight:var(--fw-semibold); letter-spacing:0.14em; text-transform:uppercase; color:var(--text-faint); }
.rftagent__stats{ display:flex; gap:22px; padding-top:16px; border-top:var(--border-hairline); }
.rftagent__stat b{ display:block; font-family:var(--font-display); font-weight:var(--fw-semibold); font-size:18px; color:var(--text-strong); line-height:1.1; }
.rftagent__stat span{ font-family:var(--font-body); font-size:12px; color:var(--text-muted); }
.rftagent__tags{ display:flex; flex-wrap:wrap; gap:7px; }
.rftagent__foot{ display:flex; align-items:center; justify-content:space-between; padding-top:16px; border-top:var(--border-hairline); }
.rftagent__foot .meta{ font-family:var(--font-body); font-size:12.5px; color:var(--text-faint); }
.rftagent__link{ display:inline-flex; align-items:center; gap:6px; font-family:var(--font-body); font-size:13.5px; font-weight:var(--fw-semibold); color:var(--gold-300);
  transition:gap var(--dur-base) var(--ease-out); }
.rftagent:hover .rftagent__link{ gap:10px; }
`;

/**
 * AgentCard — the marketplace's crown-jewel surface. Shows a consultant's
 * merit score, rank, verification, specialities and key performance stats in a
 * comparable, honest format. Premium "Spotlight" treatment: gold accent bar &
 * score glow on hover.
 */
export function AgentCard({
  rank,
  name,
  photo,
  city,
  score,
  scoreLabel = "Mérito · 90d",
  badge = null, // "top" | "rising" | null
  verified = true,
  specialities = [],
  stats = [], // [{ value, label }]
  meta = null, // small footer note, e.g. "Resposta média 1.2h"
  profileLabel = "Ver perfil",
  featured = false,
}) {
  useStyleOnce("rft-agentcard", CSS);
  const topRanked = rank != null && rank <= 3;
  return (
    <div className={`rftagent ${featured ? "rftagent--featured" : ""}`}>
      <div className="rftagent__row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="rftagent__row">
          {rank != null && <RankBadge rank={rank} />}
          <Avatar src={photo} name={name} size={56} ring={featured || topRanked} />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="rftagent__name">{name}</span>
              {verified && <VerifiedBadge variant="pill" label="Verificado" />}
            </div>
            <span className="rftagent__meta">{city}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
          <span className="rftagent__score">{score}</span>
          <span className="rftagent__scoreLabel">{scoreLabel}</span>
        </div>
      </div>

      {(badge || specialities.length > 0) && (
        <div className="rftagent__tags">
          {badge === "top" && <Badge variant="gold">Top deste mês</Badge>}
          {badge === "rising" && <Badge variant="rising">Rising Talent</Badge>}
          {specialities.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <div className="rftagent__stats">
          {stats.map((s) => (
            <div className="rftagent__stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="rftagent__foot">
        <span className="meta">{meta || (rank != null ? `#${rank} · ${(city || "").split(" · ")[0]}` : "Consultor verificado")}</span>
        <a className="rftagent__link" href="#" onClick={(e) => e.preventDefault()}>{profileLabel} →</a>
      </div>
    </div>
  );
}
