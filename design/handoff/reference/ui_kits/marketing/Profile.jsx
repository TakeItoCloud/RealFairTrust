const { Avatar, VerifiedBadge, Badge, Tag, StatBlock, Card, Button, PropertyCard } = window.RealFairTrustDesignSystem_b440fa;

function Profile({ agent, onNavigate }) {
  const a = agent || window.AGENTS[0];
  const C = window.RFTContainer, E = window.RFTEyebrow;
  const engine = [
    { value: "4.9", label: "Satisfação do cliente", w: "35%", gold: true },
    { value: a.stats?.[0]?.value || "66%", label: "Taxa de fecho", w: "25%" },
    { value: a.stats?.[1]?.value || "1.5h", label: "Tempo de resposta", w: "15%" },
    { value: "42%", label: "Conversão de leads", w: "15%" },
    { value: "18", label: "Oportunidades (90d)", w: "10%" },
  ];
  let listings = window.PROPERTIES.filter((p) => p.agentName === a.name);
  if (listings.length === 0) listings = window.PROPERTIES.slice(0, 2);

  return (
    <div>
      <section style={{ padding: "48px 0 0" }}>
        <C>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("discover"); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-muted)", marginBottom: 28 }}>
            ← Voltar ao ranking
          </a>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
            {/* Main */}
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
                <Avatar src={a.photo} name={a.name} size={92} ring />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <h1 style={{ fontSize: "var(--fs-h1)" }}>{a.name}</h1>
                    <VerifiedBadge variant="pill" label="Verificado" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-muted)" }}>
                    <window.IconMapPin size={16} color="var(--gold-500)" /> {a.city}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                    {a.badge === "top" && <Badge variant="gold">Top este mês</Badge>}
                    {a.badge === "rising" && <Badge variant="rising">Rising Talent</Badge>}
                    {(a.specialities || []).map((s) => <Tag key={s}>{s}</Tag>)}
                  </div>
                </div>
              </div>

              {/* Rating engine */}
              <Card variant="default" padding={28} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <E>Desempenho · janela de 90 dias</E>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--gold-300)" }}>Como é calculado →</a>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18 }}>
                  {engine.map((s) => (
                    <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <StatBlock value={s.value} label={s.label} gold={s.gold} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-faint)" }}>PESO {s.w}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* About */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h2 style={{ fontSize: "var(--fs-h3)" }}>Sobre {a.name.split(" ")[0]}</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--text-body)", lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
                  Consultor(a) imobiliário(a) focado(a) em {(a.specialities || ["imóveis"])[0].toLowerCase()} em {a.city.split(" · ")[0]}. Acompanhamento próximo, respostas rápidas e um histórico de clientes satisfeitos — tudo medido e verificado pela RealFairTrust.
                </p>
              </div>

              {/* Listings */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h2 style={{ fontSize: "var(--fs-h3)" }}>Imóveis deste consultor</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  {listings.map((p) => <PropertyCard key={p.title} {...p} />)}
                </div>
              </div>
            </div>

            {/* Sticky contact */}
            <div style={{ position: "sticky", top: 92, display: "flex", flexDirection: "column", gap: 18 }}>
              <Card variant="featured" padding={28} style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", textAlign: "center" }}>
                <VerifiedBadge variant="seal" sealSize={64} />
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 48, lineHeight: 1, background: "var(--gradient-gold-title)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{a.score}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-faint)" }}>Pontuação de mérito</span>
                </div>
                {a.rank != null && (
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)" }}>
                    #{a.rank} em {a.city.split(" · ")[0]} este mês
                  </div>
                )}
                <Button variant="primary" block>Contactar consultor</Button>
                <Button variant="ghost" block>Agendar visita</Button>
              </Card>
              <Card variant="default" padding={20} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <window.IconShieldCheck size={20} color="var(--green-verified)" />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>
                  Avaliações ligadas a interações reais de clientes. Sem sinais falsos.
                </p>
              </Card>
            </div>
          </div>
        </C>
      </section>
      <div style={{ height: 80 }} />
    </div>
  );
}

window.Profile = Profile;
