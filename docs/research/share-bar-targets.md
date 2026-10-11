# Share bar: targets and URL formats

Research for [#133](https://github.com/bniedermeyer/cascadiajs-neo/issues/133), part of the Blog map [#131](https://github.com/bniedermeyer/cascadiajs-neo/issues/131). Checked 2026-10-10.

## Answer

| Target | URL / API | Notes |
| --- | --- | --- |
| Bluesky | `https://bsky.app/intent/compose?text=<enc(title + " " + url)>` | Only `text` exists, so the URL goes inside it. 300 grapheme limit. |
| LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url=<enc(url)>` | Only `url` matters. The preview comes from the page's `og:*` tags. |
| X | `https://x.com/intent/tweet?text=<enc(title)>&url=<enc(url)>` | Optional `via=<handle>`. 280 chars including url/hashtags/via. |
| Copy link | `navigator.clipboard.writeText(url)` in a click handler | Baseline widely available. Needs HTTPS and a user gesture. |
| Native share | `navigator.share({ title, text, url })` in a click handler | Missing on desktop Firefox. Needs HTTPS and a user gesture. |

**Recommendation:** use native share alongside the per-network buttons, not instead of them. Always render Bluesky, LinkedIn, X as plain `<a href>` links (they work with JS off) plus Copy link. Show the native Share button only when `navigator.share` exists. Details below.

## Bluesky

Source: Bluesky docs, "Action Intent Links" ([docs.bsky.app/docs/advanced-guides/intent-links](https://docs.bsky.app/docs/advanced-guides/intent-links); source file [bluesky-social/bsky-docs `docs/advanced-guides/intent-links.md`](https://github.com/bluesky-social/bsky-docs/blob/main/docs/advanced-guides/intent-links.md)).

- Endpoint: `https://bsky.app/intent/compose`, with one query parameter, `text`. The docs say "Currently only the `compose` action URL endpoint is implemented."
- There is **no `url` parameter**. To share a link, put it in `text`, as the docs' own example does (`text=I'm reading through the Bluesky API docs! 🦋\nhttps://docs.bsky.app`).
- Limit: "the post length limit on Bluesky is 300 characters (more precisely, 300 Unicode Grapheme Clusters)". The text must be URL-escaped.
- Logged-out users are asked to sign in first. The compose box is pre-filled, and the user still has to confirm the post.
- The mobile app also accepts `bluesky://intent/compose` with the same parameter. The `https://bsky.app` form is enough for the web.

## LinkedIn

LinkedIn has no current official docs for a share URL. What does exist:

- **Official Share Plugin** ([Microsoft Learn: Share Plugin](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/plugins/share-plugin)) is a JS widget (`platform.linkedin.com/in.js` + `<script type="IN/Share" data-url="…">`). Its loader script contains `share_url: "https://www.linkedin.com/cws/share"`. That is the endpoint LinkedIn's own button opens, passing `url`.
- The ["Share on LinkedIn" API guide](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin) covers only the OAuth/UGC Posts API (`w_member_social`). That's the wrong tool for an anonymous share button.
- **Observed behavior** (curl, logged out, 2026-10-10): all three common forms redirect to the same `shareArticle?url=…` composer:
  - `https://www.linkedin.com/cws/share?url=…` → `/shareArticle?url=…`
  - `https://www.linkedin.com/sharing/share-offsite/?url=…` → `/shareArticle/?url=…`
  - `https://www.linkedin.com/shareArticle?mini=true&url=…` → `/shareArticle?mini=true&url=…`
- Use `share-offsite/?url=` (or `cws/share?url=`, the endpoint LinkedIn's own plugin uses). Pass **only `url`**. The old `title`/`summary`/`source` parameters come from the retired `shareArticle` docs, and no current LinkedIn doc says they still work. Treat them as ignored. (This is inference: no primary source says either way.)
- The preview card comes from the target page's Open Graph tags. LinkedIn Help, ["Make your website shareable on LinkedIn"](https://www.linkedin.com/help/linkedin/answer/a521928), lists `og:title`, `og:image`, `og:description`, `og:url`. Images need at least 1200×627 px, a 1.91:1 ratio and at most 5 MB. Images narrower than 401 px show as a thumbnail. So the per-post OG metadata the map already plans is what makes LinkedIn shares look right.

## X

Source: X developer docs, ["Web intent"](https://docs.x.com/x-for-websites/post-button/guides/web-intent) (the old `developer.twitter.com` page has the same table).

- Endpoint: `https://x.com/intent/tweet`.
- Parameters:
  - `text`: pre-filled, URL-encoded post text, shown selected so the user can edit it.
  - `url`: a fully qualified http/https URL, URL-encoded, which t.co shortens.
  - `hashtags`: comma-separated, without `#`.
  - `via`: a username, which adds "via @username" and may be suggested as an account to follow.
  - `related`: comma-separated usernames, each optionally followed by a URL-encoded `:description`.
  - `in_reply_to`: a post ID.
- Limit: text together with `hashtags`, `via` and `url` "should not exceed 280 characters". Text over the limit is not truncated. The user has to edit it before posting.
- Pass the link as `url`, not inside `text`, so X can count it at the t.co length. `via` makes sense only if the site has an X account it wants credited. Leave it out unless one is agreed.

## Web Share API (`navigator.share`)

Sources: [MDN `Navigator.share()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share), [W3C Web Share spec](https://w3c.github.io/web-share/), [MDN browser-compat-data](https://github.com/mdn/browser-compat-data) v8.1.5 (2026-10-08) `api.Navigator.share`.

Requirements:

- **Secure context.** The IDL is `[SecureContext] Promise<undefined> share(...)`, so `navigator.share` is `undefined` over plain HTTP. `localhost` counts as secure for dev.
- **Transient activation.** Without a recent user gesture the call rejects with `NotAllowedError`, and each call consumes the activation (spec steps 6–7). Call it directly from the click handler, with no `await` before it.
- **Permissions policy `web-share`.** The default allowlist is `'self'`, so it works in top-level pages and is blocked in third-party iframes unless the iframe allows it.
- **Rejections:**
  - `AbortError`: the user cancelled, or no targets are available. This is normal; ignore it silently.
  - `NotAllowedError`: no gesture, or blocked by policy.
  - `InvalidStateError`: another share is already open.
  - `TypeError`: bad data.
  - `DataError`: the target failed.
- **`url` resolution.** `url` is resolved against the page, and the spec notes `''` means the current page. Pass the canonical absolute URL anyway.
- `navigator.canShare()` matters mainly for files. For `{ title, text, url }`, checking that `navigator.share` exists is enough.

Support (BCD):

| Browser | Desktop | Mobile |
| --- | --- | --- |
| Chrome | 128+ (89–127: Windows and ChromeOS only) | Android 61+ |
| Edge | 93+ (81–92: Windows only) | (Chromium on Android) |
| Safari | 12.1+ | iOS 12.2+ |
| Firefox | **No.** Behind the `dom.webshare.enabled` pref only | Android 79+ |
| Samsung Internet | – | 8.0+ |

MDN marks the API **"Limited availability"** (not Baseline) because desktop Firefox lacks it. BCD records Chrome desktop as fully supported from 128 and doesn't note per-OS gaps after that. Linux desktop Chrome support was not verified here, so test it.

## Copy-link fallback (Clipboard API)

Sources: [MDN `Clipboard.writeText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), [MDN Clipboard API, security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#security_considerations), BCD `api.Clipboard.writeText`.

- `navigator.clipboard.writeText(text)` is **Baseline, widely available** (since March 2020): Chrome/Edge 66/79+, Firefox 63+, Safari 13.1+, iOS Safari 13.4+, Samsung 9.0+.
- It works only in secure contexts. Firefox and Safari require transient activation. Chromium requires either transient activation or the `clipboard-write` permission. Firefox and Safari don't support (and don't plan) the `clipboard-write` permission, so **always call it from the click handler.**
- On failure it rejects with `NotAllowedError`. Catch it.
- Show a short "Link copied" status in an `aria-live="polite"` region, so screen readers announce it too.
- When it fails or `navigator.clipboard` is missing (plain HTTP), select the URL in a read-only text field so the user can copy it by hand. The deprecated `document.execCommand('copy')` path isn't worth adding, given Baseline support.

## Recommendation: alongside, not instead

Keep the per-network buttons and add native share as an extra button. Don't swap the buttons out on capable devices, because:

1. **Coverage.** Desktop Firefox has no `navigator.share`, so per-network links and Copy link have to exist for those users anyway (BCD).
2. **The native sheet doesn't reliably list the targets.** It shows the OS share targets: installed apps, Messages, Mail, AirDrop. Bluesky, LinkedIn or X appear only if the user has the app installed, and on desktop Safari/Chrome rarely at all. A visitor who wants to post to Bluesky gets there more reliably with the direct intent link.
3. **No-JS.** The three network links are plain `<a href>` built at build time (the post URL and title are static). They work with JS off, which answers part of the map's open question about JS-off behavior. Copy link and Share need JS, so render them hidden and reveal them from script. Reveal Share only when `'share' in navigator`.
4. **Predictable layout.** Feature detection then only adds one button. It doesn't rearrange the bar, so there's no layout shift between devices.

Suggested bar, in order: Bluesky · LinkedIn · X · Copy link · Share (only where supported). Open the network links in a new tab (`target="_blank" rel="noopener noreferrer"`) rather than a JS popup, so they stay plain links.

Suggested link construction (title = Post `title`, url = canonical absolute Post URL):

```js
const u = encodeURIComponent(url);
const bluesky = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`;
const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
const x = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${u}`;
```

Open questions for the spec:

- Whether to add `via=<handle>` on X, and which handle.
- Whether Bluesky text should be just the title or include a handle mention. Keep it under 300 graphemes either way.
