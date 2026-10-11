## Project

**Stack:** Astro. All new work is Astro only.

**Package manager:** pnpm. Use `pnpm`/`pnx exec`, not `npm`/`npx`.

**Legacy Site:** the Enhance implementation this port reproduces is preserved on the [cascadiajs-legacy-pre-migration](../../tree/cascadiajs-legacy-pre-migration) branch. Historical reference only, not a specification to verify against. Never copy Enhance routing patterns, `$`/`$$` catch-all routes, or component patterns into Astro.

**Imports:** Cross-directory imports between top-level `src/` directories use the `@components`, `@layouts`, `@shared` and `@assets` aliases (tsconfig `paths`); `styles` stays relative.

**Acceptance bar:** The new app must be indistinguishable from the legacy site — visually, by URL, and behaviorally. URL preservation is in scope.

**Out of scope:**

- Luma ticketing integration
- Supabase backend
- Astra DB
- Storyblok
- Admin UI (a separate global admin experience exists; it is not ported here)
- Previous years' content (deferred)

**Assets and data** are stored locally in the repo.

**Docs:** `README.md` is the human onboarding guide. When a change alters something it documents (layouts, routing, content/data shape, commands, workflow, recipes), update the matching README section in the same change.

## Agent skills

### Issue tracker

Issues live in GitHub Issues on cascadiajs/cascadiajs. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
