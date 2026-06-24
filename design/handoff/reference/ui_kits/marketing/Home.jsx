const { Button, AgentCard, PropertyCard, Card, Input, Select, Badge } = window.RealFairTrustDesignSystem_b440fa;

const Container = ({ children, style }) => (
  <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 32px", ...style }}>{children}</div>
);
const Eyebrow = ({ children, onIvory }) => (
  <span className="rft-eyebrow" style={onIvory ? { color: "var(--gold-600)" } : {}}>{children}</span>
);

function Hero({ onNavigate }) {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <Container style={{ padding: "84px 32px 76px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <Eyebrow>Performance you can see</Eyebrow>
          <h1 style={{ fontSize: "var(--fs-display-1)", lineHeight: 1.02 }}>
            Os melhores consultores,<br />escolhidos por <span className="rft-gold-text">mérito</span>.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-lead)", color: "var(--text-body)", lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
            O marketplace imobiliário onde o desempenho dos consultores é medido com justiça, atualizado todos os meses e mostrado abertamente. Lisboa &amp; Porto.
          </p>
          <Card variant="raised" padding={10} style={{ display: "flex", gap: 8, alignItems: "stretch", maxWidth: 520, borderRadius: "var(--radius-pill)" }}>
            <div style={{ flex: "0 0 130px" }}>
              <Select options={["Lisboa", "Porto"]} aria-label="Cidade" />
            </div>
            <div style={{ flex: 1 }}>
              <Input iconLeft={<window.IconSearch size={16} />} placeholder="Zona, especialidade ou nome" />
            </div>
            <Button variant="primary" onClick={() => onNavigate("discover")}>Procurar</Button>
          </Card>
          <div style={{ display: "flex", gap: 26, marginTop: 4 }}>
            {[["IconShieldCheck", "Consultores verificados"], ["IconRefresh", "Ranking mensal"], ["IconMapPin", "Lisboa & Porto"]].map(([ic, t]) => {
              const Ic = window[ic];
              return (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
                  <Ic size={16} color="var(--gold-500)" /> {t}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: "-12% -8% auto auto", width: 320, height: 320, background: "radial-gradient(circle, rgba(227,168,18,0.16), transparent 70%)", filter: "blur(8px)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <AgentCard {...window.AGENTS[0]} featured />
            <div style={{ position: "absolute", bottom: -18, left: -18 }}>
              <Card variant="raised" padding={16} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <window.IconTrending size={20} color="var(--green-verified)" />
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.4 }}>
                  <b style={{ color: "var(--text-strong)", fontWeight: 600 }}>+6 lugares</b><br />nos últimos 90 dias
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const items = [
    { ic: "IconScale", h: "Mérito sobre volume", p: "Os consultores são avaliados pela qualidade por oportunidade — satisfação, taxa de fecho, resposta — e não pelo número de negócios." },
    { ic: "IconRefresh", h: "Uma corrida que reinicia", p: "Janela móvel de 90 dias, recalculada todos os meses. Os veteranos não enterram quem chega; o topo tem de ser merecido sempre." },
    { ic: "IconTrending", h: "Justo para quem começa", p: "Um quadro Rising Talent dedicado dá visibilidade a consultores com menos de 6 meses, antes de terem um histórico completo." },
  ];
  return (
    <section className="rft-champagne" style={{ padding: "88px 0" }}>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 620, marginBottom: 48 }}>
          <span className="rft-eyebrow" style={{ color: "var(--champagne-eyebrow)" }}>Como funciona</span>
          <h2 style={{ fontSize: "var(--fs-h1)", color: "var(--champagne-ink)" }}>Confiança que se ganha,<br />não que se afirma.</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--champagne-ink-muted)", lineHeight: 1.6, margin: 0 }}>
            Um motor de avaliação periódico e transparente. Tudo o resto — imóveis, perfis, contactos — assenta na credibilidade que ele cria.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {items.map((it, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={it.h} className="rft-step-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="rft-step-coin"><span>{num}</span></div>
                <h3 style={{ fontSize: 21 }}>{it.h}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{it.p}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Leaderboard({ onNavigate }) {
  return (
    <section style={{ padding: "88px 0" }}>
      <Container>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Eyebrow>Top este mês</Eyebrow>
            <h2 style={{ fontSize: "var(--fs-h1)" }}>Consultores em destaque</h2>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("discover"); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--gold-300)" }}>
            Ver ranking completo <window.IconArrowRight size={16} color="var(--gold-300)" />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {window.AGENTS.slice(0, 3).map((a) => (
            <div key={a.name} style={{ cursor: "pointer" }} onClick={() => onNavigate("profile", a)}>
              <AgentCard {...a} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturedProperties({ onNavigate }) {
  return (
    <section style={{ padding: "0 0 88px" }}>
      <Container>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Eyebrow>Imóveis em destaque</Eyebrow>
            <h2 style={{ fontSize: "var(--fs-h1)" }}>Listados por consultores de topo</h2>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("properties"); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--gold-300)" }}>
            Ver todos os imóveis <window.IconArrowRight size={16} color="var(--gold-300)" />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {window.PROPERTIES.slice(0, 3).map((p) => <PropertyCard key={p.title} {...p} />)}
        </div>
      </Container>
    </section>
  );
}

function AgentCTA({ onNavigate }) {
  return (
    <section style={{ padding: "0 0 96px" }}>
      <Container>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-xl)", border: "var(--border-gold)", background: "linear-gradient(135deg, rgba(18,42,79,0.9), rgba(10,26,52,0.95))", boxShadow: "var(--shadow-gold-glow)", padding: "56px 56px" }}>
          <div style={{ position: "absolute", inset: "auto -40px -60px auto", width: 360, height: 360, background: "radial-gradient(circle, rgba(227,168,18,0.18), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 560, display: "flex", flexDirection: "column", gap: 20 }}>
            <Eyebrow>Para consultores</Eyebrow>
            <h2 style={{ fontSize: "var(--fs-display-2)", lineHeight: 1.05 }}>Concorra por <span className="rft-gold-text">mérito</span>, não por antiguidade.</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--text-body)", lineHeight: 1.6, margin: 0 }}>
              Visibilidade ganha pelo desempenho, leads de clientes reais e ferramentas para crescer. Split progressivo que premeia a qualidade.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
              <Button variant="primary" size="lg">Candidatar-me como consultor</Button>
              <Button variant="secondary" size="lg">Ver a metodologia</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Home({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <HowItWorks />
      <Leaderboard onNavigate={onNavigate} />
      <FeaturedProperties onNavigate={onNavigate} />
      <AgentCTA onNavigate={onNavigate} />
    </div>
  );
}

Object.assign(window, { Home, RFTContainer: Container, RFTEyebrow: Eyebrow });
