The two marketplace tiles. `AgentCard` is the product's centrepiece — a fair, comparable consultant summary; `PropertyCard` is a listing that always credits a ranked agent.

```jsx
<AgentCard rank={1} name="Sofia Marques" city="Lisboa · Príncipe Real"
  score="94" badge="top" specialities={["Apartamentos","Compra"]}
  stats={[{value:"68%",label:"Taxa de fecho"},{value:"1.2h",label:"Resposta"}]} featured />

<PropertyCard image="…" price="€ 720 000" title="Apartamento T3 renovado"
  location="Lisboa · Estrela" deal="sale" beds={3} baths={2} area={128} energy="A+"
  agentName="Sofia Marques" />
```

The merit score and price are the only bright-gold elements per card — let them lead. Top-3 agents get the gold rank coin and avatar ring automatically, plus a gold top-accent bar &amp; score glow on hover. Use `featured` for the #1 spot or a single highlighted listing. PropertyCard uses the "Editorial Overlay" treatment (gradient scrim, gold price on the image, image zoom on hover) and always carries the "Dados de demonstração" badge until backed by real data. Every PropertyCard should name its consultant: listings exist to route demand to ranked agents.
