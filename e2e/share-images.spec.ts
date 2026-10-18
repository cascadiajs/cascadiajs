import { test, expect, type Page } from "@playwright/test";
import talks from "@shared/data/2026/talks.json" with { type: "json" };

/**
 * Share images (issue #86): every page's og:image/twitter:image is an absolute
 * URL to a real file under /images/2026/share/. Talk pages use their
 * Speaker's legacy card when one exists; five top-level pages use their own
 * image; everything else uses the
 * general image.
 */

const ORIGIN = "https://cascadiajs.com";
const SHARE = `${ORIGIN}/images/2026/share`;
const GENERAL = `${SHARE}/social-sharing-general.png`;

/** Speakers with a legacy card (`speaker-<slug>.png`). */
const SPEAKER_CARDS = [
  "alex-hinson",
  "alex-moon",
  "brittany-ellich",
  "courtney-yatteau",
  "daniel-mendoza",
  "darius-cepulis",
  "dylan-goings",
  "filip-sodic",
  "francesco-ciulla",
  "james-steinbach",
  "jeff-otano",
  "joe-duffy",
  "joel-hooks",
  "jonathan-keslin",
  "marty-nelson",
  "molly-jean-bennett",
  "theo",
];

const PAGE_IMAGES = [
  "code-of-conduct",
  "mailing-list",
  "mailing-list-thanks",
  "unsubscribed",
  "welcome",
];

const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function expectShareImage(page: Page, expected: string) {
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    expected,
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    expected,
  );
}

test.describe("Share images", () => {
  test("all 23 share images are served from /images/2026/share/", async ({
    request,
  }) => {
    const files = [
      "social-sharing-general.png",
      ...SPEAKER_CARDS.map((s) => `speaker-${s}.png`),
      ...PAGE_IMAGES.map((p) => `${p}.png`),
    ];
    expect(files).toHaveLength(23);
    for (const file of files) {
      const res = await request.get(`/images/2026/share/${file}`);
      expect(res.status(), file).toBe(200);
      expect(res.headers()["content-type"], file).toBe("image/png");
    }
  });

  for (const talk of talks.filter((t) => t.slug)) {
    const speakerSlug = slugify(talk.speaker.name);
    const expected = SPEAKER_CARDS.includes(speakerSlug)
      ? `${SHARE}/speaker-${speakerSlug}.png`
      : GENERAL;
    test(`talk ${talk.slug} uses ${expected.split("/").pop()}`, async ({
      page,
    }) => {
      await page.goto(`/2026/talks/${talk.slug}`);
      await expectShareImage(page, expected);
    });
  }

  // Pinned independently of `slugify` so a shared bug can't mask itself.
  const talkBy = (speaker: string) =>
    talks.find((t) => t.speaker.name === speaker && t.slug)!.slug;

  test("an accented Speaker name maps to its card", async ({ page }) => {
    await page.goto(`/2026/talks/${talkBy("Jeff Otaño")}`);
    await expectShareImage(page, `${SHARE}/speaker-jeff-otano.png`);
  });

  for (const speaker of [
    "Kaelig Deloumeau-Prigent",
    "Luis Montes",
    "Erik Hanchett",
    "James Ide",
    "Michael Liendo",
    "Nyah Macklin",
  ]) {
    test(`${speaker} has no card and uses the general image`, async ({
      page,
    }) => {
      await page.goto(`/2026/talks/${talkBy(speaker)}`);
      await expectShareImage(page, GENERAL);
    });
  }

  for (const name of PAGE_IMAGES) {
    test(`/${name} uses its own image`, async ({ page }) => {
      await page.goto(`/${name}`);
      await expectShareImage(page, `${SHARE}/${name}.png`);
    });
  }

  for (const path of [
    "/",
    "/2026",
    "/cookies",
    "/2026/attend",
    "/2026/sponsorships",
    "/2026/sponsors/aws",
    "/2026/workshops/deploying-ai-agents",
    "/media-kit",
  ]) {
    test(`${path} uses the general image`, async ({ page }) => {
      await page.goto(path);
      await expectShareImage(page, GENERAL);
    });
  }
});
