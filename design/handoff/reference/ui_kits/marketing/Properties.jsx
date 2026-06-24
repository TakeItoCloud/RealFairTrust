const { PropertyCard, Select, Input, Button } = window.RealFairTrustDesignSystem_b440fa;

function Properties() {
  const C = window.RFTContainer, E = window.RFTEyebrow;
  const [deal, setDeal] = React.useState("all");
  const tabs = [{ id: "all", label: "Todos" }, { id: "sale", label: "À venda" }, { id: "rent", label: "Arrendamento" }];
  const list = window.PROPERTIES.filter((p) => deal === "all" || p.deal === deal);
  return (
    <div>
      <section style={{ padding: "56px 0 32px", borderBottom: "1px solid var(--hairline)" }}>
        <C>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
            <E>Imóveis</E>
            <h1 style={{ fontSize: "var(--fs-display-2)", lineHeight: 1.04 }}>Comprar &amp; arrendar em Lisboa &amp; Porto</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-body)", lineHeight: 1.6, margin: 0 }}>
              Cada imóvel é listado por um consultor classificado — sabe sempre com quem está a falar.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ display: "inline-flex", gap: 4, padding: 4, background: "rgba(255,255,255,0.04)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-pill)" }}>
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setDeal(t.id)} style={{
                  fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, padding: "9px 18px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer",
                  color: deal === t.id ? "#1a1407" : "var(--text-muted)",
                  background: deal === t.id ? "var(--gradient-gold-button)" : "transparent",
                }}>{t.label}</button>
              ))}
            </div>
            <div style={{ flex: "1 1 220px" }}><Input iconLeft={<window.IconSearch size={16} />} placeholder="Zona, tipologia ou referência" /></div>
            <div style={{ width: 140 }}><Select label="Cidade" options={["Todas", "Lisboa", "Porto"]} /></div>
            <div style={{ width: 160 }}><Select label="Tipologia" options={["Todas", "T1", "T2", "T3", "T4+"]} /></div>
          </div>
        </C>
      </section>
      <section style={{ padding: "44px 0 88px" }}>
        <C>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", marginBottom: 22 }}>{list.length} imóveis</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {list.map((p) => <PropertyCard key={p.title} {...p} />)}
          </div>
        </C>
      </section>
    </div>
  );
}

window.Properties = Properties;
