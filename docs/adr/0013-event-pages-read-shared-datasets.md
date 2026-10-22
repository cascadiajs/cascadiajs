---
status: partially superseded by ADR-0017 (the clause that a Speaker stays embedded in their Talk)
---

# Event Pages Read Shared Per-Event Datasets

An Event from 2026 onward keeps its Event Dataset — Talks, Organizers, Tickets, Activities — in shared files under `src/shared/data/<Event Key>/`, not in the frontmatter of the pages that render them. Each Event's Talks are their own content collection (`talks2026`, then `talks2027`), read directly with `getCollection` as Astro intends; the rest of the Event Dataset is read through one module keyed by Event Key, so a new Event adds a folder and a Talks collection, not a new module. This **supersedes ADR-0010's data-ownership clause** ("Events 2026 and later still own their data … not in a Collection or `src/shared/data/*.json`") and its clause that `Talk.speaker` becomes a reference into `Person`: a Speaker stays embedded in their Talk, because a Speaker is only ever shown through their Talk and nothing looks one up alone. The rest of ADR-0010, the shared presentational components, still stands.

ADR-0010's clause was never implemented: the commit that added ADR-0010 also moved the 2026 roster and tickets into JSON files, and the code has read them from there since. The datasets are not page-local in practice either. The Talks of an Event render on its home page, its schedule and its talk pages, and the e2e specs read the same files, so inlining them would copy a still-changing record into several pages. This meets ADR-0008's own test for a shared dataset: many pages show it, and it changes over time.

**Scope.** This applies only to Event pages that are not Frozen Snapshots. Events 2025 and earlier remain Frozen Snapshots under ADR-0008: their content stays inlined in their own page, and they must not be moved onto these datasets or this module.

## Considered Options

- **Enforce ADR-0010 as written** — move every dataset into page frontmatter. Rejected: it reverses what the code has always done and duplicates Talks across pages.
- **Share only multi-page data** — keep Talks shared, inline Organizers, Tickets and Activities into their single page. Rejected: it moves three files only to honour a clause that was never in force, and splits one Event's records across two storage rules.
