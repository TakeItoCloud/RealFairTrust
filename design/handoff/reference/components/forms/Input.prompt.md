Form fields for search and discovery filters. Inset wells on the navy stage with a gold focus ring.

```jsx
<Input label="Email" type="email" placeholder="voce@exemplo.pt" />
<Input iconLeft={<Search size={16} />} placeholder="Procurar consultor ou zona" />
<Select label="Cidade" options={["Lisboa", "Porto"]} />
<Select options={[{value:"merit",label:"Mérito (90 dias)"},{value:"rating",label:"Avaliação"}]} />
```

Labels are quiet sentence-case (Inter medium, muted). The gold focus ring is the only place gold touches form controls. Group filters in a horizontal row with `gap` on discovery pages.
