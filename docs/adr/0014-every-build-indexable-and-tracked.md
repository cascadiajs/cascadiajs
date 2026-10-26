# Every Build Is Indexable and Tracked

Every build, whatever its address, is indexable by search engines and loads analytics (GA4, Meta Pixel and PostHog). There is no live/non-live distinction in the code: robots.txt always allows crawling and lists the sitemap, no page carries a `noindex` meta tag, and `Layout` always emits every analytics snippet. Traffic from anywhere other than cascadiajs.com is filtered out vendor-side, not at build time.

**Vendor-side filtering.** GA4 drops non-production hits with a "Web hostname traffic" data filter ([GA4 data filters](https://support.google.com/analytics/answer/10108813)). Meta Pixel does the same with a Traffic permissions allowlist of domains ([Meta Pixel traffic permissions](https://www.facebook.com/business/help/278125336598935)). PostHog does the same with its internal and test account filters, set to drop events whose `$host` is not cascadiajs.com. All three are configured in the vendor dashboards, not in this repo.

**Duplicate indexing is acceptable.** Until cutover the same content can be reachable on netlify.app and cascadiajs.com. Google does not treat duplicate content as a spam violation and chooses a canonical URL itself ([canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)). Netlify adds `X-Robots-Tag` only to Deploy Previews and older branch deploys, not to production ([deploy overview](https://docs.netlify.com/deploy/deploy-overview/)), so previews stay out of the index without any help from the code.

**Frozen Snapshots.** The 2024 and 2025 Event pages are raw captured pages ([ADR-0008](0008-past-event-pages-are-frozen-snapshots.md)). Their GA4 and Meta Pixel snippets are uncommented in source, which restores the analytics the legacy page was captured with. Analytics on these pages is part of the capture, not an addition, so ADR-0008 still holds. PostHog came after the capture and lives only in `Layout`, so the Frozen Snapshots do not load it.

## Consequences

**Cutover needs a forced 301.** Netlify keeps serving `*.netlify.app` after a custom domain is added ([understand domains](https://docs.netlify.com/manage/domains/domains-fundamentals/understand-domains/)), and that address is now indexable. Cutover therefore needs a forced 301 domain-level redirect from netlify.app to cascadiajs.com ([redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/)).

**Tests need no environment switch.** Every build has the same output, so the e2e suite checks the real robots.txt, meta tags and analytics snippets. The Playwright config blocks the analytics hosts so tests send no hits.

## Considered Options

- **A build-time live check.** A Netlify `CONTEXT` plus `URL` test that turned `noindex` and analytics on only for cascadiajs.com production. Rejected: it added machinery (a helper, a build step to uncomment Frozen Snapshot analytics, a redeploy-after-adding-the-domain step at cutover) for a problem the vendor filters already solve.
- **Manual edits at cutover.** Rejected: several files must change at once and any miss launches the site de-indexed or untracked.
