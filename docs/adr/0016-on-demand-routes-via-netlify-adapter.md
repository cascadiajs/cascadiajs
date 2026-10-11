# On-Demand Routes via the Netlify Adapter

The site stays `output: 'static'`, but adds `@astrojs/netlify` so individual routes can render on demand with `export const prerender = false`. Each such route deploys as a Netlify Function; every other page is still prerendered exactly as before. Only routes that need request data (query strings, and future endpoints) opt out of prerendering. The first is blog search at `/blog/search?q=…&tag=…`, which filters the `blog` Collection with `getCollection()` per request and renders results with the same Post card component as `/blog`, so search works without JavaScript.

## Considered Options

- **Client-side search over an index embedded in `/blog`.** No adapter and results as you type, but the card markup would be duplicated in client JS and search would need JavaScript.
- **A server island (`server:defer`) inside a static `/blog`.** An island on a prerendered page cannot see the page's query string except through the `Referer` header, which is fragile.
- **Middleware reading the query string.** On prerendered pages middleware runs only at build time, when there is no query string.

## Consequences

The runtime cost of on-demand routes (abuse and rate limiting, CDN caching of responses, and how images on on-demand pages are served, given the adapter enables Netlify Image CDN by default) is not yet decided.
