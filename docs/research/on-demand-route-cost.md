# On-demand /blog/search: cost and exposure on Netlify

Research for [#61](https://github.com/cascadiajs/cascadiajs/issues/61), part of the Blog map [#51](https://github.com/cascadiajs/cascadiajs/issues/51). Checked 2026-10-18 against `astro` 7.3.5 (installed) and `@astrojs/netlify` 8.2.10 (latest on npm; peer dependency `astro ^7.0.0`). The adapter is not yet installed in this repo. Context: ADR-0016 (on-demand routes via the Netlify adapter).

## Answer

| Question              | Short answer                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Abuse / rate limiting | Netlify offers per-IP rate limits on all plans, but only in code (2 rules per project on Free/Personal, 5 on Pro). Rules cannot go in `netlify.toml` for functions, only for `[[redirects]]`. The adapter generates one catch-all function (`path: '/*'`) whose config the site cannot edit, so a code rule on it is not available. Cost is billed as compute (GB-hours) and bandwidth, not per invocation. The Free plan is a hard cap that pauses the whole site. |
| CDN caching           | Function responses are not cached by default. Adding `Netlify-CDN-Cache-Control` (or `CDN-Cache-Control`) caches them at the edge. All query parameters are in the cache key by default, so `?q=a&utm=x` and `?q=a` are separate entries. `Netlify-Vary: query=q\|tag` restricts the key to those parameters. Every deploy invalidates the cache. `durable` shares entries across edge nodes.                                                                       |
| Images                | With `imageCDN` on (the default once the adapter is added), the adapter replaces Astro's image service, so no `/_image` endpoint is used on any page, prerendered or not. Every `astro:assets` image becomes a `/.netlify/images?url=…` URL. With `imageCDN: false`, prerendered pages keep build-time files and on-demand pages use `/_image`, which runs sharp inside the SSR function.                                                                           |

## 1. Abuse and rate limiting

### What Netlify provides

Source: Netlify docs, ["Rate limiting"](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/) and ["Request chain"](https://docs.netlify.com/platform/request-chain/).

- Code-based rules are available on all plans. Limit per project: 2 on Free/Starter/Personal, 5 on Pro/Enterprise, 100 on Enterprise with High Performance Edge. UI-based and per-domain (`aggregateBy: ["domain"]`) rules are Enterprise with High Performance Edge only.
- Config for a function or edge function is an exported `config` object that also needs a `path`:

  ```ts
  export const config = {
    path: "/blog/search",
    rateLimit: {
      windowLimit: 100,
      windowSize: 60,
      aggregateBy: ["ip", "domain"],
    },
  };
  ```

  `windowSize` is in seconds, maximum 180. Default aggregation is per IP and domain. The action is a `429` block, or a rewrite to another path.

- The page states: "rate limits for functions cannot be defined in the `netlify.toml` configuration file." For redirects only, `netlify.toml` accepts `[redirects.rate_limit]` (`window_limit`, `window_size`, `aggregate_by`). Rate limits cannot go in `_redirects`.
- After a client crosses the threshold, "it can take up to 10 seconds before Netlify starts blocking."
- Request-chain order: firewall, WAF, rate limiting, password protection, edge functions, edge cache, durable cache, Image CDN, serverless functions. Rate limiting runs before the edge cache, so a cache hit still counts toward the limit and a limited client gets no cached response.
- The docs do not say whether a rate-limited request is billed as a web request.

### Fit with the adapter

Source: adapter code, `@astrojs/netlify@8.2.10` `dist/index.js` (read from the published tarball).

- The adapter writes one function, `ssr.mjs`, with an inline config of `name: 'Astro SSR'`, `path: '/*'`, `preferStatic: true`. The site cannot add `rateLimit` to it without changing adapter output.
- Inference, not tested: a `[[redirects]]` rule in `netlify.toml` with `[redirects.rate_limit]` for `/blog/search` is the documented place for a config-file limit. Whether it works with a rewrite (`status = 200`) to the adapter's function was not verified. The doc's own example rewrites to an external URL.
- The adapter also writes an edge middleware function on `/*` (excluding `/_astro/*` and `/.netlify/images/*`) when `middlewareMode: 'edge'` is set. Edge functions accept `config.rateLimit`, but the adapter generates that config as well.

### What the Astro route can do itself

- The route receives the client IP (`clientAddress`, set by the adapter from `context.ip`). Keeping counters needs a store. The adapter already uses Netlify Blobs for sessions, so Blobs is available, but this is more code and more billable requests than a platform rule.
- Cheap input limits need no state: cap `q` length, accept only known `tag` values, return `400` otherwise, cap result count, and reject unknown query parameters. Combined with `Netlify-Vary` (below), this bounds the number of distinct cache keys an attacker can create.

### Cost model

Sources: Netlify ["How credits work"](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) and [Pricing](https://www.netlify.com/pricing/).

- Plans: Free 300 credits ($0), Personal 1,000 ($9/month), Pro 3,000 ($20/month).
- Serverless functions are billed as compute: 10 credits per GB-hour (about $0.07), "instead of charging per invocation." No per-invocation price or invocation cap is published on these pages.
- Web requests: 2 credits per 10,000 (about $0.01). Requests to functions and edge functions count. Edge functions count as web requests, not compute.
- Bandwidth: 20 credits per GB (about $0.13), including function responses.
- Free plan: "Hard limit." When credits run out, all projects on the account are paused and visitors see `Site not available`. So on Free, abuse of the search route can take the whole site down, not just search.
- Not documented on these pages: whether cache hits count as web requests differently from function hits.

## 2. CDN caching of query-parameter responses

Source: Netlify docs, ["Caching overview"](https://docs.netlify.com/build/caching/caching-overview/); adapter code `ssr-function.js` and `cache/provider.js`; Astro docs, ["Route caching"](https://docs.astro.build/en/guides/caching/).

- Default: "Responses from Netlify Functions, Edge Functions, and proxies are not cached by default" (`Cache-Control: public, max-age=0, must-revalidate`). A cache header is required.
- Header precedence: `Netlify-CDN-Cache-Control` (Netlify only) over `CDN-Cache-Control` (all supporting CDNs) over `Cache-Control` (CDN and browser). Netlify passes `CDN-Cache-Control` and `Cache-Control` downstream.
- Query strings: "By default, query parameters are part of the cache key for serverless function responses." So every distinct query string is a separate entry, junk parameters (`?q=a&x=1`) included. Whether parameter order changes the default key is not stated (order is ignored under `Netlify-Vary`).
- `Netlify-Vary: query=q|tag` makes only `q` and `tag` part of the key. Doc example: `query=style|season`. Parameter names are case-sensitive and order does not matter. Each URL must return the same `Netlify-Vary` value on every response. Other directives: `header`, `language`, `country`, `cookie`.
- Freshness: `Netlify-CDN-Cache-Control: public, max-age=60, stale-while-revalidate=120` serves fresh for 60 s, then stale for 120 s while revalidating.
- Durable cache: add `durable` to the header (`public, durable, max-age=60, stale-while-revalidate=120`). Responses go into a shared cache, so other edge nodes reuse them without invoking the function. It works for Netlify Function responses only, not edge functions. Duplicate invocations across regions can still happen in a short window.
- Invalidation: "each new deploy invalidates the cache for its deploy context." Setting `Netlify-Cache-ID` on the response opts out of automatic invalidation. On-demand purge by site or by cache tag uses `purgeCache()` or `https://api.netlify.com/api/v1/purge`, limited to 2 calls per 5 seconds per site or tag. Tags come from `Cache-Tag` or `Netlify-Cache-Tag` headers. A new blog post is a deploy (content is in the repo), so deploy invalidation already covers content changes.
- Debug with the `Cache-Status` response header (`"Netlify Edge"; hit` or `fwd=miss`).

### Adapter options

- `cacheOnDemandPages: true` (Astro docs, [Netlify adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/)): "will cache all server-rendered pages for up to one year." In the code, for GET and HEAD responses with none of `Cache-Control`, `CDN-Cache-Control`, `Netlify-CDN-Cache-Control` already set, it appends `CDN-Cache-Control: public, max-age=31536000, must-revalidate`. It sets no `Netlify-Vary`, so the default key (all query parameters) applies. It is site-wide for every on-demand route.
- Per route, set the header on the response: `Astro.response.headers.set('Netlify-CDN-Cache-Control', 'public, durable, max-age=…')` plus `Netlify-Vary`. A header set this way wins over `cacheOnDemandPages`.
- Astro route caching (`astro@7.0.0`, experimental provider): `cache: { provider: cacheNetlify() }` from `@astrojs/netlify/cache`, then `Astro.cache.set({ maxAge, swr, tags })`. The provider (code in `cache/provider.js`) emits `Netlify-CDN-Cache-Control` with `public, durable` plus `Netlify-Cache-Tag` (including a path tag) and supports tag and path invalidation through `purgeCache()`. It does not emit `Netlify-Vary`. The Astro docs mark the provider experimental.

## 3. Images on on-demand pages

Sources: Astro docs, ["Image Service API"](https://docs.astro.build/en/reference/image-service-reference/) and [Netlify adapter](https://docs.astro.build/en/guides/integrations-guide/netlify/); adapter code `image-service.js` and `index.js`; Netlify docs, ["Image CDN"](https://docs.netlify.com/image-cdn/overview/).

- Astro: a local service (one with `transform()`) builds images at build time for prerendered pages. "In dev mode and when using an adapter to render on demand," it serves them from a GET endpoint, `/_image` by default, which runs `parseURL()` and `transform()` at request time. An external service has only `getURL()` and points at a remote URL.
- The adapter's service is external: `image-service.js` exports `getURL`, `getHTMLAttributes`, `getSrcSet` and `validateOptions`, with no `transform`. `getURL` returns `/.netlify/images?url=<src>&fm=&w=&h=&q=&fit=`. SVG sources are returned unchanged.
- `imageCDN` (default on): `index.js` sets `image.service.entrypoint` to `@astrojs/netlify/image-service.js` unless `imageCDN === false` (or in dev with `devFeatures.images` off). This applies to the whole site, so adding the adapter for search also moves every existing `astro:assets` image (`<Image>` in Hero, TalkCard, PersonCard and others) from build-time files to Image CDN URLs, including on prerendered pages. Astro's docs say the same: the adapter "enables Netlify's Image CDN" even for static sites. With the Image CDN service, `/_image` is not used.
- Netlify Image CDN: transforms on request, caches the result at the edge ("uniquely cached"), respects atomic deploys (re-transforms if the source changed in a new deploy). Params: `url`, `w`, `h`, `fit`, `position`, `fm` (avif, jpg, png, webp, gif, blurhash), `q` (default 75). Invalid values return `404`.
- Remote images: must match `remote_images` regexes. The adapter writes `.netlify/v1/config.json` with `images.remote_images` built from Astro's `image.domains` and `image.remotePatterns`, so configure them in `astro.config`, not `netlify.toml`. Same-site images need nothing. Only matters if blog posts use remote images.
- `imageCDN: false`: the default Astro service (sharp) applies again. Prerendered pages get build-time files in `_astro`. On-demand pages use `/_image`, which transforms inside the SSR function, so it uses function compute and the function bundle must carry sharp.
- Cost: the credit docs list "Image serving - Images served through Netlify's CDN" under web bandwidth (20 credits/GB). No separate per-transformation credit meter appears on the credit-plan pages or the Image CDN page. Per-image requests count as web requests (2 credits per 10,000). The docs do not say how a cache hit on a transformed image is metered. Legacy plans metered transformations separately; this repo is on a credit plan only if the account is new since 2025-09-04, which this research did not check.
- Request chain: `/.netlify/images` is handled by the Image CDN stage, before serverless functions. Image requests do not invoke the SSR function.
- The site's `image.layout: "constrained"` is in `astro.config.mjs`. Astro generates `srcset` through the service's `getSrcSet`, so every width variant is a separate `/.netlify/images` request that is transformed on first use.

## Open points the sources do not settle

- Whether a `[[redirects]]` rate-limit rule works in front of the adapter's catch-all function (untested).
- Whether cache hits and rate-limited requests are billed as web requests.
- A published per-invocation price or invocation cap for functions on credit plans.
- Which billing model the cascadiajs account is on (credit-based or legacy).
