# Data attribution — administrative divisions (CAOP)

`pt-caop2025.json` contains Portugal's official administrative divisions
(distrito / região autónoma → concelho → freguesia, keyed by DICOFRE).

- **Source:** **Direção-Geral do Território (DGT)** — *Carta Administrativa Oficial de
  Portugal (CAOP) 2025*. Retrieved from DGT's `infogeo` ArcGIS FeatureServer hosted layers
  (the same CAOP data published at [dados.gov.pt](https://dados.gov.pt/) and
  [ogcapi.dgterritorio.gov.pt](https://ogcapi.dgterritorio.gov.pt/)):
  - Continente — `FreguesiaCAOP2025`
  - Açores — `Freguesias_do_Grupo_Oriental` / `_Central` / `_Ocidental`
    (the combined `Freguesias_RAA` layer blanks the Grupo Oriental DICOFRE, so the per-group
    layers are used)
  - Madeira — `Freguesias_do_Arquipélago_da_Madeira`
- **Licence:** **CC BY 4.0** — https://creativecommons.org/licenses/by/4.0/
- **Required attribution:** **"Direção-Geral do Território (DGT)"**
- **Counts loaded:** 20 top-level (18 distritos + 2 regiões autónomas) · 308 concelhos ·
  3 259 freguesias (current CAOP2025 = post-2013 reform incl. post-2021 desagregações).

The same attribution is surfaced in the product on the property-discovery pages.
