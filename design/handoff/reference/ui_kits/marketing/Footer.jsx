// Footer for the marketing site.
const { Logo } = window.RealFairTrustDesignSystem_b440fa;

function Footer() {
  const cols = [
    { h: "Marketplace", items: ["Consultores", "Imóveis à venda", "Arrendamento", "Rising Talent"] },
    { h: "Como funciona", items: ["O ranking de mérito", "Metodologia", "Para consultores", "Vender connosco"] },
    { h: "Empresa", items: ["Sobre", "Lisboa & Porto", "Contacto", "Carreiras"] },
    { h: "Legal", items: ["Privacidade", "Termos", "Cookies", "RGPD"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--champagne-border)", background: "var(--champagne)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "56px 32px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
            <Logo variant="full" size={22} tagline onIvory />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--champagne-ink-muted)", lineHeight: 1.6, margin: 0 }}>
              A escolha de consultor imobiliário, tão transparente e baseada no mérito como deve ser. Lisboa &amp; Porto.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--champagne-eyebrow)" }}>{c.h}</span>
              {c.items.map((i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--champagne-ink-muted)" }}>{i}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid var(--champagne-border)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--champagne-ink-muted)" }}>
          <span>© 2026 RealFairTrust · Performance you can see</span>
          <span>Feito em Portugal 🇵🇹</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
