# COPY NOTES — collected wording changes (applied in the 4.5 polish PT/EN copy pass)

> **The rule.** During **Phase 4.3 / 4.4**, copy/title/description **wording** changes Carlos wants
> are **COLLECTED here — not applied piecemeal**. They are all applied together in **one batch**
> during the **Phase 4.5 polish PT/EN copy pass**, so the copy stays coherent across pages and both
> locales, and page-build PRs stay focused on structure/behaviour rather than churning UI strings.
>
> **The single exception:** text that is **factually wrong** (a wrong price, a broken/incorrect route
> label, an untrue claim, a mislabelled place) is a **bug** — fix it immediately in the relevant PR,
> not here.
>
> **How to add an entry:** append a row to the table. Keep the *current text* verbatim (copy it from
> the running app / `messages/{pt,en}.json`) so it's findable, and give the *desired text* exactly as
> it should read. Note the locale(s) affected — a change may apply to PT only, EN only, or both (with
> different strings per locale). Set **Status** to `open` until applied; flip to `applied (4.5)` when
> the copy pass lands it, keeping the row for history.
>
> **Where the strings live:** almost all UI copy is in `messages/pt.json` + `messages/en.json`
> (next-intl namespaces); page `<title>`/`<meta description>` live in the route `metadata` exports.

## Collected changes

| Date | Page / route | Current text | Desired text | Locale(s) | Status |
|------|--------------|--------------|--------------|-----------|--------|
| _(none yet — add rows above this line)_ | | | | | |
