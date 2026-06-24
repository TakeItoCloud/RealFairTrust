// Top navigation for the marketing site. Frosted, sticky on the navy stage.
const { Logo, Button } = window.RealFairTrustDesignSystem_b440fa;

function Nav({ current, onNavigate, lang, onLang }) {
  const links = [
    { id: "discover", label: "Consultores" },
    { id: "properties", label: "Imóveis" },
    { id: "home", label: "Como funciona", hash: "como" },
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(6,15,34,0.72)", backdropFilter: "blur(var(--blur-nav))", WebkitBackdropFilter: "blur(var(--blur-nav))",
      borderBottom: "1px solid var(--hairline)",
    }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", gap: 28 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ display: "flex", cursor: "pointer" }}>
          <Logo variant="full" size={22} />
        </a>
        <nav style={{ display: "flex", gap: 4, marginLeft: 18 }}>
          {links.map((l) => (
            <a key={l.id} href="#" onClick={(e) => { e.preventDefault(); onNavigate(l.id); }}
              style={{
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, padding: "8px 14px", borderRadius: "var(--radius-sm)",
                color: current === l.id && !l.hash ? "var(--text-strong)" : "var(--text-muted)",
                background: current === l.id && !l.hash ? "rgba(255,255,255,0.05)" : "transparent",
                transition: "var(--transition-base)", cursor: "pointer",
              }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => onLang(lang === "PT" ? "EN" : "PT")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid var(--hairline-strong)", color: "var(--text-muted)", borderRadius: "var(--radius-pill)", padding: "7px 12px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <window.IconGlobe size={15} /> {lang}
          </button>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "var(--text-muted)" }}>Entrar</a>
          <Button variant="primary" size="sm" onClick={() => onNavigate("discover")}>Encontrar consultor</Button>
        </div>
      </div>
    </header>
  );
}

window.Nav = Nav;
