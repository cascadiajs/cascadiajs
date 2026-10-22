# CascadiaJS

The website for [CascadiaJS](https://cascadiajs.com), the Pacific Northwest's web + AI developer conference. It's a static [Astro](https://docs.astro.build) site styled with [Tailwind CSS v4](https://tailwindcss.com/docs), with all content and data stored in this repo. It deploys to Netlify.

This README is the onboarding guide. Read it top to bottom once, then return to the section you need.

- [Getting started](#getting-started)
- [How we work](#how-we-work)
- [Project map](#project-map)
- [Key terms](#key-terms)
- [Pages and routing](#pages-and-routing)
- [Layouts: which one to use](#layouts-which-one-to-use)
- [Content and data](#content-and-data)
- [Styling](#styling)
- [Recipes](#recipes)
- [Testing and CI](#testing-and-ci)
- [Working with an agent](#working-with-an-agent)
- [Gotchas](#gotchas)

New to Astro or Tailwind? Skim the Astro docs on [project structure](https://docs.astro.build/en/basics/project-structure/), [components](https://docs.astro.build/en/basics/astro-components/), [layouts](https://docs.astro.build/en/basics/layouts/) and [content collections](https://docs.astro.build/en/guides/content-collections/), and Tailwind's [core concepts](https://tailwindcss.com/docs/styling-with-utility-classes). This guide assumes you know that much.

## Getting started

**Prerequisites:** Node 22.12 or newer and [pnpm](https://pnpm.io/installation) 12.7 (pinned in `package.json` under `packageManager`). Use `pnpm`, never `npm` or `npx`. For one-off binaries, use `pnpm exec`.

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

| Command          | What it does                                        |
| :--------------- | :-------------------------------------------------- |
| `pnpm dev`       | Dev server with hot reload at `localhost:4321`      |
| `pnpm build`     | Production build to `dist/`                         |
| `pnpm serve`     | Build and serve the site as Netlify does            |
| `pnpm check`     | Type-check `.astro` and `.ts` files (`astro check`) |
| `pnpm lint`      | ESLint (`pnpm lint:fix` to auto-fix)                |
| `pnpm test`      | Build, serve, and run the Playwright e2e suite      |
| `pnpm test:unit` | Run the Vitest unit tests                           |

A pre-commit hook (Husky + lint-staged) runs ESLint `--fix` and Prettier on staged files, then `astro check`, then the unit tests (`pnpm test:unit`), then the Playwright suite (`pnpm test`). CI runs the tests too.

## How we work

### Issues and triage labels

We track work in [GitHub Issues](https://github.com/cascadiajs/cascadiajs/issues). Each issue carries one triage label:

| Label             | Meaning                                                                |
| :---------------- | :--------------------------------------------------------------------- |
| `needs-triage`    | New. Waiting for a maintainer to evaluate it                           |
| `needs-info`      | Waiting on the reporter for more detail                                |
| `ready-for-agent` | Fully specified. An agent can implement it unattended                  |
| `ready-for-human` | Needs a person: judgment calls, design taste, or access an agent lacks |
| `wontfix`         | We will not work on it                                                 |

The `ready-for-agent` and `ready-for-human` labels decide who builds an issue: an agent or you. An agent-ready issue has acceptance criteria that an agent can check without asking questions. If you take a `ready-for-agent` issue and it is not fully specified, relabel it instead of guessing.

### Branches, commits and PRs

- Create a branch from `main`. Open a PR into `main`.
- Commit messages use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `ci:`. Read `git log` for examples of the house style.
- CI must be green before merge. It runs lint, a Prettier check, `astro check`, a production build, the unit tests, and the Playwright suite. See [Testing and CI](#testing-and-ci).
- If you change something this README documents (layouts, routing, content shape, commands, workflow, recipes), update the matching section in the same PR.

### Decisions and vocabulary

- [`GLOSSARY.md`](GLOSSARY.md) is the glossary. Use its terms in code, issues and PRs.
- [`docs/adr/`](docs/adr/) holds the architecture decision records. Read the ADRs that touch an area before changing it. To reverse a decision, write a new ADR that supersedes the old one, and leave the old one in place.

## Project map

```text
src/
  pages/            Routes. File path = URL (see Pages and routing)
  layouts/          Page shells: Layout, EventLayout, MarkdownLayout, SimplePage
  components/       Presentational Astro components
    schedule/       Building blocks for the Event schedule page
    table/          Table primitives (used by the sponsorship brochure)
    blog/           Blog Post, index, Author, search and share components
  shared/
    data/           JSON datasets, Event configs, shared types, data helpers
    site-defaults.ts  Site-wide title/description, Featured Event, analytics IDs
    route-path.ts   Normalized route path for canonical URLs
  assets/           Images processed by Astro (people, sponsor logos, page images)
  styles/global.css Tailwind entry point and design tokens
  content.config.ts Content collections and their Zod schemas
  content/markdown/ Content pages (.md / .mdx), one file per page
public/             Files served as-is: share images, video, downloads, favicon, `_redirects` (Netlify legacy-URL redirects)
e2e/                Playwright tests
docs/
  adr/              Architecture decision records
  agents/           Config that agent skills read (issue tracker, labels, domain docs)
.agents/skills/     Agent skills (symlinked into .claude/skills/)
GLOSSARY.md          Domain glossary
CLAUDE.md           Rules for coding agents (AGENTS.md is a symlink to it)
```

The previous Enhance site (the Legacy Site) is preserved on the [cascadiajs-legacy-pre-migration](../../tree/cascadiajs-legacy-pre-migration) branch, as a historical reference only.

### Imports

Imports that cross top-level `src/` directories use path aliases, never `../`:

```ts
import EventLayout from "@layouts/EventLayout.astro";
import CtaButton from "@components/CtaButton.astro";
import { getTickets } from "@shared/data/events";
import hero from "@assets/images/hero-camper.png";
```

The aliases are `@components`, `@layouts`, `@shared` and `@assets`. Stylesheets stay relative (`../styles/global.css`). **ESLint fails on a relative import into an aliased directory**, including from `e2e/`, so the pre-commit hook and CI will catch it.

## Key terms

The full glossary is in [`GLOSSARY.md`](GLOSSARY.md). You'll meet these four throughout the code:

- **Event**: one annual CascadiaJS conference, such as CascadiaJS 2026.
- **Event Key**: the short id that ties data to an Event: a year (`"2026"`) or the bucket `"previous"` for older sponsors. In code, the `EventYear` type holds a value that can only be a real year, and you can name that value `year`. Anything that can hold `previous` is an Event Key.
- **Featured Event**: the one Event the site-wide pages (homepage, header, footer, legal and general content pages) promote. `FEATURED_EVENT` in `src/shared/site-defaults.ts` sets it, and you change it when a new Event launches. An Event's own pages always refer to _that_ Event, never to the Featured Event.
- **Event Dataset**: an Event's Talks (each with its Speaker), Organizers, Tickets and Activities, stored under `src/shared/data/<year>/`. Sponsors and Testimonials span Events, so they aren't part of it.

## Pages and routing

There are two kinds of page.

**Hand-written pages** are `.astro` files in `src/pages/`. The file path is the URL: `src/pages/2026/schedule.astro` serves `/2026/schedule`. Use these for anything with custom structure: the homepage, the Event landing page, the schedule, Talk pages, and the legal pages.

**Content pages** are Markdown files in `src/content/markdown/`, served by two catch-all routes:

| File                                               | URL                         | Route                              |
| :------------------------------------------------- | :-------------------------- | :--------------------------------- |
| `src/content/markdown/code-of-conduct.md`          | `/code-of-conduct`          | `src/pages/[...slug].astro`        |
| `src/content/markdown/2026/attend.mdx`             | `/2026/attend`              | `src/pages/[year]/[...slug].astro` |
| `src/content/markdown/2026/next-steps/speakers.md` | `/2026/next-steps/speakers` | `src/pages/[year]/[...slug].astro` |

A file under a year folder only gets a page if that Event has a config in `src/shared/data/events/` (see [Launching a new Event](#launching-a-new-event)). Set `published: false` in frontmatter to keep a page out of the build.

**Blog Posts** are folders in `src/content/blog/`, served by `src/pages/blog/post/[slug].astro` at `/blog/post/<slug>`. The folder name is the slug. Every blog route gets its Posts from `getVisiblePosts()` in `src/shared/blog/get-posts.ts`, which hides drafts (`published: false`) in production and shows them in `pnpm dev`.

The blog index is `src/pages/blog/[...page].astro`: `/blog`, then `/blog/2`, `/blog/3` and on, 12 Posts per page, newest first (`/blog/1` is never built). Page 1 opens with the Featured band: the newest three visible Posts with `featured: true`. Featured Posts stay out of the paginated list on every page, and older flagged Posts join the list as normal Posts. With no visible Posts, `/blog` shows an empty state. `PostCard` is the one Post card (index, Tag pages, and later Author and search pages). `FeaturedCard` and `FeaturedBand` render the Featured band. A "Blog" link sits in `SiteHeader` and `SiteFooter`; Event headers do not have it.

Tag pages are `src/pages/blog/tags/[tag].astro`: one page per normalized Tag (`/blog/tags/<tag>`) on a visible Post, built from `tagIndex()` in `src/shared/blog/posts.ts`. Tags that differ only in case are one Tag. The page is unpaginated, newest first, lists Featured Posts as normal cards, and has no Featured band and no search box. A Tag used only by drafts has no page in production.

Author pages are `src/pages/blog/authors/[id].astro`, at `/blog/authors/<id>`. There is one page for each Person with the `author` role, with or without Posts. `AuthorHeader` shows the picture, name, pronouns, title and company, location, website, social links and bio, and hides each field that is not set. Below it, every visible Post that lists the Person in `authors` shows as a `PostCard`, newest first, with no pagination, Featured band or search box. An Author with no visible Posts sees an empty state. Author names on `PostCard` and in the Post byline link to these pages.

A Post page starts with a reading progress bar (`src/components/blog/ProgressBar.astro`). It uses a CSS scroll timeline (`animation-timeline: scroll()`) inside `@supports`, with no JavaScript. It scrolls away with the header, then pins to the top. Browsers without scroll timelines and readers with `prefers-reduced-motion: reduce` see no bar.

Each Post page has a share bar (`ShareBar`): a sticky rail beside the Post on desktop, a fixed bottom bar on phones. Bluesky, LinkedIn and X are plain links built at build time by the helpers in `src/shared/blog/format.ts`. Copy link and Web Share render hidden, and one script in the component reveals each where the browser supports it. Hover colors use `motion-safe:` transitions, so reduced motion changes color instantly.

**Search** is `/blog/search?q=…&tag=…` (`src/pages/blog/search.astro`), the one on-demand route (`prerender = false`, ADR-0016). `SearchForm` (a plain GET form in the overcast-gray band, no JavaScript needed) sits on every `/blog` index page and is prefilled on the results page. The pure logic is in `src/shared/blog/search.ts` with Vitest tests: `parseSearchInput` (no `q` and no `tag` redirects to `/blog`; a `q` over 100 characters or an unknown normalized `tag` returns 400) and `searchPosts` (every whitespace-separated term must be a case-insensitive substring of the title, an Author name or a Tag; `tag` is an exact match; newest first). Results use `PostCard` at thumbnail size. The canonical URL is `/blog`, there is no `noindex`, and the route is not in the sitemap (filtered in `astro.config.mjs`).

Two Netlify rules protect it. Only this route sends `Netlify-CDN-Cache-Control` (public, durable, one hour) and `Netlify-Vary: query=q|tag`, so the edge caches per `q` and `tag`; each deploy clears the cache. `netlify.toml` has a per-IP `rate_limit` rule on `/blog/search` that rewrites to the adapter's SSR function. `netlify serve` cannot prove rate limits or caching. Check both on a deploy preview: a 429 after the limit, and a `Cache-Status` hit on a repeated search. Also turn on Netlify Pro usage alerts.

The RSS feed is `src/pages/blog/rss.xml.ts` (`@astrojs/rss`), served at `/blog/rss.xml`. It lists every visible Post newest first, with title, description, link and date only (no body, no author). Blog pages link it for autodiscovery by putting `<RssLink slot="head" />` in their `Layout`.

Two more dynamic routes generate pages from data. `src/pages/2026/talks/[slug].astro` makes one page per Talk with a `slug`. `src/pages/[year]/sponsors/[slug].astro` makes one page per Sponsor with a `description`, for each Event that the Sponsor sponsored. See Astro's [routing guide](https://docs.astro.build/en/guides/routing/) for how `[param]` and `[...rest]` routes and `getStaticPaths` work.

**On-demand routes** render on every request instead of at build time. The site stays `output: 'static'`, so every page is prerendered unless its file opts out with `export const prerender = false`. The `@astrojs/netlify` adapter deploys each such route as a Netlify Function. Use one only for a route that needs request data, such as a query string. See [ADR-0016](docs/adr/0016-on-demand-routes-via-netlify-adapter.md). To run one locally, use `pnpm serve` (it builds, then serves `dist/` and the function on port 4321). `pnpm dev` also renders them, but without the production build. `pnpm preview` does not work with the adapter. The adapter also sends every `astro:assets` image through the Netlify Image CDN, so built pages link to `/.netlify/images?url=…` instead of `/_astro/…`.

**URLs never end in a slash.** `/2026/attend` works. `/2026/attend/` does not. Write every internal link without a trailing slash. The root `/` is the only exception. An e2e test scans every built page and fails on a slashed internal link. `Layout` builds canonical URLs from `routePath()` in `src/shared/route-path.ts`. If a page needs its own path, call `routePath()` instead of reading `Astro.url.pathname`.

## Layouts: which one to use

| Layout           | Use it for                                                                           | What it adds                                                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `Layout`         | Site-wide pages that don't belong to an Event: homepage, legal pages, 404            | The whole document: `<head>` (title, description, canonical, Open Graph), site header and footer, global CSS                  |
| `EventLayout`    | Every page that belongs to an Event                                                  | Wraps `Layout`, adds the Event nav bar, and defaults the description and share image from the Event's config. Requires `year` |
| `MarkdownLayout` | Non-Event content pages. **Don't import it yourself.** The `[...slug]` route uses it | Wraps `Layout` and `SimplePage`, styles the Markdown, and appends Past Sponsors and Testimonials (toggled by frontmatter)     |
| `SimplePage`     | Any page that's mostly a column of text under a title bar                            | Not a full page: the grey title bar and a narrow (50%) or wide (70%) content column. Nest it inside `Layout` or `EventLayout` |

Rules of thumb:

- Start from the page's owner. If it belongs to an Event, use `EventLayout`. If not, use `Layout`.
- Then decide the body. For a text-heavy page, nest `SimplePage` inside the layout. See `src/pages/2026/talks/[slug].astro` or `src/pages/[year]/sponsors/[slug].astro` for the pattern.
- `EventLayout` has a `hero` slot that renders above the Event nav (the 2026 landing page puts its video there). `SimplePage` has an `after-body` slot that renders outside the text column, which is where sponsor grids and testimonials go.
- **Pages own their sponsors section.** Only `MarkdownLayout` renders sponsors for you. On a hand-written page, place `SponsorsGrid` yourself and pass `year` (and `tiered`) or `exclude` as needed.

Wrap Markdown-derived HTML (an abstract, a description) in `MarkdownContent` to get prose styling for headings, lists and links.

## Content and data

### Content pages (`src/content/markdown/`)

The `markdown` collection schema in `src/content.config.ts` checks each file's frontmatter:

| Field              | Default    | Notes                                                              |
| :----------------- | :--------- | :----------------------------------------------------------------- |
| `title`            | (required) | Title bar text. The route also builds the page's `<title>` from it |
| `description`      |            | Meta and Open Graph description                                    |
| `width`            | `narrow`   | `narrow` or `wide` content column                                  |
| `ogImage`          |            | Share image path under `public/`                                   |
| `showSponsors`     | `true`     | Append the sponsors section                                        |
| `showTestimonials` | `true`     | Append testimonials                                                |
| `published`        | `true`     | `false` leaves the page out of the build                           |

Reference images in `src/assets/` by alias: `![alt](@assets/images/example.jpg)`.

**Use `.md` unless you need a component.** Plain Markdown plus inline HTML covers most pages. Rename to `.mdx` only when the page imports and renders an Astro component (such as `CtaButton` or `Callout`). MDX is stricter:

- Void tags must self-close: `<br />`, not `<br>`.
- Literal `{` and `}` in text must be escaped as `\{` and `\}`.
- HTML comments aren't allowed. Use `{/* ... */}`.

See [ADR-0012](docs/adr/0012-mdx-content-pages.md) and Astro's [MDX guide](https://docs.astro.build/en/guides/integrations-guide/mdx/).

The 2027 CFP embeds `TopicGrid` from `@components/TopicGrid.astro`. Edit its
`topicGroups` array in `src/content/markdown/2027/cfp.mdx` to change category
titles or topics. The component renders green topic pills in two columns when
the content column has enough room, and one column on smaller screens. An odd
final category spans both columns. Keep labels concise; each topic gets its own
row. The CFP uses four topics per category to keep the grid balanced.

### Blog Posts (`src/content/blog/`)

A Post is a folder with an `index.md` or `index.mdx` and its images beside it: `src/content/blog/<slug>/index.mdx`. The `blog` Collection reads `src/content/blog/**/index.{md,mdx}` and the entry id is the folder name. Use lowercase kebab-case folder names. Frontmatter:

| Field         | Type                | Notes                                                                        |
| :------------ | :------------------ | :--------------------------------------------------------------------------- |
| `title`       | string              | Required.                                                                    |
| `description` | string              | Required. Used for the meta description.                                     |
| `pubDate`     | date                | Required, e.g. `2026-03-10`.                                                 |
| `updatedDate` | date                | Optional. Shows "Updated" on the Post and sets `article:modified_time`.      |
| `authors`     | list of Person ids  | Required, at least one, no duplicates. Byline order; the first is the lead.  |
| `tags`        | list of strings     | Required (can be empty). Normalized to a lowercase slug.                     |
| `featured`    | boolean             | Default `false`.                                                             |
| `image`       | relative image path | Optional hero image, e.g. `./hero.jpg`. Optimized.                           |
| `ogImage`     | relative image path | Optional share image. Served as a 1200-wide JPEG. Default: site share image. |
| `published`   | boolean             | Default `true`. `false` is a draft: visible only in `pnpm dev`.              |

The build fails on invalid frontmatter: a missing `title`, an empty `authors`, an unknown Person id or a duplicate Author. The reading estimate ("N min read") is computed from the body. Code blocks use the Night Owl theme inside a Post. Other Markdown pages keep their code theme (`astro.config.mjs` keeps `github-dark` as the default and exposes Night Owl as a CSS variable that `PostBody` reads).

**Test fixtures.** Test-only fixture Posts (`src/content/blog-fixtures/`), fixture Authors (`src/shared/data/fixtures/people.json`) and a fixture Event override (`src/shared/data/fixtures/organizer-overrides.json`) load only when the environment variable `CJS_TEST_FIXTURES=1` is set. `playwright.config.ts` sets it for its build, so e2e tests see them. A normal build never includes them. To look at them yourself, run `CJS_TEST_FIXTURES=1 pnpm dev`. Add a fixture Post as a folder in `src/content/blog-fixtures/` with the same frontmatter. The loader also generates 12 plain filler Posts (`fillerPosts()` in `src/shared/test-fixtures.ts`, added in the `blog` loader in `src/content.config.ts`) so the index has a second page; the e2e helpers read the same generator. The e2e helpers read the fixtures' frontmatter (`e2e/blog-helpers.ts`), so a new fixture Post is covered by the data-driven Post specs.

### Data (`src/shared/data/`)

```text
src/shared/data/
  events/2026.config.ts   Event config: name, dates, venue, logo, nav, share defaults
  events.ts               Helpers: getEventConfig, getOrganizers, getTickets, getActivities, getActivity
  2026/                   The 2026 Event Dataset
    talks.json            Talks, each referring to its Speaker by Person id
    organizers.json       Organizers, each a Person id (plus optional overrides)
    tickets.json
    activities.json       Schedule items that aren't Talks (parties, hackathon, meals)
  people.json             The Person registry: every Speaker, Organizer and Author, once
  sponsors.json           Every Sponsor, across all Events
  testimonials.json
  types.ts                Shared TypeScript types
```

You read data two ways:

- **Talks, People and Sponsors are content collections** (`talks2026`, `people`, `sponsors`), so read them with `getCollection("talks2026")` / `getEntry(...)` from `astro:content`. Their Zod schemas in `src/content.config.ts` are the single source of truth. TypeScript infers the types in `types.ts` (`Talk`, `Person`, `Sponsor`) from these schemas, so change the schema, not the type. Astro sorts collection entries by id, so each loader stamps an `order` field with the entry's position in the JSON file. Sort by `order` when a listing should follow file order.
- **Organizers, Tickets and Activities** come from the helpers in `events.ts`, keyed by year: `getTickets("2026")`. The helpers **throw on an unknown year or Activity id**, so a typo fails the build instead of rendering an empty section.

**The Person registry.** Every Person the site credits lives once in `src/shared/data/people.json` (ADR-0017). A record has the `Person` fields plus `id` (a hand-written kebab-case of the name, such as `carter-rabasa`), an optional plain-text `bio` and `roles` (`speaker`, `organizer`, `author`). The build fails on a duplicate `id`. Talks and organizer entries refer to a Person by id: `{ "id": "carter-rabasa" }`. An entry can add `overrides` (`title`, `company`, `location`, `image`) for details true only at that Event: `{ "id": "carter-rabasa", "overrides": { "title": "Past Title" } }`. An override field replaces the registry value and every other field comes from the registry. The `talks2026` collection and `getOrganizers` resolve a reference and its overrides into a full `Person`, so components still take a `Person` or a `Talk` with `speaker` filled in. The `people` collection holds the raw registry records. Frozen Snapshots (2024, 2025) keep their inline people (ADR-0008). Person images are paths under `src/assets/` (for example `/events/2026/images/jane-doe.jpg` means `src/assets/events/2026/images/jane-doe.jpg`), and the build fails if the file is missing.

For the reasoning behind this split, see [ADR-0013](docs/adr/0013-event-pages-read-shared-datasets.md).

## Styling

Styling is Tailwind-first: use utility classes in markup, and use a `<style>` block only when Tailwind can't express the rule ([ADR-0003](docs/adr/0003-tailwind-first-styling.md)).

Design tokens live in the `@theme` block of `src/styles/global.css`:

- **Colors:** `sound-navy`, `cascade-blue`, `emerald-city-green`, `madrona-yellow`, `seafoam-cream`, `ink`, `cedar-cream`, `overcast-gray`, `mint`, used as `bg-sound-navy`, `text-madrona-yellow`, and so on.
- **Fonts:** `font-sans`, `font-display`, `font-serif` (served by Adobe Typekit).
- **Extra font sizes:** named sizes like `text-21`, `text-40` for values outside Tailwind's scale.

Use a token before an arbitrary value. If you need a new color or size, add a token instead of one-off values like `text-[23px]`. This project configures Tailwind v4 in CSS, not in a `tailwind.config.js` file. See the [theme docs](https://tailwindcss.com/docs/theme).

Font Awesome icons are available site-wide (`<i class="fa-solid fa-...">`).

## Recipes

Checklists for the common changes. Run `pnpm dev` and open the page in a browser, then `pnpm check` and `pnpm lint`, before you push.

### Add or edit a content page

1. Create `src/content/markdown/<name>.md` for a site-wide page, or `src/content/markdown/<year>/<name>.md` for an Event page.
2. Add frontmatter: at least `title`, and usually `description`. See the [field table](#content-pages-srccontentmarkdown).
3. Only if it needs a component: use `.mdx` and import the component with an alias.
4. Link to it without a trailing slash.

### Add a Talk and Speaker

1. If the Speaker is new, add them to `src/shared/data/people.json`: `id` (kebab-case of the name, unique), `name`, `image`, `roles` (include `speaker`), and optional `title`, `company`, `location`, `url`, `pronouns`, `social`, `bio`. An existing Person needs no new record.
2. Add an object to `src/shared/data/<year>/talks.json`, at the position where the Talk should appear. Required fields: `id`, `slug` (or `null` for no Talk page), `title`, `type` (`keynote`, `main`, `lightning`, `workshop`) and `speaker`, which is `{ "id": "<person id>" }`. Add `"overrides": { ... }` to the speaker for details true only at this Event. Optional fields: `abstract` (Markdown), `tags`, `yt`.
3. Put the speaker photo in `src/assets/events/<year>/images/` and reference it in the Person's `image`.
4. Optional: add a share image at `public/images/<year>/share/speaker-<name-slug>.png`. The Talk page uses it when the file exists.
5. For a Workshop with a registration page, set `registrationUrl` to a site-relative path and add the page under `src/content/markdown/<year>/workshops/`.
6. Place it on the schedule. Add a `<TalkItem talk="<id>" />` in `src/pages/<year>/schedule.astro`. Workshops use `ShowItem` instead, so copy an existing Workshop entry. The schedule shows only the Talks you place on it.

### Add a Post

1. Create `src/content/blog/<slug>/index.md` (or `index.mdx`). The folder name is the URL: `/blog/post/<slug>`.
2. Add frontmatter: `title`, `description`, `pubDate`, `authors` (Person ids) and `tags`. See the [field table](#blog-posts-srccontentblog).
3. Put images in the same folder and reference them relatively: `image: ./hero.jpg`, or `![alt](./diagram.png)` in the body.
4. In an `.mdx` Post, import each component you use with an alias, right after the frontmatter. The page passes no `components` mapping:

   ```mdx
   import Callout from "@components/Callout.astro";
   import VideoEmbed from "@components/VideoEmbed.astro";
   import CtaButton from "@components/CtaButton.astro";
   ```

   ADR-0012's MDX rules apply: self-close void tags, escape `{` and `}`, and use `{/* */}` for comments.

5. To keep a Post out of production while you write it, set `published: false`. It still shows in `pnpm dev`.

### Add an Author

1. Add a Person to `src/shared/data/people.json` (or add `author` to an existing Person's `roles`): `id` (kebab-case of the name, unique), `name`, `image`, `roles` including `author`, and optional `title`, `company`, `location`, `url`, `pronouns`, `social` and a plain-text `bio`.
2. Put the photo in `src/assets/events/<year>/images/` and set `image` to the path under `src/assets/`.
3. Use the id in a Post's `authors` list.

### Add a Sponsor

1. If they're new, add an object to `src/shared/data/sponsors.json`: `id`, `name`, `logo` (filename), optional `tier`, `url`, `description` (Markdown), `video`. Existing sponsors only need the year added to `events`.
2. Put the logo in `src/assets/images/sponsors/`.
3. Set `events` to every Event Key they sponsored, oldest first (e.g. `["2025", "2026"]`).
4. A `description` gives them a detail page at `/<year>/sponsors/<id>` for each year in `events` that has Event pages.

### Add an Organizer, Ticket or Activity

1. Edit the matching file in `src/shared/data/<year>/` (`organizers.json`, `tickets.json`, `activities.json`). The shapes are in `src/shared/data/types.ts`.
2. For an Organizer, add the Person to `src/shared/data/people.json` if they are new (`roles` includes `organizer`), then add `{ "id": "<person id>" }` to `organizers.json`. Add `overrides` for details true only at this Event. Organizer photos go in `src/assets/events/<year>/images/`.
3. A new Activity also needs placing on the schedule: reference it by `id` from `src/pages/<year>/schedule.astro` with `getActivity(year, id)`.

### Add a component

1. Create `src/components/<Name>.astro` (or a subfolder for a family, like `schedule/`).
2. Type its props with an `interface Props`, and use the shared types from `@shared/data/types` where they fit.
3. Style with Tailwind utilities and tokens.
4. If content pages should use it, import it from an `.mdx` page.

### Launching a new Event

You launch a new Event once a year. The launch changes several files. The steps below use 2027 as the example.

**Phase 1: Config and data**

1. Create `src/shared/data/events/2027.config.ts`. Model it on `2026.config.ts` (name, dates, venue, logo, nav, share defaults).
   `events.ts` globs these configs, so the new file alone enables the `src/content/markdown/2027/` and `/2027/sponsors/*` pages.
2. Add `"2027"` to the `events` enum in `sponsorSchema` in `src/content.config.ts`.
   `EventYear` derives from this enum. Nothing type-checks with `"2027"` until you add it.
3. Create the directory `src/shared/data/2027/`.
4. Add `talks.json`, `organizers.json`, `tickets.json` and `activities.json` to that directory. Talks and organizers refer to People by id, so add any new Person to `people.json`.
5. Register a `talks2027` collection in `src/content.config.ts`, next to `talks2026`.
6. Add `"2027"` to the `events` array of each 2027 Sponsor in `src/shared/data/sponsors.json`.

**Phase 2: Pages and assets**

7. If you want to use the previous year as a starting point, copy the 2026 pages from `src/pages/2026/` into `src/pages/2027/`. Otherwise build out the pages you want.
   Each Event has its own hand-written landing page, schedule and Talk pages.
8. Change the year and the collection name in the new pages.
9. Put the content pages in `src/content/markdown/2027/`.
10. Put the images in `src/assets/events/2027/images/`.
11. Put the share images in `public/images/2027/share/`.

**Phase 3: Launch day**

Do these steps only after the 2027 pages are ready.

12. Set `FEATURED_EVENT` to `"2027"` in `src/shared/site-defaults.ts`.
    The homepage, header, footer and site-wide pages read that value.
13. Update `DEFAULT_DESCRIPTION` in `src/shared/site-defaults.ts`.
14. Run the whole e2e suite.
    A Featured Event change needs no test edit.

## Testing and CI

Two seams: Vitest unit tests for pure functions, Playwright for everything that renders.

### Unit tests

Unit tests live beside the code they test, as `src/**/*.test.ts`. Put pure functions over plain data here: helpers that take values and return values, with no Astro runtime, no disk reads and no DOM. Pass plain objects, not Astro entries. Vitest is configured in `vitest.config.ts` through Astro's `getViteConfig`, so the `@shared`, `@components`, `@layouts` and `@assets` aliases resolve as they do in the site. Playwright only reads `e2e/` and Vitest only reads `src/`, so neither picks up the other's files. See `src/shared/route-path.test.ts` for an example.

```sh
pnpm test:unit                                  # run once
pnpm exec vitest src/shared/route-path.test.ts  # one file, watch mode
```

### End-to-end tests

End-to-end tests live in `e2e/` and use [Playwright](https://playwright.dev/docs/intro). They run against `netlify serve` (`pnpm serve`), which builds the site and serves it, including on-demand routes, the way Netlify does. `astro preview` does not work with the Netlify adapter.

Tests check behavior, not content. A change to copy, data, design inside a section or the Featured Event does not break a test. Tests find pages by type, never by slug or title. They find elements by class name, id or role, never by text. A component that a test needs gets a class with its component name in kebab-case. No spec names a year, except the Frozen Snapshot specs (2024, 2025).

```sh
pnpm exec playwright install chromium   # once, to download the browser
pnpm test                               # whole suite
pnpm test e2e/talks.spec.ts             # one file
pnpm test --ui                          # Playwright's interactive runner
```

The blog specs are four files: `blog-index.spec.ts` (index, pagination, Featured band, chrome links, sitemap, RSS), `blog-post.spec.ts` (Post page, meta, share bar, progress bar), `blog-archive.spec.ts` (Tag and Author pages) and `blog-search.spec.ts`. They find fixture Posts by property through `e2e/blog-helpers.ts`, never by slug, title, text or year.

Many tests generate their cases from the data files. For example, one test checks that each Talk with a slug has a page. Another test checks that each Sponsor with a description has a detail page. In most cases, new data needs no new tests. Add or update a spec when you add a page, a route or a behavior.

If a server is already running on port 4321, Playwright reuses it instead of building. Stop `pnpm dev` or `pnpm serve` before `pnpm test` if you want to test the real build.

Run `pnpm test` from a normal clone, not a Git worktree. In a worktree, the Netlify CLI finds the main checkout's `.git` directory and builds and serves that checkout instead.

The suite builds with `CJS_TEST_FIXTURES=1` (set in `playwright.config.ts`), so the test-only fixtures (Posts, Authors, an Event override) exist. See [Blog Posts](#blog-posts-srccontentblog).

CI (`.github/workflows/tests.yml`) runs on every PR and push to `main`:

1. **checks:** `pnpm lint`, `prettier --check .`, `pnpm check`
2. **build:** `pnpm build`
3. **unit:** `pnpm test:unit`. A failing unit test fails the workflow.
4. **playwright:** the e2e suite, after both pass. On failure, download the `playwright-report` artifact from the run to see what failed.

## Working with an agent

You can work on this repo by hand. If you use a coding agent such as Claude Code or Codex, it relies on the files below.

### What the agent reads

- **[`CLAUDE.md`](CLAUDE.md)**: Claude Code loads it at the start of every session, and `AGENTS.md` symlinks to it for other tools. It's the agent's rulebook and source of truth: stack, package manager, import rules, what's out of scope, and what it must never touch. This README explains the same project to people, so keep the two consistent. If you change a rule, change `CLAUDE.md`.
- **[`GLOSSARY.md`](GLOSSARY.md)** and **[`docs/adr/`](docs/adr/)** give the agent the domain vocabulary and past decisions. Skills read them before exploring code, and flag it when a change would contradict an ADR.
- **[`docs/agents/`](docs/agents/)** tells skills where issues live and which labels mean what.

### Repo hooks (Claude Code)

`.claude/settings.json` wires two hooks:

- **Dependency install on session start.** In cloud sessions (Claude Code on the web), it runs `pnpm install` so `node_modules` matches the lockfile. It does nothing locally.
- **Git guardrails.** It blocks the agent from running destructive git commands: `git push`, `reset --hard`, `clean -f`, `branch -D`, force pushes. You decide what leaves your machine.

### Skills

The skills come from [Matt Pocock's skills collection](https://github.com/mattpocock/skills), installed in `.agents/skills/` and pinned in `skills-lock.json`. Skim that repo's README to learn the philosophy. In Claude Code, invoke a skill with `/<name>`.

The repo installs more skills than we use. We use these. A _ticket_ is an issue that `/to-tickets` split from a spec.

| Skill                           | Use it when                                                                                                                  | Example                                                         |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `wayfinder`                     | The work is too big or unclear for one session. Chart it as a map issue of decision tickets and resolve them one at a time   | `/wayfinder migrate past years' content into Astro`             |
| `grill-with-docs`               | You have an idea or plan and want it stress-tested before building. It also updates `GLOSSARY.md` and ADRs as decisions land | `/grill-with-docs I want speaker pages to show past talks`      |
| `to-spec`                       | You and the agent agreed what to build. Turn that into an issue                                                              | `/to-spec`                                                      |
| `to-tickets`                    | A spec is too big for one PR. Split it into tickets in blocking order                                                        | `/to-tickets #42`                                               |
| `triage`                        | Issues need evaluation, labels and agent-ready briefs                                                                        | `/triage`                                                       |
| `implement-spec`                | `/to-tickets` split a spec into tickets. Build every ticket on one integration branch                                        | `/implement-spec #42`                                           |
| `implement`                     | Build an issue or spec end to end                                                                                            | `/implement #57`                                                |
| `tdd`                           | Build or fix something test-first (red, green, refactor)                                                                     | `/tdd the schedule should hide unpublished activities`          |
| `diagnosing-bugs`               | Something is broken, flaky or slow and the cause isn't obvious                                                               | `/diagnosing-bugs sponsor logos 404 on /2026/sponsors/temporal` |
| `code-review`                   | Review a branch against the repo's standards and its originating issue                                                       | `/code-review since main`                                       |
| `improve-codebase-architecture` | Periodically, to find modules worth deepening or simplifying                                                                 | `/improve-codebase-architecture`                                |
| `handoff`                       | A session is long. Give its context to a new agent                                                                           | `/handoff`                                                      |

### A typical flow

1. **Shape it.** `/grill-with-docs` on the idea until the open questions are gone. If it's too big for one session, start with `/wayfinder` and resolve its decision tickets first.
2. **Record it.** `/to-spec` creates the issue. If the issue is large, `/to-tickets` splits it.
3. **Build.** Run `/implement` (or `/tdd`) on an agent-ready issue, or `/implement-spec` to build a whole split spec on one branch. Do the human-ready issues yourself.
4. **Review.** `/code-review` before opening the PR, then human review on the PR.
5. If the session runs long, `/handoff` and continue in a fresh one.

Agents do well here when the issue is specific. For example, "Add the 2027 tickets from this table" works. "Make the tickets section better" does not.

## Gotchas

- **No trailing slashes** in URLs or links. See [Pages and routing](#pages-and-routing).
- **`.md` vs `.mdx`:** use `.mdx` only for pages that render components, and follow its stricter syntax. See [Content pages](#content-pages-srccontentmarkdown).
- **Alias imports** across `src/` directories, never `../components/...`. ESLint enforces it. See [Imports](#imports).
