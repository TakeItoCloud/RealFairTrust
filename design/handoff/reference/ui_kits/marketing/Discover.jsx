const { AgentCard, Select, Input, Badge, Card } = window.RealFairTrustDesignSystem_b440fa;

function Discover({ onNavigate }) {
  const C = window.RFTContainer, E = window.RFTEyebrow;
  return (
    <div>
      <section style={{ padding: "56px 0 32px", borderBottom: "1px solid var(--hairline)" }}>
        <C>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
            <E>Ranking de mérito · 90 dias</E>
            <h1 style={{ fontSize: "var(--fs-display-2)", lineHeight: 1.04 }}>Consultores de Lisboa &amp; Porto</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-body)", lineHeight: 1.6, margin: 0 }}>
              Classificados pela qualidade por oportunidade nos últimos 90 dias. Recalculado a 1 de cada mês.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 260px" }}>
              <Input iconLeft={<window.IconSearch size={16} />} placeholder="Procurar por nome ou zona" />
            </div>
            <div style={{ width: 150 }}><Select label="Cidade" options={["Todas", "Lisboa", "Porto"]} /></div>
            <div style={{ width: 180 }}><Select label="Especialidade" options={["Todas", "Apartamentos", "Moradias", "Arrendamento", "Investimento"]} /></div>
            <div style={{ width: 190 }}><Select label="Ordenar por" options={[{value:"merit",label:"Mérito · 90 dias"},{value:"rating",label:"Satisfação"},{value:"response",label:"Tempo de resposta"}]} /></div>
          </div>
        </C>
      </section>

      <section style={{ padding: "44px 0 56px" }}>
        <C>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            {window.AGENTS.map((a) => (
              <div key={a.name} style={{ cursor: "pointer" }} onClick={() => onNavigate("profile", a)}>
                <AgentCard {...a} featured={a.rank === 1} />
              </div>
            ))}
          </div>
        </C>
      </section>

      <section style={{ padding: "0 0 80px" }}>
        <C>
          <Card variant="default" padding={32} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Badge variant="rising">Rising Talent</Badge>
              <h2 style={{ fontSize: "var(--fs-h2)" }}>Talento em ascensão</h2>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, margin: "-8px 0 0", maxWidth: 560 }}>
              Consultores ativos há menos de 6 meses — visíveis e motivados antes de terem um histórico completo de 90 dias.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
              {window.RISING.map((a) => (
                <div key={a.name} style={{ cursor: "pointer" }} onClick={() => onNavigate("profile", a)}>
                  <AgentCard {...a} />
                </div>
              ))}
            </div>
          </Card>
        </C>
      </section>
    </div>
  );
}

window.Discover = Discover;
