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

A pre-commit hook (Husky + lint-staged) runs these steps in order:

1. ESLint `--fix` and Prettier on staged files
2. `astro check`
3. The unit tests (`pnpm test:unit`)
4. The Playwright suite (`pnpm test`)

CI runs the tests too.

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
- **Featured Event**: the one Event the site-wide pages (header, footer, legal and general content pages) promote. Its landing page is the homepage, `/`. `FEATURED_EVENT` in `src/shared/site-defaults.ts` sets it, and you change it when a new Event launches. An Event's own pages always refer to _that_ Event, never to the Featured Event.
- **Event Dataset**: an Event's Talks (each with its Speaker), Organizers, Tickets and Activities, stored under `src/shared/data/<year>/`. Sponsors and Testimonials span Events, so they aren't part of it.

## Pages and routing

There are two kinds of page.

**Hand-written pages** are `.astro` files in `src/pages/`. The file path is the URL: `src/pages/2026/schedule.astro` serves `/2026/schedule`. Use these for anything with custom structure: the Event landing page, the schedule, Talk pages, and the legal pages.

The Featured Event's pages all live at the site root, with no year in the URL. Its landing page is `src/pages/index.astro` (`/`), and the rest sit beside it: `src/pages/tickets.astro`, `schedule.astro`, `sponsorships.astro` and `talks/[slug].astro`, plus the root-level markdown pages `sponsor.md` and `buy-tickets.mdx` (with `featuredEventNav: true`). Links to the brochure request go through `sponsorPagePath()` in `src/shared/data/events.ts`, so past Events keep `/<year>/sponsor`. `public/_redirects` sends `/<year>` and the old `/2027/…` URLs to their root pages with a 301. A past Event's landing page lives at `src/pages/<year>/index.astro` and serves `/<year>`.

**Content pages** are Markdown files in `src/content/markdown/`, served by two catch-all routes:

| File                                               | URL                         | Route                              |
| :------------------------------------------------- | :-------------------------- | :--------------------------------- |
| `src/content/markdown/code-of-conduct.md`          | `/code-of-conduct`          | `src/pages/[...slug].astro`        |
| `src/content/markdown/2026/attend.mdx`             | `/2026/attend`              | `src/pages/[year]/[...slug].astro` |
| `src/content/markdown/2026/next-steps/speakers.md` | `/2026/next-steps/speakers` | `src/pages/[year]/[...slug].astro` |

A file under a year folder only gets a page if that Event has a config in `src/shared/data/events/` (see [Launching a new Event](#launching-a-new-event)). Set `published: false` in frontmatter to keep a page out of the build.

**Blog Posts** live in `src/content/blog/`. Each Post is a folder, and the folder name becomes its URL: `/blog/post/<folder-name>`. A draft (`published: false`) shows in `pnpm dev` but not on the live site.

The blog has these pages:

| URL                      | File                                |
| :----------------------- | :---------------------------------- |
| `/blog`, `/blog/2`, …    | `src/pages/blog/[...page].astro`    |
| `/blog/post/<slug>`      | `src/pages/blog/post/[slug].astro`  |
| `/blog/tags/<tag>`       | `src/pages/blog/tags/[tag].astro`   |
| `/blog/authors/<id>`     | `src/pages/blog/authors/[id].astro` |
| `/blog/search?q=…&tag=…` | `src/pages/blog/search.astro`       |
| `/blog/rss.xml`          | `src/pages/blog/rss.xml.ts`         |

The blog components live in `src/components/blog/`.

Search is the only page that runs on each request (see on-demand routes below). Netlify caches search results and limits how often one visitor can search. You can't test either one locally. Check them on a deploy preview.

Two more dynamic routes generate pages from data. `src/pages/2026/talks/[slug].astro` makes one page per Talk with a `slug`. `src/pages/[year]/sponsors/[slug].astro` makes one page per Sponsor with a `description`, for each Event that the Sponsor sponsored. See Astro's [routing guide](https://docs.astro.build/en/guides/routing/) for how `[param]` and `[...rest]` routes and `getStaticPaths` work.

**On-demand routes.** Astro builds most pages ahead of time. A page that needs data from the request, like a search query, can run on each request instead. To do that, add `export const prerender = false` to the page file, and Netlify runs the page as a function. Only do this when the page needs it ([ADR-0016](docs/adr/0016-on-demand-routes-via-netlify-adapter.md)).

`pnpm dev` runs these pages too. To test them the way Netlify runs them, use `pnpm serve`. There is no `pnpm preview`, because Astro's preview does not work with Netlify. Built pages load images from `/.netlify/images`, which is Netlify's image service.

**URLs never end in a slash.** `/2026/attend` works. `/2026/attend/` does not. Write every internal link without a trailing slash. The root `/` is the only exception. The link crawl (`e2e/link-crawl.spec.ts`) fails on a slashed internal link. `Layout` builds canonical URLs from `routePath()` in `src/shared/route-path.ts`. If a page needs its own path, call `routePath()` instead of reading `Astro.url.pathname`.

### Which kind of page to create

> [!NOTE]
> For a blog Post, see [Blog Posts](#blog-posts-srccontentblog). This list is for pages.

Use the first option that fits:

1. **`.md`**: The page is text under a title bar. Markdown and inline HTML are enough. Example: `code-of-conduct.md`.
2. **`.mdx`**: The page is text, but it shows an Astro component such as `CtaButton`. Example: `2026/childcare.mdx`.
3. **`.astro` route**: The page has its own layout, has dynamic behavior, calls any APIs, shows data from `src/shared/data/`, or makes one page per item. Example: `src/pages/2026/schedule.astro`.

Put `.md` and `.mdx` files in `src/content/markdown/`, or in `src/content/markdown/<year>/` for an Event page. Put an `.astro` route in `src/pages/<year>/`.

Do not give a content page and an `.astro` route the same URL. Astro uses the `.astro` route and ignores the content page. It shows no error.

## Layouts: which one to use

| Layout           | Use it for                                                                           | What it adds                                                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `Layout`         | Site-wide pages that don't belong to an Event: legal pages, blog, 404                | The whole document: `<head>` (title, description, canonical, Open Graph), site header and footer, global CSS                  |
| `EventLayout`    | Every page that belongs to an Event                                                  | Wraps `Layout`, adds the Event nav bar, and defaults the description and share image from the Event's config. Requires `year` |
| `MarkdownLayout` | Non-Event content pages. **Don't import it yourself.** The `[...slug]` route uses it | Wraps `Layout` and `SimplePage`, styles the Markdown, and appends Past Sponsors and Testimonials (toggled by frontmatter)     |
| `SimplePage`     | Any page that's mostly a column of text under a title bar                            | Not a full page: the grey title bar and a narrow (50%) or wide (70%) content column. Nest it inside `Layout` or `EventLayout` |

Rules of thumb:

- Start from the page's owner. If it belongs to an Event, use `EventLayout`. If not, use `Layout`.
- Then decide the body. For a text-heavy page, nest `SimplePage` inside the layout. See `src/pages/2026/talks/[slug].astro` or `src/pages/[year]/sponsors/[slug].astro` for the pattern.
- `EventLayout` has a `hero` slot that renders above the Event nav (the 2026 landing page puts its video there). `SimplePage` has an `after-body` slot that renders outside the text column, which is where sponsor grids and testimonials go.
- The yellow alert banner at the top of the site header shows on every page by default. Pass `displayAlert={false}` to `Layout` or `EventLayout` to hide it (the Featured Event's landing page at `/` does, since the banner links there).
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
| `displayAlert`     | `true`     | `false` hides the yellow alert banner above the header             |
| `featuredEventNav` | `false`    | Root-level pages: `true` shows the Featured Event's nav, as on `/` |
| `published`        | `true`     | `false` leaves the page out of the build                           |

Reference images in `src/assets/` by alias: `![alt](@assets/images/example.jpg)`.

**Use `.md` unless you need a component.** Plain Markdown plus inline HTML covers most pages. Rename to `.mdx` only when the page imports and renders an Astro component (such as `CtaButton` or `Callout`). MDX is stricter:

- Void tags must self-close: `<br />`, not `<br>`.
- Literal `{` and `}` in text must be escaped as `\{` and `\}`.
- HTML comments aren't allowed. Use `{/* ... */}`.

See [ADR-0012](docs/adr/0012-mdx-content-pages.md) and Astro's [MDX guide](https://docs.astro.build/en/guides/integrations-guide/mdx/).

### Blog Posts (`src/content/blog/`)

A Post is a folder with one `index.md` or `index.mdx` file. Put the Post's images in the same folder. Write the folder name in lowercase, with dashes between words, for example `my-first-post`. The frontmatter has these fields:

| Field         | Type               | Notes                                                                |
| :------------ | :----------------- | :------------------------------------------------------------------- |
| `title`       | text               | Required.                                                            |
| `description` | text               | Required. The page uses it as its meta description.                  |
| `pubDate`     | date               | Required, for example `2026-03-10`.                                  |
| `updatedDate` | date               | Optional. The Post then shows "Updated" and this date.               |
| `authors`     | list of Person ids | Required. At least one, each id one time. The first id is the lead.  |
| `tags`        | list of text       | Required. The list can be empty.                                     |
| `featured`    | true or false      | Optional. Default `false`.                                           |
| `image`       | image path         | Optional. The large image at the top of the Post, e.g. `./hero.jpg`. |
| `imageAlt`    | text               | Optional. Alt text for `image`. Without it, the image is decorative. |
| `ogImage`     | image path         | Optional. The image for social media shares.                         |
| `published`   | true or false      | Optional. Default `true`. A `false` Post shows only in `pnpm dev`.   |

The build stops if a field is wrong, for example a missing `title` or an unknown Person id.

### Data (`src/shared/data/`)

```text
src/shared/data/
  events/2026.config.ts   Event config: name, dates, venue, logo (+ optional height class), nav, share defaults
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

For the reasoning behind this split, see [ADR-0013](docs/adr/0013-event-pages-read-shared-datasets.md).

### People

`src/shared/data/people.json` lists every Speaker, Organizer and Author one time ([ADR-0017](docs/adr/0017-people-live-in-one-registry.md)). Each Person has these fields:

- `id`: required. The name in lowercase, with dashes between words, for example `carter-rabasa`. Each id must be different.
- `name`: required.
- `image`: required. The path of a photo in `src/assets/people/`, for example `/people/jane-doe.jpg`. Use a `.jpg` or `.png` file. The build stops if the file is missing.
- `roles`: required. One or more of `speaker`, `organizer` and `author`.
- `title`, `company`, `location`, `url`, `pronouns`, `social` and `bio`: optional.

A Talk or an Organizer entry points to a Person by id: `{ "id": "carter-rabasa" }`. If a detail was different at one Event, add `overrides` for that detail: `{ "id": "carter-rabasa", "overrides": { "title": "Past Title" } }`. You can override `title`, `company`, `location` and `image`. All other fields come from `people.json`.

Past Events (2024 and 2025) do not use `people.json`. Their pages keep their own copy of each Person ([ADR-0008](docs/adr/0008-past-event-pages-are-frozen-snapshots.md)).

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

1. Check that the page is content and not an `.astro` route. See [Which kind of page to create](#which-kind-of-page-to-create).
2. Create `src/content/markdown/<name>.md` for a site-wide page, or `src/content/markdown/<year>/<name>.md` for an Event page.
3. Add frontmatter: at least `title`, and usually `description`. See the [field table](#content-pages-srccontentmarkdown).
4. Only if it needs a component: use `.mdx` and import the component with an alias.
5. Link to it without a trailing slash.

### Add a Talk and Speaker

1. If the Speaker is new, add them to `src/shared/data/people.json` with `speaker` in `roles`. See [People](#people) for the fields.
2. Add an object to `src/shared/data/<year>/talks.json`, at the position where the Talk should appear. Required fields: `id`, `slug` (or `null` for no Talk page), `title`, `type` (`keynote`, `main`, `lightning`, `workshop`) and `speaker`, which is `{ "id": "<person id>" }`. Optional fields: `abstract` (Markdown), `tags`, `yt`.
3. Put the Speaker's photo in `src/assets/people/`. Set the Person's `image` to `/people/<file>`.
4. Optional: add a share image at `public/images/<year>/share/speaker-<name-slug>.png`. The Talk page uses it when the file exists.
5. For a Workshop with a registration page, set `registrationUrl` to a site-relative path and add the page under `src/content/markdown/<year>/workshops/`.
6. Place it on the schedule. Add a `<TalkItem talk="<id>" />` in `src/pages/<year>/schedule.astro`. Workshops use `ShowItem` instead, so copy an existing Workshop entry. The schedule shows only the Talks you place on it.

### Add a Post

1. Create `src/content/blog/<slug>/index.md` (or `index.mdx`). The folder name is the URL: `/blog/post/<slug>`.
2. Add frontmatter: `title`, `description`, `pubDate`, `authors` (Person ids) and `tags`. See the [field table](#blog-posts-srccontentblog).
3. Put images in the same folder and reference them relatively: `image: ./hero.jpg`, or `![alt](./diagram.png)` in the body.
4. In an `.mdx` Post, import each component you use. Put the imports below the frontmatter, for example `import Callout from "@components/Callout.astro";`. Follow the MDX rules in [ADR-0012](docs/adr/0012-mdx-content-pages.md).
5. To keep a Post out of production while you write it, set `published: false`. It still shows in `pnpm dev`.

### Add an Author

1. Add the Person to `src/shared/data/people.json` with `author` in `roles`. See [People](#people) for the fields. If the Person is already there, add `author` to their `roles`.
2. Put the photo in `src/assets/people/`. Set `image` to `/people/<file>`.
3. Use the id in a Post's `authors` list.

### Add a Sponsor

1. If they're new, add an object to `src/shared/data/sponsors.json`: `id`, `name`, `logo` (filename), optional `tier`, `url`, `description` (Markdown), `video`. Existing sponsors only need the year added to `events`.
2. Put the logo in `src/assets/images/sponsors/`.
3. Set `events` to every Event Key they sponsored, oldest first (e.g. `["2025", "2026"]`).
4. A `description` gives them a detail page at `/<year>/sponsors/<id>` for each year in `events` that has Event pages.

### Add an Organizer, Ticket or Activity

1. Edit the matching file in `src/shared/data/<year>/` (`organizers.json`, `tickets.json`, `activities.json`). The shapes are in `src/shared/data/types.ts`.
2. For a new Organizer, add them to `src/shared/data/people.json` with `organizer` in `roles`. Then add `{ "id": "<person id>" }` to `organizers.json`. Put Organizer photos in `src/assets/people/`.
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
4. Add `talks.json`, `organizers.json`, `tickets.json` and `activities.json` to that directory. Add each new Speaker and Organizer to `people.json`.
5. Register a `talks2027` collection in `src/content.config.ts`, next to `talks2026`.
6. Add `"2027"` to the `events` array of each 2027 Sponsor in `src/shared/data/sponsors.json`.

**Phase 2: Pages and assets**

7. If you want to use the previous year as a starting point, copy the 2026 pages from `src/pages/2026/` into `src/pages/2027/`. Otherwise build out the pages you want.
   Each Event has its own hand-written landing page, schedule and Talk pages. Build the 2027 landing page as `src/pages/2027/index.astro` (served at `/2027`) until launch day.
8. Change the year and the collection name in the new pages.
9. Put the content pages in `src/content/markdown/2027/`.
10. Put the images in `src/assets/events/2027/images/`.
11. Put the share images in `public/images/2027/share/`.

**Phase 3: Launch day**

Do these steps only after the 2027 pages are ready.

12. Set `FEATURED_EVENT` to `"2027"` in `src/shared/site-defaults.ts`.
    The header, footer, Event nav logo and site-wide pages read that value.
13. Swap the landing pages: move the old Featured Event's `src/pages/index.astro` back to `src/pages/<old year>/index.astro`, and move `src/pages/2027/index.astro` to `src/pages/index.astro`. Change the Event's own nav anchors in its config (`/2027#pricing`) to root anchors (`/#pricing`), and the old Event's back to `/<old year>#…`.
14. In `public/_redirects`, replace the old year's `/<old year> / 301` line with `/2027 / 301`.
15. Update `DEFAULT_DESCRIPTION` in `src/shared/site-defaults.ts`.
16. Run the whole e2e suite.

## Testing and CI

The project has three kinds of test:

- **Unit tests** check small functions and single components. They run in Vitest.
- **Browser tests** check components that need real CSS or JavaScript. They run in Vitest, in a browser with no window.
- **End-to-end tests** check the built site. They run in Playwright.

### Unit tests

Put a unit test next to the file it tests, as `<name>.test.ts`. See `src/shared/route-path.test.ts` for an example. Give the function plain values and check the result. Do not read real Event data or files from disk.

If a test needs an image, use `/events/sample/images/test-photo.png` for a person, or `test-logo.svg` for a Sponsor logo. Do not use a real Event or Sponsor image.

Vitest keeps a cache of each component. If a component does not find an image or file that you added, delete `node_modules/.vitest-cache` and run the tests again.

**Component tests.** To test an `.astro` component, render it to HTML with Astro's Container API and check the HTML. Put the test next to the component, as `<Component>.test.ts`. The helpers in `src/shared/test-render.ts` do the rendering. See `src/components/components.test.ts` for examples.

If a component reads a content collection, give it an optional prop for that data. The test can then give its own data, for example the `sponsors` prop on `SponsorsGrid`.

```sh
pnpm test:unit                                  # run once
pnpm exec vitest src/shared/route-path.test.ts  # one file, watch mode
```

### Browser tests

Put a browser test next to the component, as `<Component>.browser.test.ts`. `pnpm test:unit` runs the browser tests and the unit tests. To run only the browser tests, use `pnpm exec vitest run --project browser`. Before the first run, install the browser with `pnpm exec playwright install chromium`.

To show a component in a browser test, use `mountAstro` from `@shared/test/mount-astro`. Import the CSS that the component needs. `src/components/blog/ShareBar.browser.test.ts` is a full example. It also shows how to set the screen size and reduced motion.

`mountAstro` cannot add slot content. For a component with slots, copy the approach in `src/components/schedule/Track.browser.test.ts`.

### End-to-end tests

End-to-end tests live in `e2e/` and use [Playwright](https://playwright.dev/docs/intro). They build the site and run it with `netlify serve`, the same way Netlify runs it. You do not need to build first.

Tests check behavior, not content. A change to copy, data, design inside a section or the Featured Event does not break a test. Tests find pages by type, never by slug or title. They find elements by class name, id or role, never by text. A component that a test needs gets a class with its component name in kebab-case. No spec names a year, except the Frozen Snapshot specs (2024, 2025).

```sh
pnpm exec playwright install chromium   # once, to download the browser
pnpm test                               # whole suite
pnpm test e2e/talks.spec.ts             # one file
pnpm test --ui                          # Playwright's interactive runner
```

The tests use the real site build. The repo has no test Posts or test Authors, so the blog tests pass with no Posts.

Tests do not skip, do not loop over data, and do not search Event data to choose a page. If a test needs an Event page, use the Featured Event (`FEATURED_EVENT` from `@shared/site-defaults`). Add or update a test when you add a page, a route or a behavior.

Each test run builds the site again and uses its own free port. A `pnpm dev` or `pnpm serve` that is running does not get in the way. Do not start two test runs at the same moment, because both use port 3999. Start the second run after the first one is up.

Run `pnpm test` from a normal clone, not a Git worktree. In a worktree, Netlify tests the main checkout instead of your changes.

CI (`.github/workflows/tests.yml`) runs on every PR and push to `main`:

1. **checks:** `pnpm lint`, `prettier --check .`, `pnpm check`
2. **build:** `pnpm build`
3. **unit:** `pnpm test:unit`
4. **playwright:** the end-to-end tests, after checks and build pass. If they fail, download the `playwright-report` artifact from the run to see what failed.

The unit and playwright jobs run in the official Playwright Docker image (`mcr.microsoft.com/playwright`), which has Chromium and its OS dependencies preinstalled. When you upgrade `@playwright/test`, change the image tag in `tests.yml` to the same version. If the versions differ, the tests fail with "Executable doesn't exist".

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
