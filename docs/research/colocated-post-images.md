# Can Post images live alongside each Post?

Research for [#132](https://github.com/bniedermeyer/cascadiajs-neo/issues/132), part of the [Blog wayfinder map (#131)](https://github.com/bniedermeyer/cascadiajs-neo/issues/131).

Answered for the installed versions: `astro` 7.3.5 and `@astrojs/mdx` 8.0.2 (`node_modules/*/package.json`).

## Answer

Yes. A glob-loaded `blog` collection can keep each Post as `src/content/blog/<slug>/index.{md,mdx}` with its images in the same folder. Schema `image()` fields, relative `![]()` images in `.md` and `.mdx` bodies, and ESM imports in MDX all resolve from that folder. The entry id comes out as `<slug>`. Nothing in the docs or source pushes us toward `src/assets/blog/<slug>/`. An `image()` field can produce an absolute OG URL with `new URL(img.src, Astro.site)`, the same pattern `Layout.astro` already uses.

Confirmed with a throwaway build (details under "Empirical check"). The test files were deleted and not committed.

## Findings

### 1. Entry id is `<slug>`, not `<slug>/index`

- With no `slug` frontmatter, the `glob()` loader's default `generateId` uses `getContentEntryIdAndSlug(...).slug`. That function runs each path segment through `github-slugger`, joins them with `/`, then strips a trailing `/index`: `.replace(/\/index$/, "")`.
  Source: `node_modules/astro/dist/content/loaders/glob.js` (`generateIdDefault`), `node_modules/astro/dist/content/utils.js` (`getContentEntryIdAndSlug`).
- So `blog/my-post/index.mdx` gets the id `my-post`. The docs describe the id as "automatically generated in a URL-friendly format based on the content filename" and say a `slug` frontmatter field overrides it.
  Source: https://docs.astro.build/en/guides/content-collections/#defining-custom-ids, https://docs.astro.build/en/reference/content-loader-reference/#generateid
- Caveat: github-slugger lowercases and kebab-cases each segment, so the folder name should already be the URL slug. A `slug:` frontmatter key overrides the id. Treat it as reserved in the Post schema, or forbid it.

### 2. Schema `image()` resolves paths relative to the entry file

- The docs say a frontmatter image path is "relative to the current folder", and the `image()` schema helper "will validate and import the image". The result is `ImageMetadata`, which can be passed to `<Image/>`, `<img>` or `getImage()`.
  Source: https://docs.astro.build/en/guides/images/#images-in-content-collections
- So `image: ./cover.jpg` in `src/content/blog/my-post/index.md` resolves to `src/content/blog/my-post/cover.jpg`. This works for `image` and `ogImage` alike, including as `image().optional()`.
- Limitation: `image().refine()` is unsupported. Source: https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema

### 3. Relative images in Markdown and MDX bodies

- `.md`: "Use standard Markdown `![alt](src)` syntax… Your local images stored in `src/`… will be processed and optimized." With `image.layout` set globally (this repo sets `layout: "constrained"`), they are also responsive.
  Source: https://docs.astro.build/en/guides/images/#images-in-markdown-files
- `.mdx`: `![]()` works with no import ("Local image stored in the same folder `![Houston in the wild](houston.png)`"), and `<Image />` / `<Picture />` work with an ESM import of the image.
  Source: https://docs.astro.build/en/guides/images/#images-in-mdx-files
- One gotcha: a raw HTML `<img src="./x.png">` in `.md` is **not** supported for local `src/` images. Only `![]()` is. Source: same `.md` section.

### 4. Is anything pushing toward `src/assets/blog/<slug>/`?

Nothing found. The docs say: "Images can be stored in any folder, including alongside your content". They recommend `src/` over `public/` only so that images get optimized.
Source: https://docs.astro.build/en/guides/images/#where-to-store-images

Things to get right when colocating (none of them blockers):

- **Glob pattern.** Use `pattern: "**/index.{md,mdx}"`, not `**/*.{md,mdx}`, so a stray `notes.md` in a Post folder doesn't become an entry. The glob loader matches only entry files, so images in the folder are ignored as entries. Source: https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
- **Shared images.** An image used by several Posts (an Author headshot, say) still belongs in `src/assets/`. Posts can reference it with a relative path or an alias. That's an argument for a shared folder, not against colocation.
- **Asset de-duplication.** Vite hashes by content, so two Posts holding byte-identical images emit one file. It keeps the first file's name: the test's `inline.png` came out as `body.*.webp`. Harmless.

### 5. Absolute OG URL from an `image()` field

- `ImageMetadata.src` is a root-relative URL such as `/_astro/cover.<hash>.jpg`, and Astro emits the original file at that path when `.src` is used. Resolving it against `Astro.site` gives an absolute URL. That's the pattern `src/layouts/Layout.astro` already uses (`new URL(ogImage, origin).href` with `origin = Astro.site ?? Astro.url.origin`). So the Post page can pass `post.data.ogImage.src` as the existing `ogImage` string prop.
- To control size or format (for example a 1200px-wide JPEG for social cards), call `getImage({ src: post.data.ogImage, width: 1200, format: "jpg" })` and resolve `.src` the same way. `getImage()` is server-only. Source: https://docs.astro.build/en/reference/modules/astro-assets/#getimage
- **`build.format: "file"`** does not affect this. Assets are always emitted under the root `/_astro/` directory, independent of the page output format, and the URL is root-relative.
- **`site`** varies per Netlify context (`URL` in production, `DEPLOY_PRIME_URL` on previews; see `astro.config.mjs`), so OG image URLs point at the deploy that serves them. That matches the current behavior for page OG images.
- In `astro dev`, `getImage()` returns an `/_image?href=…` endpoint URL rather than a `/_astro/` file. Fine for local use; only built output matters to crawlers.

## Empirical check (throwaway, not committed)

I added a `blog` collection with `glob({ base: "./src/content/blog", pattern: "**/index.{md,mdx}" })` and the schema `({ image }) => z.object({ title, image: image().optional(), ogImage: image().optional() })`. I added two Posts:

- `hello-md/index.md`, with `image: ./cover.jpg`, `ogImage: ./cover.jpg` and a body `![camper](./body.png)`
- `hello-mdx/index.mdx`, with `image: ./cover.jpg`, `import inline from "./inline.png"` + `<Image src={inline} …/>`, and a body `![…](./inline.png)`

I also added a test page at `src/pages/blogtest/[slug].astro`. `pnpm build` succeeded:

- Ids: `hello-md` and `hello-mdx`, giving `dist/blogtest/hello-md.html` and `hello-mdx.html`.
- Cover `<Image>`: `/_astro/cover.D2B9lRXM_1BGVxY.webp`.
- `.md` body image: optimized, with the constrained-layout `srcset`.
- MDX import and MDX `![]()`: both optimized `.webp`.
- `og:image` from `new URL(img.src, Astro.site)`: `https://cascadiajs.com/_astro/cover.D2B9lRXM.jpg`. The original file is present in `dist/_astro/`.
- `getImage({ width: 1200, format: "jpg" })` URL: `https://cascadiajs.com/_astro/cover.D2B9lRXM_Z2bEh1j.jpg`.

## Recommendation for the spec

Colocate. Use `src/content/blog/<slug>/index.{md,mdx}` with `glob({ base: "./src/content/blog", pattern: "**/index.{md,mdx}" })`, and `image: image().optional()` / `ogImage: image().optional()` in the schema. Build the OG URL with `new URL((ogImage ?? image).src, Astro.site)`, or use `getImage()` to get a sized share variant. Shared, cross-Post images go in `src/assets/`.
