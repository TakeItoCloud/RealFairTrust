# Note — Adding new cities (keep it code-free)

**Principle:** a city is **data + a flag**, never new code or new pages. This is decided
now so that expanding from Lisbon/Porto to any other city later never triggers a rewrite.

## The model

- A `regions` hierarchy: **district → city/municipality → zone** (formalized in the Phase 1
  content model and the Phase 5 Supabase schema).
- Every **agent** and every **listing** references a `city_id` (and optional `zone_id`).
- Discovery pages (`/consultores`, `/comprar`, `/arrendar`) **filter by region** from a
  selector. They are *not* hand-built per city — one page template serves all cities.
- Each city row has a **`live` boolean** (feature flag). A city can exist in the data and be
  populated while still hidden from the public until you flip it on.

## Routing

Reserved, stable URLs use a region **filter or dynamic segment** that reads from data:
- `/consultores?city=porto` (filter) — simplest, recommended for launch.
- Optional later: `/consultores/porto` (dynamic `[city]` segment) for SEO-friendly URLs —
  still one template, still data-driven. Decided in Phase 1.

## Adding a city — the checklist

1. Insert the region row(s) (district/city/zones).
2. Onboard / approve a starter set of consultants for that city.
3. Add initial listings.
4. (If wanted) add any city-specific copy to the PT/EN message files.
5. Flip `live = true`.

No migration. No new components. No structural change.

## Why the rating engine "just works" for new cities

Scores are computed **per agent** over the rolling 90-day window and then **filtered by
city** at display time. A new city's agents are ranked among themselves automatically as
soon as they have activity; the Rising Talent board applies the same way.
