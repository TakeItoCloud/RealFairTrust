import React, { useState, useEffect, useRef, useMemo } from "react";

/* ============================================================================
   RealFairTrust — merit-based real-estate consultant marketplace (demo)
   Self-contained React artifact. Mock/seed data generated in-file.
   Visual identity per brief: navy stage · gold accent · champagne break/footer
   · grey · ivory. Green reserved for verification/success only.
   Type: Fraunces (display/prices) + Inter (UI/body).
============================================================================ */

/* ---------- palette ---------- */
const C = {
  navy: "#0B1B3B",
  navyDeep: "#060F24",
  navyPanel: "#0F2350",
  gold: "#E8C15A",
  goldDeep: "#C99A2E",
  champagne: "#F3E9D6",
  champagneDeep: "#E9DBBE",
  ivory: "#FBF9F4",
  grey: "#8CA0C4",
  greyDim: "#5E6E8E",
  line: "rgba(232,193,90,0.18)",
  verify: "#3FB27F", // green — verification/success ONLY
  verifyDim: "rgba(63,178,127,0.14)",
};

const goldText = {
  backgroundImage: `linear-gradient(90deg, ${C.goldDeep}, ${C.gold} 45%, #F6E4A6 50%, ${C.gold} 55%, ${C.goldDeep})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/* ---------- seed data ---------- */
const SPECS = ["Luxury", "Apartments", "Investment", "Relocation", "New builds", "Historic", "Waterfront", "Family homes", "Commercial", "Short-let"];
const ZONES_LX = ["Chiado", "Príncipe Real", "Alvalade", "Restelo", "Parque das Nações", "Estrela", "Campo de Ourique", "Belém"];
const ZONES_OP = ["Foz do Douro", "Cedofeita", "Baixa", "Boavista", "Ribeira", "Bonfim"];
const FIRST = ["Mariana", "Tiago", "Beatriz", "Rui", "Carolina", "André", "Inês", "Gonçalo", "Sofia", "Miguel", "Leonor", "Diogo", "Catarina", "Nuno"];
const LAST = ["Silva", "Costa", "Ferreira", "Almeida", "Rocha", "Marques", "Carvalho", "Nogueira", "Antunes", "Batista", "Faria", "Guerreiro"];

function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
const r = rng(73);
const pick = (arr) => arr[Math.floor(r() * arr.length)];
const pickN = (arr, n) => { const c = [...arr]; const out = []; while (out.length < n && c.length) out.push(c.splice(Math.floor(r() * c.length), 1)[0]); return out; };

const CONSULTANTS = Array.from({ length: 12 }).map((_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = pick(LAST);
  const name = `${first} ${last}`;
  const city = i % 3 === 0 ? "Porto" : "Lisboa";
  const monthsActive = i >= 9 ? Math.floor(r() * 5) + 1 : Math.floor(r() * 90) + 8;
  const isRising = monthsActive < 6;
  const building = isRising && r() > 0.4;
  const signals = {
    satisfaction: 78 + Math.floor(r() * 21),
    closeRate: 55 + Math.floor(r() * 40),
    responseTime: 60 + Math.floor(r() * 38),
    leadConversion: 45 + Math.floor(r() * 45),
    opportunities: 50 + Math.floor(r() * 48),
  };
  const merit = Math.round(
    signals.satisfaction * 0.35 + signals.closeRate * 0.25 + signals.responseTime * 0.15 +
    signals.leadConversion * 0.15 + signals.opportunities * 0.10
  ) / 10;
  return {
    id: i + 1,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    name, first, city,
    zone: pick(city === "Porto" ? ZONES_OP : ZONES_LX),
    monthsActive, isRising, building,
    merit: Number(merit.toFixed(1)),
    signals,
    reviewsCount: building ? 0 : 8 + Math.floor(r() * 40),
    deals: building ? Math.floor(r() * 3) : 12 + Math.floor(r() * 60),
    avgDays: 22 + Math.floor(r() * 40),
    specialities: pickN(SPECS, 3),
    verified: r() > 0.15,
    isDemo: true,
  };
});
// rank the non-building ones by merit; leave building ones out of the numbered ranking
const RANKED = [...CONSULTANTS].filter(c => !c.building).sort((a, b) => b.merit - a.merit);
RANKED.forEach((c, i) => { c.rank = i + 1; });
const RISING = CONSULTANTS.filter(c => c.isRising);

const TYPES = ["Apartamento", "Moradia", "Loft", "Penthouse", "Estúdio"];
const HUES = [[210, 40, 30], [28, 45, 34], [200, 30, 26], [15, 40, 32], [225, 45, 28], [45, 35, 30]];
const LISTINGS = Array.from({ length: 24 }).map((_, i) => {
  const cons = pick(RANKED.length ? RANKED : CONSULTANTS);
  const city = cons.city;
  const deal = r() > 0.32 ? "buy" : "rent";
  const beds = 1 + Math.floor(r() * 4);
  const area = 55 + Math.floor(r() * 220);
  const price = deal === "buy"
    ? 320000 + Math.floor(r() * 40) * 35000
    : 900 + Math.floor(r() * 30) * 120;
  return {
    id: i + 1,
    title: `${pick(TYPES)} T${beds}`,
    zone: pick(city === "Porto" ? ZONES_OP : ZONES_LX),
    city, deal, beds,
    baths: 1 + Math.floor(r() * 3),
    area, price,
    energy: pick(["A+", "A", "B", "B-", "C"]),
    hue: HUES[i % HUES.length],
    consultant: cons,
    isDemo: true,
  };
});

/* ---------- helpers ---------- */
const euro = (n) => "€" + n.toLocaleString("pt-PT");
const priceLabel = (l) => l.deal === "rent" ? euro(l.price) + "/mês" : euro(l.price);
const initials = (n) => n.split(" ").map(w => w[0]).join("").slice(0, 2);

const T = {
  pt: {
    nav: ["Comprar", "Arrendar", "Vender", "Consultores", "Como funciona"],
    login: "Entrar", cta: "Falar com um consultor",
    heroL1: "O futuro do imobiliário", heroL2: "vive em cada um de nós.",
    heroSub: "Escolha o consultor pelo mérito. Depois escolha a casa.",
    findC: "Encontrar consultor", browse: "Ver imóveis", scroll: "Descer",
    topMonth: "Melhores do mês", topSub: "Ordenados por desempenho medido — não por antiguidade nem publicidade.",
    how: "Como funciona", howSub: "Mérito, não marketing.",
    featured: "Imóveis em destaque", forC: "Para consultores",
    forCbody: "Junte-se e concorra pelo que faz — não por quem conhece. O seu ranking sobe com serviço, não com anúncios.",
    joinCta: "Concorrer por mérito",
    consultants: "Consultores", consultantsSub: "Ordenados por pontuação de mérito.",
    rising: "Talento emergente", risingSub: "Menos de 6 meses — a construir o seu registo.",
    buildTrack: "a construir registo", merit: "Mérito", rankWord: "Rank",
    breakdown: "Composição da pontuação", about: "Sobre", theirListings: "Imóveis representados",
    reviews: "Avaliações de clientes", noReviews: "Ainda sem avaliações — este consultor está a construir o seu registo.",
    talkTo: "Falar com", specialities: "Especialidades", verified: "Verificado",
    results: "resultados", noResults: "Sem imóveis para estes filtros.", clear: "Limpar filtros",
    filters: { loc: "Localização", zone: "Zona", type: "Tipo", price: "Preço", beds: "Quartos", sort: "Ordenar" },
    all: "Todos", buy: "Comprar", rent: "Arrendar",
  },
  en: {
    nav: ["Buy", "Rent", "Sell", "Consultants", "How it works"],
    login: "Log in", cta: "Talk to a consultant",
    heroL1: "The future of real estate", heroL2: "lives in each of us.",
    heroSub: "Choose your consultant on merit. Then choose the home.",
    findC: "Find a consultant", browse: "Browse properties", scroll: "Scroll",
    topMonth: "Top this month", topSub: "Ranked by measured performance — not seniority or ad spend.",
    how: "How it works", howSub: "Merit, not marketing.",
    featured: "Featured listings", forC: "For consultants",
    forCbody: "Join and compete on what you do — not who you know. Your rank rises with service, not advertising.",
    joinCta: "Compete on merit",
    consultants: "Consultants", consultantsSub: "Sorted by merit score.",
    rising: "Rising talent", risingSub: "Under 6 months — building their track record.",
    buildTrack: "building track record", merit: "Merit", rankWord: "Rank",
    breakdown: "Score breakdown", about: "About", theirListings: "Properties represented",
    reviews: "Client reviews", noReviews: "No reviews yet — this consultant is building their track record.",
    talkTo: "Talk to", specialities: "Specialities", verified: "Verified",
    results: "results", noResults: "No properties match these filters.", clear: "Clear filters",
    filters: { loc: "Location", zone: "Zone", type: "Type", price: "Price", beds: "Beds", sort: "Sort" },
    all: "All", buy: "Buy", rent: "Rent",
  },
};

const SIGNAL_META = [
  { key: "satisfaction", pt: "Satisfação do cliente", en: "Client satisfaction", w: 35 },
  { key: "closeRate", pt: "Taxa de fecho", en: "Close rate", w: 25 },
  { key: "responseTime", pt: "Tempo de resposta", en: "Response time", w: 15 },
  { key: "leadConversion", pt: "Conversão de leads", en: "Lead conversion", w: 15 },
  { key: "opportunities", pt: "Volume de oportunidades", en: "Opportunity volume", w: 10 },
];

/* ---------- motion: reveal on scroll ---------- */
function Reveal({ children, delay = 0, as: Tag = "div", style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setSeen(true); return; }
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} style={{
      ...style,
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    }}>{children}</Tag>
  );
}

/* ---------- small UI atoms ---------- */
function Eyebrow({ children, color = C.gold }) {
  return <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color, fontWeight: 600 }}>{children}</div>;
}
function VerifiedBadge({ label }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600,
      color: C.verify, background: C.verifyDim, border: `1px solid rgba(63,178,127,0.4)`,
      padding: "3px 9px", borderRadius: 999,
    }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={C.verify} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {label}
    </span>
  );
}
function DemoChip() {
  return <span style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: C.grey, border: `1px solid ${C.line}`, padding: "2px 6px", borderRadius: 4 }}>Demo</span>;
}
function EnergyBadge({ rating }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: C.verify, background: C.verifyDim, padding: "3px 8px", borderRadius: 5, border: "1px solid rgba(63,178,127,0.32)" }}>
      <svg width="9" height="11" viewBox="0 0 24 24" fill={C.verify}><path d="M13 2L3 14h6l-1 8 10-12h-6z" /></svg>{rating}
    </span>
  );
}

/* ---------- rank coin ---------- */
function RankCoin({ rank, size = 46 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      display: "grid", placeItems: "center",
      background: `radial-gradient(circle at 34% 30%, #F6E4A6, ${C.gold} 46%, ${C.goldDeep})`,
      boxShadow: `0 3px 14px rgba(232,193,90,0.35), inset 0 0 0 1px rgba(255,255,255,0.4)`,
      color: C.navyDeep, fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: size * 0.4,
    }}>{rank}</div>
  );
}

/* ---------- merit score display (number vs building state) ---------- */
function MeritScore({ c, t, size = "md" }) {
  const big = size === "lg";
  if (c.building) {
    return (
      <div style={{ textAlign: big ? "left" : "right" }}>
        <div style={{ fontSize: big ? 13 : 11, color: C.grey, fontStyle: "italic", fontFamily: "Fraunces, serif" }}>{t.buildTrack}</div>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.greyDim, marginTop: 3 }}>{t.merit}</div>
      </div>
    );
  }
  return (
    <div style={{ textAlign: big ? "left" : "right" }}>
      <div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: big ? 52 : 30, lineHeight: 1, ...goldText }}>
        {c.merit.toFixed(1)}
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.greyDim, marginTop: 4 }}>{t.merit} / 10</div>
    </div>
  );
}

/* ---------- consultant spotlight card ---------- */
function ConsultantCard({ c, t, onOpen, featured = false }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => onOpen(c)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(c)}
      style={{
        cursor: "pointer", borderRadius: 18, padding: featured ? 30 : 22,
        background: featured
          ? `linear-gradient(165deg, rgba(232,193,90,0.10), ${C.navyPanel} 40%)`
          : `linear-gradient(165deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))`,
        border: `1px solid ${featured ? "rgba(232,193,90,0.4)" : C.line}`,
        boxShadow: hover ? "0 22px 50px rgba(0,0,0,0.45)" : "0 8px 24px rgba(0,0,0,0.25)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "transform .4s cubic-bezier(.22,.61,.36,1), box-shadow .4s ease",
        outline: "none",
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
          {!c.building && c.rank ? <RankCoin rank={c.rank} size={featured ? 56 : 44} /> : (
            <div style={{ width: featured ? 56 : 44, height: featured ? 56 : 44, borderRadius: "50%", background: "rgba(140,160,196,0.14)", border: `1px dashed ${C.greyDim}`, display: "grid", placeItems: "center", color: C.grey, fontSize: 10, textAlign: "center", lineHeight: 1.1, padding: 4 }}>NEW</div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: featured ? 26 : 20, color: C.ivory, fontWeight: 500 }}>{c.name}</div>
              {c.verified && <VerifiedBadge label={t.verified} />}
            </div>
            <div style={{ color: C.grey, fontSize: 13, marginTop: 3 }}>{c.zone} · {c.city}</div>
          </div>
        </div>
        <MeritScore c={c} t={t} />
      </div>

      <div style={{ display: "flex", gap: featured ? 28 : 18, marginTop: featured ? 24 : 18, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
        <Stat label={t.rankWord} value={c.building ? "—" : `#${c.rank}`} />
        <Stat label={c.city === "Porto" ? "Negócios" : "Deals"} value={c.deals} />
        <Stat label="Ø dias" value={c.avgDays} />
      </div>

      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 16 }}>
        {c.specialities.map(s => (
          <span key={s} style={{ fontSize: 11, color: C.champagne, background: "rgba(243,233,214,0.06)", border: `1px solid ${C.line}`, padding: "4px 10px", borderRadius: 999 }}>{s}</span>
        ))}
        <span style={{ marginLeft: "auto" }}><DemoChip /></span>
      </div>
    </div>
  );
}
function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, color: C.ivory }}>{value}</div>
      <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.greyDim, marginTop: 2 }}>{label}</div>
    </div>
  );
}

/* ---------- property editorial card ---------- */
function PropertyCard({ l, t, onOpen }) {
  const [hover, setHover] = useState(false);
  const [h, s, ll] = l.hue;
  return (
    <div
      onClick={() => onOpen && onOpen(l)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 16, overflow: "hidden", cursor: onOpen ? "pointer" : "default",
        border: `1px solid ${C.line}`, background: C.navyPanel,
        boxShadow: hover ? "0 22px 46px rgba(0,0,0,0.45)" : "0 8px 22px rgba(0,0,0,0.28)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "transform .4s cubic-bezier(.22,.61,.36,1), box-shadow .4s ease",
      }}>
      {/* photo stand-in */}
      <div style={{ position: "relative", height: 190, background: `linear-gradient(150deg, hsl(${h} ${s}% ${ll + 6}%), hsl(${h} ${s}% ${ll - 8}%))` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(6,15,36,0.82))" }} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.navyDeep, background: C.champagne, padding: "3px 9px", borderRadius: 5 }}>{l.deal === "buy" ? t.buy : t.rent}</span>
          <span style={{ background: "rgba(6,15,36,0.55)", borderRadius: 5, padding: "3px 6px", display: "grid", placeItems: "center" }}><DemoChip /></span>
        </div>
        <div style={{ position: "absolute", right: 12, top: 12 }}><EnergyBadge rating={l.energy} /></div>
        <div style={{ position: "absolute", left: 14, bottom: 12, fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, ...goldText }}>{priceLabel(l)}</div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, color: C.ivory }}>{l.title}</div>
        <div style={{ color: C.grey, fontSize: 13, marginTop: 2 }}>{l.zone} · {l.city}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {[`${l.beds} quartos`, `${l.baths} WC`, `${l.area} m²`].map(chip => (
            <span key={chip} style={{ fontSize: 11.5, color: C.champagne, border: `1px solid ${C.line}`, padding: "3px 9px", borderRadius: 6 }}>{chip}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14, paddingTop: 13, borderTop: `1px solid ${C.line}` }}>
          <Avatar name={l.consultant.name} size={28} />
          <div style={{ fontSize: 12.5, color: C.grey }}>{l.consultant.name}</div>
          {!l.consultant.building && <div style={{ marginLeft: "auto", fontFamily: "Fraunces, serif", fontSize: 15, ...goldText }}>{l.consultant.merit.toFixed(1)}</div>}
        </div>
      </div>
    </div>
  );
}
function Avatar({ name, size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: `linear-gradient(150deg, ${C.navyPanel}, ${C.navyDeep})`, border: `1px solid ${C.line}`, color: C.gold, fontFamily: "Fraunces, serif", fontSize: size * 0.4 }}>{initials(name)}</div>
  );
}

/* ---------- lead form ---------- */
function LeadForm({ t, who }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const input = { width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.line}`, borderRadius: 9, padding: "11px 13px", color: C.ivory, fontSize: 14, fontFamily: "Inter, sans-serif", marginBottom: 10, boxSizing: "border-box" };
  if (sent) return (
    <div style={{ padding: 20, borderRadius: 12, background: C.verifyDim, border: "1px solid rgba(63,178,127,0.4)", color: C.verify, fontSize: 14 }}>
      <strong>Enviado.</strong> {who ? `${who} recebeu o seu contacto.` : "O consultor foi notificado."} (demo)
    </div>
  );
  return (
    <div>
      <input style={input} placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
      <input style={input} placeholder="Email" />
      <input style={input} placeholder="Telefone" />
      <textarea style={{ ...input, minHeight: 74, resize: "vertical" }} placeholder="A sua mensagem…" />
      <button onClick={() => setSent(true)} style={goldBtn}>{who ? `${t.talkTo} ${who.split(" ")[0]}` : t.cta}</button>
    </div>
  );
}

/* ---------- buttons ---------- */
const goldBtn = {
  width: "100%", border: "none", cursor: "pointer", borderRadius: 999, padding: "13px 22px",
  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: C.navyDeep,
  background: `linear-gradient(90deg, ${C.goldDeep}, ${C.gold} 50%, ${C.goldDeep})`,
  boxShadow: "0 8px 24px rgba(232,193,90,0.28)",
};
const ghostBtn = {
  border: `1px solid ${C.line}`, cursor: "pointer", borderRadius: 999, padding: "12px 22px",
  fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: C.ivory, background: "transparent",
};

/* ============================ NAV ============================ */
function Nav({ t, lang, setLang, go, view }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("rft-scroll");
    const on = () => setScrolled((el?.scrollTop || 0) > 40);
    el?.addEventListener("scroll", on); return () => el?.removeEventListener("scroll", on);
  }, []);
  const links = [["buy", t.nav[0]], ["rent", t.nav[1]], ["sell", t.nav[2]], ["consultants", t.nav[3]], ["how", t.nav[4]]];
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50, transition: "all .3s ease",
      background: scrolled ? "rgba(6,15,36,0.86)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 20 }}>
        <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <Logo />
          <span style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 600, color: C.ivory, letterSpacing: "-0.01em" }}>
            Real<span style={goldText}>Fair</span>Trust
          </span>
        </button>
        <div style={{ display: "flex", gap: 22, marginLeft: 16 }} className="rft-navlinks">
          {links.map(([k, label]) => (
            <button key={k} onClick={() => go(k === "how" ? "home" : k, k === "how" ? "how" : null)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13.5, color: (view === k) ? C.gold : C.grey, fontFamily: "Inter, sans-serif", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.ivory}
              onMouseLeave={e => e.currentTarget.style.color = (view === k) ? C.gold : C.grey}>{label}</button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", border: `1px solid ${C.line}`, borderRadius: 999, overflow: "hidden" }}>
            {["pt", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ border: "none", cursor: "pointer", padding: "5px 11px", fontSize: 12, fontWeight: 600, background: lang === l ? C.gold : "transparent", color: lang === l ? C.navyDeep : C.grey }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button style={{ background: "none", border: "none", color: C.grey, cursor: "pointer", fontSize: 13.5 }} className="rft-hide-sm">{t.login}</button>
          <button onClick={() => go("consultants")} style={{ ...goldBtn, width: "auto", padding: "10px 18px", fontSize: 13 }} className="rft-hide-sm">{t.cta}</button>
        </div>
      </div>
    </div>
  );
}
function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <path d="M4 15L16 5l12 10" stroke={C.gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 16l3.4 3.4L22 12" stroke={C.gold} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17v9h18v-9" stroke={C.grey} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

/* ============================ HERO ============================ */
function Hero({ t, go }) {
  const words = [
    { w: "Real", pt: "Pessoas reais, casas reais, registos reais.", en: "Real people, real homes, real track records." },
    { w: "Fair", pt: "Mérito, não antiguidade nem publicidade.", en: "Merit, not seniority or ad spend." },
    { w: "Trust", pt: "Classificações públicas e transparentes.", en: "Public, transparent ratings." },
  ];
  const [i, setI] = useState(0);
  const [load, setLoad] = useState(false);
  useEffect(() => { setLoad(true); const id = setInterval(() => setI(v => (v + 1) % 3), 2600); return () => clearInterval(id); }, []);
  const st = (d) => ({ opacity: load ? 1 : 0, transform: load ? "translateY(0)" : "translateY(26px)", transition: `opacity .9s ease ${d}ms, transform .9s cubic-bezier(.22,.61,.36,1) ${d}ms` });
  return (
    <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* cinematic backdrop */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 80% at 70% 15%, ${C.navyPanel}, ${C.navy} 42%, ${C.navyDeep})` }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.5, background: `radial-gradient(50% 40% at 78% 30%, rgba(232,193,90,0.16), transparent 70%)` }} />
      <FloatingGrid />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={st(80)}><Eyebrow>RealFairTrust · Lisboa &amp; Porto</Eyebrow></div>
        <h1 style={{ ...st(200), fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(38px, 6.4vw, 82px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: C.ivory, margin: "18px 0 0", maxWidth: 900 }}>
          {t.heroL1}<br /><span style={goldText}>{t.heroL2}</span>
        </h1>
        <p style={{ ...st(340), color: C.grey, fontSize: "clamp(16px,2vw,20px)", marginTop: 22, maxWidth: 520 }}>{t.heroSub}</p>

        {/* rotating Real / Fair / Trust reveal */}
        <div style={{ ...st(440), marginTop: 30, height: 58, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 40, fontWeight: 600, ...goldText, minWidth: 130 }}>{words[i].w}</div>
          <div style={{ height: 30, width: 1, background: C.line }} />
          <div key={i} style={{ color: C.champagne, fontSize: 15, maxWidth: 340, animation: "rftFade .6s ease" }}>{words[i][t === T.pt ? "pt" : "en"]}</div>
        </div>

        <div style={{ ...st(560), display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
          <button onClick={() => go("consultants")} style={{ ...goldBtn, width: "auto" }}>{t.findC}</button>
          <button onClick={() => go("buy")} style={ghostBtn}>{t.browse}</button>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", ...st(800), color: C.greyDim, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        {t.scroll}
        <div style={{ width: 1, height: 30, background: `linear-gradient(${C.gold}, transparent)`, animation: "rftPulse 2s ease infinite" }} />
      </div>
    </section>
  );
}
function FloatingGrid() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} preserveAspectRatio="none">
      <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke={C.gold} strokeWidth="0.5" /></pattern></defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  );
}

/* ============================ HOME ============================ */
function Home({ t, lang, go, openConsultant, howRef }) {
  const top = RANKED.slice(0, 4);
  const feat = LISTINGS.slice(0, 3);
  const steps = [
    { pt: ["Nós medimos", "Cada consultor é pontuado por satisfação, taxa de fecho, resposta, conversão e volume — numa janela de 90 dias, recalculada mensalmente."], en: ["We measure", "Every consultant is scored on satisfaction, close rate, response, conversion and volume — over a 90-day window, recomputed monthly."] },
    { pt: ["Você escolhe", "Compare consultores por mérito, não por antiguidade. Veja a composição da pontuação, aberta e transparente."], en: ["You choose", "Compare consultants on merit, not seniority. See the score breakdown, open and transparent."] },
    { pt: ["Merecemos a sua confiança", "Escolha a pessoa primeiro. Depois veja os imóveis que os melhores representam."], en: ["We earn trust", "Choose the person first. Then browse the properties the best represent."] },
  ];
  return (
    <>
      <Hero t={t} go={go} />

      {/* Top this month */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "90px 24px 40px" }}>
        <Reveal><Eyebrow>{lang === "pt" ? "01 · Ranking" : "01 · Ranking"}</Eyebrow>
          <h2 style={sectionH}>{t.topMonth}</h2>
          <p style={sectionSub}>{t.topSub}</p>
        </Reveal>
        <Reveal delay={120} style={{ marginTop: 34 }}>
          <ConsultantCard c={top[0]} t={t} onOpen={openConsultant} featured />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 18 }}>
          {top.slice(1).map((c, k) => <Reveal key={c.id} delay={180 + k * 90}><ConsultantCard c={c} t={t} onOpen={openConsultant} /></Reveal>)}
        </div>
      </section>

      {/* How it works — champagne break */}
      <section ref={howRef} style={{ background: `linear-gradient(180deg, ${C.champagne}, ${C.champagneDeep})`, marginTop: 60, padding: "84px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: C.goldDeep, fontWeight: 700 }}>02 · {t.how}</div>
            <h2 style={{ ...sectionH, color: C.navyDeep }}>{t.howSub}</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22, marginTop: 40 }}>
            {steps.map((s, k) => (
              <Reveal key={k} delay={k * 110}>
                <div style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(11,27,59,0.1)", borderRadius: 16, padding: 28, height: "100%" }}>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: 44, fontWeight: 600, color: C.goldDeep }}>{k + 1}</div>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, color: C.navyDeep, marginTop: 8 }}>{s[lang][0]}</div>
                  <p style={{ color: "#3A4560", fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>{s[lang][1]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "84px 24px 40px" }}>
        <Reveal><Eyebrow>03 · {lang === "pt" ? "Portefólio" : "Portfolio"}</Eyebrow>
          <h2 style={sectionH}>{t.featured}</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 34 }}>
          {feat.map((l, k) => <Reveal key={l.id} delay={k * 100}><PropertyCard l={l} t={t} onOpen={() => go("buy")} /></Reveal>)}
        </div>
        <Reveal delay={200} style={{ textAlign: "center", marginTop: 34 }}>
          <button onClick={() => go("buy")} style={ghostBtn}>{t.browse} →</button>
        </Reveal>
      </section>

      {/* For consultants CTA */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 100px" }}>
        <Reveal>
          <div style={{ borderRadius: 22, padding: "clamp(32px,6vw,64px)", textAlign: "center", position: "relative", overflow: "hidden", background: `linear-gradient(160deg, ${C.navyPanel}, ${C.navyDeep})`, border: `1.5px solid rgba(232,193,90,0.5)`, boxShadow: "0 0 60px rgba(232,193,90,0.08)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 0%, rgba(232,193,90,0.12), transparent)" }} />
            <div style={{ position: "relative" }}>
              <Eyebrow>{t.forC}</Eyebrow>
              <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px,4vw,46px)", color: C.ivory, margin: "14px 0 0", lineHeight: 1.1 }}>
                {lang === "pt" ? "Deixe o seu trabalho " : "Let your work "}<span style={goldText}>{lang === "pt" ? "falar." : "speak."}</span>
              </h2>
              <p style={{ color: C.grey, fontSize: 16, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.6 }}>{t.forCbody}</p>
              <button style={{ ...goldBtn, width: "auto", marginTop: 26 }}>{t.joinCta}</button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
const sectionH = { fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px,3.6vw,44px)", color: C.ivory, margin: "10px 0 0", letterSpacing: "-0.01em", lineHeight: 1.08 };
const sectionSub = { color: C.grey, fontSize: 15.5, marginTop: 12, maxWidth: 540, lineHeight: 1.5 };

/* ============================ CONSULTANT DISCOVERY ============================ */
function ConsultantDiscovery({ t, lang, openConsultant }) {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("all");
  const [city, setCity] = useState("all");
  const ranked = useMemo(() => RANKED.filter(c =>
    (city === "all" || c.city === city) &&
    (spec === "all" || c.specialities.includes(spec)) &&
    (q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.zone.toLowerCase().includes(q.toLowerCase()))
  ), [q, spec, city]);
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 100px" }}>
      <Reveal><Eyebrow>{t.consultants}</Eyebrow>
        <h1 style={{ ...sectionH, fontSize: "clamp(32px,4.4vw,52px)" }}>{lang === "pt" ? "Escolha por mérito." : "Choose on merit."}</h1>
        <p style={sectionSub}>{t.consultantsSub}</p>
      </Reveal>

      {/* filter bar */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30, padding: 16, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.line}` }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={lang === "pt" ? "Procurar nome ou zona…" : "Search name or zone…"} style={{ ...filterInput, flex: "1 1 200px" }} />
        <select value={city} onChange={e => setCity(e.target.value)} style={filterInput}><option value="all">{t.all} · {lang === "pt" ? "Cidades" : "Cities"}</option><option>Lisboa</option><option>Porto</option></select>
        <select value={spec} onChange={e => setSpec(e.target.value)} style={filterInput}><option value="all">{t.all} · {t.specialities}</option>{SPECS.map(s => <option key={s}>{s}</option>)}</select>
      </div>

      {/* ranked grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18, marginTop: 26 }}>
        {ranked.map((c, k) => <Reveal key={c.id} delay={Math.min(k * 60, 300)}><ConsultantCard c={c} t={t} onOpen={openConsultant} /></Reveal>)}
      </div>
      {ranked.length === 0 && <EmptyState t={t} onClear={() => { setQ(""); setSpec("all"); setCity("all"); }} />}

      {/* Rising talent */}
      <div style={{ marginTop: 70 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Eyebrow color={C.verify}>★ {t.rising}</Eyebrow>
          </div>
          <h2 style={{ ...sectionH, fontSize: "clamp(24px,3vw,34px)" }}>{lang === "pt" ? "A subir." : "On the rise."}</h2>
          <p style={sectionSub}>{t.risingSub}</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18, marginTop: 26 }}>
          {RISING.map((c, k) => <Reveal key={c.id} delay={k * 80}><ConsultantCard c={c} t={t} onOpen={openConsultant} /></Reveal>)}
        </div>
      </div>
    </div>
  );
}
const filterInput = { background: "rgba(11,27,59,0.6)", border: `1px solid ${C.line}`, borderRadius: 9, padding: "10px 13px", color: C.ivory, fontSize: 13.5, fontFamily: "Inter, sans-serif", outline: "none" };

function EmptyState({ t, onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "70px 20px", border: `1px dashed ${C.line}`, borderRadius: 16, marginTop: 26 }}>
      <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, color: C.champagne }}>{t.noResults}</div>
      <button onClick={onClear} style={{ ...ghostBtn, marginTop: 18 }}>{t.clear}</button>
    </div>
  );
}

/* ============================ CONSULTANT PROFILE ============================ */
function ConsultantProfile({ c, t, lang, go }) {
  const listings = LISTINGS.filter(l => l.consultant.id === c.id).slice(0, 3);
  const reviews = c.building ? [] : Array.from({ length: 3 }).map((_, i) => ({
    name: pick(FIRST) + " " + pick(LAST)[0] + ".",
    stars: 5 - (i === 2 ? 1 : 0),
    text: lang === "pt"
      ? ["Atenção impecável do início ao fim. Fechámos acima do esperado.", "Respostas rápidas e honestas. Recomendo sem reservas.", "Conhece o mercado como ninguém na zona."][i]
      : ["Impeccable attention from start to finish. We closed above expectations.", "Fast, honest answers throughout. Recommend without reservation.", "Knows the local market better than anyone."][i],
  }));
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 100px" }}>
      <button onClick={() => go("consultants")} style={{ ...ghostBtn, padding: "8px 16px", fontSize: 13, marginBottom: 24 }}>← {t.consultants}</button>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 30, alignItems: "start" }} className="rft-profile-grid">
        <div>
          {/* header */}
          <Reveal>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <Avatar name={c.name} size={84} />
                {!c.building && c.rank && <div style={{ position: "absolute", bottom: -6, right: -6 }}><RankCoin rank={c.rank} size={34} /></div>}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px,4vw,42px)", color: C.ivory, margin: 0 }}>{c.name}</h1>
                  {c.verified && <VerifiedBadge label={t.verified} />}
                </div>
                <div style={{ color: C.grey, fontSize: 15, marginTop: 6 }}>{c.zone} · {c.city} · {c.monthsActive} {lang === "pt" ? "meses ativo" : "months active"}</div>
              </div>
              <div style={{ marginLeft: "auto" }}><MeritScore c={c} t={t} size="lg" /></div>
            </div>
          </Reveal>

          {/* score breakdown */}
          <Reveal delay={100} style={{ marginTop: 34 }}>
            <div style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.line}` }}>
              <Eyebrow>{t.breakdown}</Eyebrow>
              {c.building ? (
                <p style={{ color: C.champagne, fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 17, marginTop: 14 }}>
                  {lang === "pt" ? "A recolher dados suficientes para uma pontuação estatisticamente fiável." : "Gathering enough data for a statistically confident score."}
                </p>
              ) : (
                <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
                  {SIGNAL_META.map(s => (
                    <div key={s.key}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: C.champagne }}>{s[lang]} <span style={{ color: C.greyDim }}>· {s.w}%</span></span>
                        <span style={{ color: C.gold, fontFamily: "Fraunces, serif" }}>{c.signals[s.key]}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${c.signals[s.key]}%`, borderRadius: 999, background: `linear-gradient(90deg, ${C.goldDeep}, ${C.gold})` }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: C.greyDim, marginTop: 4, lineHeight: 1.5 }}>
                    {lang === "pt" ? "Janela móvel de 90 dias · recalculada mensalmente · normalizada por oportunidade." : "Rolling 90-day window · recomputed monthly · normalized per opportunity."}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* about + specialities */}
          <Reveal delay={160} style={{ marginTop: 30 }}>
            <Eyebrow>{t.about}</Eyebrow>
            <p style={{ color: C.champagne, fontSize: 15.5, lineHeight: 1.7, marginTop: 12, maxWidth: 620 }}>
              {lang === "pt"
                ? `${c.first} trabalha em ${c.zone} e arredores, com foco em ${c.specialities.join(", ").toLowerCase()}. Cada negócio é conduzido com transparência — e o registo está à vista.`
                : `${c.first} works across ${c.zone} and nearby, focused on ${c.specialities.join(", ").toLowerCase()}. Every deal is handled transparently — and the record speaks for itself.`}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
              {c.specialities.map(s => <span key={s} style={{ fontSize: 12.5, color: C.champagne, border: `1px solid ${C.line}`, padding: "5px 12px", borderRadius: 999 }}>{s}</span>)}
            </div>
          </Reveal>

          {/* listings */}
          <Reveal delay={200} style={{ marginTop: 40 }}>
            <Eyebrow>{t.theirListings}</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16, marginTop: 16 }}>
              {listings.length ? listings.map(l => <PropertyCard key={l.id} l={l} t={t} />)
                : <div style={{ color: C.greyDim, fontSize: 14, fontStyle: "italic" }}>{lang === "pt" ? "Sem imóveis ativos de momento." : "No active listings right now."}</div>}
            </div>
          </Reveal>

          {/* reviews */}
          <Reveal delay={240} style={{ marginTop: 40 }}>
            <Eyebrow>{t.reviews}</Eyebrow>
            {reviews.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
                {reviews.map((rv, i) => (
                  <div key={i} style={{ padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.line}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar name={rv.name} size={30} /><span style={{ color: C.ivory, fontSize: 14 }}>{rv.name}</span></div>
                      <div style={{ color: C.gold, letterSpacing: 2 }}>{"★".repeat(rv.stars)}<span style={{ color: C.greyDim }}>{"★".repeat(5 - rv.stars)}</span></div>
                    </div>
                    <p style={{ color: C.champagne, fontSize: 14.5, lineHeight: 1.6, marginTop: 12, fontFamily: "Fraunces, serif", fontStyle: "italic" }}>"{rv.text}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: 16, padding: 26, borderRadius: 14, border: `1px dashed ${C.line}`, color: C.grey, fontSize: 14.5, textAlign: "center" }}>{t.noReviews}</div>
            )}
          </Reveal>
        </div>

        {/* sticky lead form */}
        <div style={{ position: "sticky", top: 90 }}>
          <div style={{ padding: 24, borderRadius: 16, background: `linear-gradient(160deg, ${C.navyPanel}, ${C.navyDeep})`, border: `1px solid rgba(232,193,90,0.35)` }}>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 21, color: C.ivory }}>{t.talkTo} {c.first}</div>
            <p style={{ color: C.grey, fontSize: 13.5, margin: "8px 0 18px" }}>{lang === "pt" ? "Resposta normalmente no mesmo dia." : "Usually replies the same day."}</p>
            <LeadForm t={t} who={c.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ PROPERTY DISCOVERY ============================ */
function PropertyDiscovery({ t, lang, mode, go }) {
  const [zone, setZone] = useState("all");
  const [type, setType] = useState("all");
  const [beds, setBeds] = useState("all");
  const [sort, setSort] = useState("merit");
  const [band, setBand] = useState("all");
  const base = LISTINGS.filter(l => l.deal === mode);
  const filtered = useMemo(() => {
    let out = base.filter(l =>
      (zone === "all" || l.zone === zone) &&
      (type === "all" || l.title.startsWith(type)) &&
      (beds === "all" || l.beds === Number(beds)) &&
      (band === "all" || bandTest(l, band))
    );
    if (sort === "priceLow") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "priceHigh") out = [...out].sort((a, b) => b.price - a.price);
    else out = [...out].sort((a, b) => (b.consultant.merit || 0) - (a.consultant.merit || 0));
    return out;
  }, [zone, type, beds, sort, band, mode]);
  const zones = [...new Set(base.map(l => l.zone))];
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 100px" }}>
      <Reveal><Eyebrow>{mode === "buy" ? t.buy : t.rent}</Eyebrow>
        <h1 style={{ ...sectionH, fontSize: "clamp(32px,4.4vw,52px)" }}>{mode === "buy" ? (lang === "pt" ? "Comprar em Portugal." : "Buy in Portugal.") : (lang === "pt" ? "Arrendar em Portugal." : "Rent in Portugal.")}</h1>
        <p style={sectionSub}>{filtered.length} {t.results} · {lang === "pt" ? "representados por consultores de topo." : "represented by top-ranked consultants."}</p>
      </Reveal>

      {/* inset filter bar */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28, padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.line}` }}>
        <select value={zone} onChange={e => setZone(e.target.value)} style={filterInput}><option value="all">{t.filters.zone}: {t.all}</option>{zones.map(z => <option key={z}>{z}</option>)}</select>
        <select value={type} onChange={e => setType(e.target.value)} style={filterInput}><option value="all">{t.filters.type}: {t.all}</option>{TYPES.map(ty => <option key={ty}>{ty}</option>)}</select>
        <select value={band} onChange={e => setBand(e.target.value)} style={filterInput}><option value="all">{t.filters.price}: {t.all}</option>{(mode === "buy" ? ["<500k", "500k–800k", "800k+"] : ["<1500", "1500–2500", "2500+"]).map(b => <option key={b}>{b}</option>)}</select>
        <select value={beds} onChange={e => setBeds(e.target.value)} style={filterInput}><option value="all">{t.filters.beds}: {t.all}</option>{[1, 2, 3, 4].map(b => <option key={b} value={b}>T{b}+</option>)}</select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ ...filterInput, marginLeft: "auto" }}><option value="merit">{t.filters.sort}: {t.merit}</option><option value="priceLow">{t.filters.price} ↑</option><option value="priceHigh">{t.filters.price} ↓</option></select>
      </div>

      {filtered.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20, marginTop: 26 }}>
          {filtered.map((l, k) => <Reveal key={l.id} delay={Math.min(k * 55, 320)}><PropertyCard l={l} t={t} onOpen={() => go("consultant", l.consultant)} /></Reveal>)}
        </div>
      ) : <EmptyState t={t} onClear={() => { setZone("all"); setType("all"); setBeds("all"); setBand("all"); }} />}
    </div>
  );
}
function bandTest(l, band) {
  const p = l.price;
  switch (band) {
    case "<500k": return p < 500000; case "500k–800k": return p >= 500000 && p < 800000; case "800k+": return p >= 800000;
    case "<1500": return p < 1500; case "1500–2500": return p >= 1500 && p < 2500; case "2500+": return p >= 2500;
    default: return true;
  }
}

/* ============================ SELL ============================ */
function Sell({ t, lang, go }) {
  const steps = lang === "pt"
    ? [["Escolha por mérito", "Selecione um consultor pelo desempenho medido, não por promessas."], ["Avaliação transparente", "Preço justo baseado em dados reais da zona."], ["Venda com confiança", "Acompanhe cada passo com quem tem registo comprovado."]]
    : [["Choose on merit", "Pick a consultant by measured performance, not promises."], ["Transparent valuation", "Fair pricing from real neighbourhood data."], ["Sell with confidence", "Track every step with someone whose record is proven."]];
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 24px 100px" }}>
      <Reveal style={{ textAlign: "center" }}>
        <Eyebrow>{t.nav[2]}</Eyebrow>
        <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(34px,5vw,60px)", color: C.ivory, margin: "16px auto 0", maxWidth: 760, lineHeight: 1.06 }}>
          {lang === "pt" ? "Venda com quem " : "Sell with someone who "}<span style={goldText}>{lang === "pt" ? "merece." : "earns it."}</span>
        </h1>
        <p style={{ ...sectionSub, margin: "18px auto 0", textAlign: "center" }}>{lang === "pt" ? "Confie a sua casa ao consultor certo — escolhido por desempenho, não por publicidade." : "Trust your home to the right consultant — chosen by performance, not advertising."}</p>
        <button onClick={() => go("consultants")} style={{ ...goldBtn, width: "auto", marginTop: 26 }}>{t.findC}</button>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 22, marginTop: 60 }}>
        {steps.map((s, k) => (
          <Reveal key={k} delay={k * 110}>
            <div style={{ padding: 28, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.line}`, height: "100%" }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 40, ...goldText }}>{k + 1}</div>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 21, color: C.ivory, marginTop: 8 }}>{s[0]}</div>
              <p style={{ color: C.grey, fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>{s[1]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============================ FOOTER ============================ */
function Footer({ t, lang, go }) {
  const cols = [
    { h: lang === "pt" ? "Navegação" : "Navigation", links: [["home", lang === "pt" ? "Início" : "Home"], ["buy", t.nav[0]], ["rent", t.nav[1]], ["consultants", t.nav[3]]] },
    { h: lang === "pt" ? "Contacto" : "Contact", links: [["", "hello@realfairtrust.pt"], ["", "+351 210 000 000"], ["", "Lisboa · Porto"]] },
    { h: "Legal", links: [["", lang === "pt" ? "Termos" : "Terms"], ["", lang === "pt" ? "Privacidade" : "Privacy"], ["", lang === "pt" ? "Metodologia" : "Methodology"]] },
  ];
  return (
    <footer style={{ background: `linear-gradient(180deg, ${C.champagneDeep}, ${C.champagne})`, color: C.navyDeep, padding: "60px 0 34px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 30 }} className="rft-footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M4 15L16 5l12 10" stroke={C.goldDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M11 16l3.4 3.4L22 12" stroke={C.goldDeep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 600, color: C.navyDeep }}>RealFairTrust</span>
          </div>
          <p style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 16, marginTop: 12, color: "#3A4560" }}>{lang === "pt" ? "Desempenho que se vê." : "Performance you can see."}</p>
        </div>
        {cols.map(col => (
          <div key={col.h}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: C.goldDeep }}>{col.h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
              {col.links.map((lk, i) => (
                <button key={i} onClick={() => lk[0] && go(lk[0])} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: lk[0] ? "pointer" : "default", color: "#3A4560", fontSize: 14, fontFamily: "Inter, sans-serif" }}>{lk[1]}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "34px auto 0", padding: "18px 24px 0", borderTop: "1px solid rgba(11,27,59,0.14)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12.5, color: "#5A6480" }}>
        <span>© 2026 RealFairTrust · Portugal 🇵🇹</span>
        <span>{lang === "pt" ? "Demonstração · dados fictícios" : "Demo · mock data"}</span>
      </div>
    </footer>
  );
}

/* ============================ ROOT ============================ */
export default function App() {
  const [lang, setLang] = useState("pt");
  const [view, setView] = useState("home");
  const [activeConsultant, setActiveConsultant] = useState(null);
  const scrollRef = useRef(null);
  const howRef = useRef(null);
  const t = T[lang];

  const go = (v, arg) => {
    if (v === "how") { setView("home"); setTimeout(() => howRef.current?.scrollIntoView({ behavior: "smooth" }), 60); return; }
    if (v === "consultant" && arg) { setActiveConsultant(arg); setView("consultant"); }
    else setView(v);
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  };
  const openConsultant = (c) => go("consultant", c);

  return (
    <div id="rft-scroll" ref={scrollRef} style={{ height: "100vh", overflowY: "auto", background: C.navy, color: C.ivory, fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        #rft-scroll * { box-sizing: border-box; }
        #rft-scroll button:focus-visible, #rft-scroll input:focus-visible, #rft-scroll select:focus-visible, #rft-scroll textarea:focus-visible, #rft-scroll [tabindex]:focus-visible { outline: 2px solid ${C.gold}; outline-offset: 2px; }
        #rft-scroll::-webkit-scrollbar { width: 10px; } #rft-scroll::-webkit-scrollbar-thumb { background: ${C.navyPanel}; border-radius: 6px; }
        @keyframes rftFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rftPulse { 0%,100% { opacity: .3; } 50% { opacity: 1; } }
        select option { background: ${C.navyDeep}; color: ${C.ivory}; }
        @media (max-width: 860px) {
          .rft-navlinks { display: none !important; }
          .rft-profile-grid { grid-template-columns: 1fr !important; }
          .rft-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .rft-hide-sm { display: none !important; }
          .rft-footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) { #rft-scroll * { animation: none !important; } }
      `}</style>

      <Nav t={t} lang={lang} setLang={setLang} go={go} view={view} />

      {view === "home" && <Home t={t} lang={lang} go={go} openConsultant={openConsultant} howRef={howRef} />}
      {view === "consultants" && <ConsultantDiscovery t={t} lang={lang} openConsultant={openConsultant} />}
      {view === "consultant" && activeConsultant && <ConsultantProfile c={activeConsultant} t={t} lang={lang} go={go} />}
      {view === "buy" && <PropertyDiscovery t={t} lang={lang} mode="buy" go={go} />}
      {view === "rent" && <PropertyDiscovery t={t} lang={lang} mode="rent" go={go} />}
      {view === "sell" && <Sell t={t} lang={lang} go={go} />}

      <Footer t={t} lang={lang} go={go} />
    </div>
  );
}
