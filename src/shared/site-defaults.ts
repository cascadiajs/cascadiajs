/**
 * Sitewide defaults, changed together when an Event launches (FEATURED_EVENT and
 * DEFAULT_DESCRIPTION are the launch edits). Head defaults are ported from
 * legacy `app/head.mjs`. Must stay import-free: Event configs import
 * DEFAULT_DESCRIPTION, so any import here risks a cycle. Pages with no
 * title/description of their own (homepage, legal pages, /2026/sponsor, ...)
 * fall through to these -- one source of truth, consumed by Layout.astro and
 * the Event config's fallback description.
 */
export const DEFAULT_TITLE = "CascadiaJS - a JS conf for the PacNW";
export const DEFAULT_DESCRIPTION =
  "CascadiaJS 2027 is coming up on June 7 - 8 in Seattle, WA!";

/** Event Key of the Featured Event (see GLOSSARY.md). */
export const FEATURED_EVENT = "2027" as const;

/**
 * Legacy analytics IDs, kept so reporting carries on across the migration.
 * Emitted on every page (ADR-0014).
 */
export const GA4_ID = "G-XBTPEH9RZW";
export const META_PIXEL_ID = "1431763387943877";

/**
 * PostHog project API key (starts with `phc_`; public by design). Loaded on
 * every page like the IDs above (ADR-0014). The key is under PostHog →
 * Project settings. Empty keeps PostHog off.
 */
export const POSTHOG_KEY = "phc_sdbLxJtTjYECEQwzZGpSiN76bmVVpzWQfsf6k9p3Vq7i";
/**
 * Events go through our Cloudflare reverse proxy so ad blockers don't drop
 * them; the proxy forwards to PostHog US Cloud. POSTHOG_UI_HOST keeps the
 * SDK's links into the PostHog app (toolbar, etc.) pointing at PostHog.
 */
export const POSTHOG_HOST = "https://g.cascadiajs.com";
export const POSTHOG_UI_HOST = "https://us.posthog.com";
