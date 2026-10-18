import { test, expect, type Page, type Locator } from "@playwright/test";
import type { Talk, Person } from "@shared/data/types";
import talksData from "@shared/data/2026/talks.json" with { type: "json" };
import organizersData from "@shared/data/2026/organizers.json" with { type: "json" };

/**
 * The 2026 Event page spec drives the rendered page and asserts what a
 * visitor can observe: section order, links, roster content, and a handful
 * of computed-style spot checks. Data fixtures are imported from the
 * authoritative source files the page itself is built from.
 */

const allTalks = talksData as Talk[];
const keynotes = allTalks.filter((t) => t.type === "keynote");
const speakerTalks = allTalks.filter((t) =>
  ["main", "lightning", "workshop"].includes(t.type),
);
const organizers = organizersData as Person[];

function talkHref(talk: Talk): string {
  if (talk.slug) {
    return `/2026/talks/${talk.slug}`;
  }
  return "/2026";
}

/**
 * Locate a roster card by its photo's accessible name and walk up to the
 * card root. Both card shapes in the page (the Talk `<a>` and the plain
 * Organizer `<div>`) wrap their photo two levels deep -- photo box, then
 * card -- so this is stable across both without depending on class names.
 */
function cardFor(page: Page, name: string): Locator {
  return page
    .getByRole("img", { name: `photo of ${name}` })
    .locator("xpath=ancestor::*[2]");
}

async function expectTalkCard(page: Page, talk: Talk) {
  const card = cardFor(page, talk.speaker.name);
  if (talk.speaker.company) {
    await expect(card).toContainText(talk.speaker.company);
  }
  if (talk.speaker.location) {
    await expect(card).toContainText(talk.speaker.location);
  }
  await expect(card).toContainText(
    talk.slug ? talk.title : "Talk Info Coming Soon",
  );
  expect(await card.getAttribute("href")).toBe(talkHref(talk));
}

async function expectOrganizerCard(page: Page, person: Person) {
  const card = cardFor(page, person.name);
  if (person.title) {
    await expect(card).toContainText(person.title);
  }
  if (person.location) {
    await expect(card).toContainText(person.location);
  }
  expect(await card.getAttribute("href")).toBeNull();
}

test.describe("2026 event page", () => {
  test.beforeEach(async ({ page }) => {
    // The Testimonials section (shared, unmodified by this page) loads X's
    // widget script. Block it at the network layer, same as the home page
    // spec, so the fallback DOM stays deterministic.
    await page.route(
      /^https:\/\/(platform\.twitter\.com|.*\.twimg\.com)\//,
      (route) => route.abort(),
    );
    await page.goto("/2026");
  });

  test("renders", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("sections render in the documented order", async ({ page }) => {
    const ids = await page
      .locator("main > *[id]")
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual([
      "hero",
      "nav",
      "features",
      "pitch",
      "networking",
      "pricing",
      "speakers",
      "sponsors",
      "testimonials",
    ]);
  });

  // -- Hero --------------------------------------------------------------

  test("hero video plays as a looping, muted background film", async ({
    page,
  }) => {
    const video = page.locator("#hero video");
    await expect(video).toBeVisible();
    const attrs = await video.evaluate((el: HTMLVideoElement) => ({
      muted: el.muted,
      autoplay: el.autoplay,
      loop: el.loop,
      playsInline: el.playsInline,
      preload: el.preload,
    }));
    expect(attrs).toEqual({
      muted: true,
      autoplay: true,
      loop: true,
      playsInline: true,
      preload: "auto",
    });
    await expect(video.locator("source")).toHaveAttribute(
      "src",
      "/events/2026/video/sizzle.mp4",
    );
  });

  test("hero shows a SOLD OUT pill that is not a real, focusable link", async ({
    page,
  }) => {
    const pill = page.locator("#hero a", { hasText: "SOLD OUT" });
    await expect(pill).toBeVisible();
    await expect(pill.locator("i.fa-tree")).toBeAttached();
    expect(await pill.getAttribute("href")).toBeNull();
    // An <a> with no href carries no link semantics -- it must not surface
    // in the accessibility tree as a link.
    await expect(page.getByRole("link", { name: /SOLD OUT/i })).toHaveCount(0);
  });

  test("SOLD OUT pill renders as the legacy site actually renders it", async ({
    page,
  }) => {
    // The legacy markup splits the "cta" and "nope" classes across the
    // wrapper div and the inner anchor, so the `.cta.nope` gray/black
    // override (a compound selector requiring both classes on one element)
    // never actually fires. Verified against the live legacy site: the
    // pill renders as a plain blue `.cta` with cedar-cream text, not the
    // gray pill its two split class names would suggest.
    const pill = page.locator("#hero a", { hasText: "SOLD OUT" });
    const styles = await pill.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { backgroundColor: cs.backgroundColor, color: cs.color };
    });
    expect(styles.backgroundColor).toBe("rgb(0, 51, 255)");
    expect(styles.color).toBe("rgb(255, 245, 204)");
  });

  // -- Sub-nav -------------------------------------------------------------

  // -- Features --------------------------------------------------------

  // -- Networking --------------------------------------------------------

  // -- Pricing -------------------------------------------------------------

  // -- Speakers: structure ------------------------------------------------

  test("Talk cards link to detail pages or the event root", async ({
    page,
  }) => {
    const hrefs = allTalks.map(talkHref);
    const rootCount = hrefs.filter((href) => href === "/2026").length;
    const detailCount = hrefs.filter((href) =>
      href.startsWith("/2026/talks/"),
    ).length;
    await expect(page.locator("#speakers a[href='/2026']")).toHaveCount(
      rootCount,
    );
    await expect(page.locator("#speakers a[href^='/2026/talks/']")).toHaveCount(
      detailCount,
    );
  });

  test("Keynotes grid has exactly five cards", async ({ page }) => {
    const grid = page.locator("h1:text-is('Keynotes') + div");
    await expect(grid.locator("a")).toHaveCount(5);
  });

  test("Speakers grid has exactly twenty-three cards", async ({ page }) => {
    const grid = page.locator("h1:text-is('Speakers') + div");
    await expect(grid.locator("a")).toHaveCount(23);
  });

  test("Keynotes and Speakers grids follow talks.json order", async ({
    page,
  }) => {
    const photos = (heading: string) =>
      page
        .locator(`h1:text-is('${heading}') + div img`)
        .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("alt")));
    const altsFor = (talks: Talk[]) =>
      talks.map((t) => `photo of ${t.speaker.name}`);

    expect(await photos("Keynotes")).toEqual(altsFor(keynotes));
    expect(await photos("Speakers")).toEqual(altsFor(speakerTalks));
  });

  test("Organizers grid has exactly fourteen cards, none of them links", async ({
    page,
  }) => {
    const grid = page.locator("h1:text-is('Organizers') + div");
    await expect(grid.locator("img")).toHaveCount(14);
    await expect(grid.locator("a")).toHaveCount(0);
  });

  test("organizer cards have no hover overlay", async ({ page }) => {
    const photoBox = cardFor(page, "Carter Rabasa").locator(
      `xpath=.//img[@alt="photo of Carter Rabasa"]/..`,
    );
    await expect(photoBox.locator("div")).toHaveCount(0);
  });

  // -- Speakers: full roster ------------------------------------------------

  test("all five Keynotes render with speaker, company, and location", async ({
    page,
  }) => {
    for (const talk of keynotes) {
      await expectTalkCard(page, talk);
    }
  });

  test("all twenty-three Speakers render with speaker, company, and location", async ({
    page,
  }) => {
    for (const talk of speakerTalks) {
      await expectTalkCard(page, talk);
    }
  });

  test("all fourteen Organizers render with name, role, and location", async ({
    page,
  }) => {
    for (const person of organizers) {
      await expectOrganizerCard(page, person);
    }
  });

  test("a Talk with no detail page shows the Talk Info Coming Soon fallback", async ({
    page,
  }) => {
    const card = cardFor(page, "Matt Biilmann");
    await expect(card).toContainText("Talk Info Coming Soon");
    expect(await card.getAttribute("href")).toBe("/2026");
  });

  test("a Talk with a detail page shows its own title as the overlay", async ({
    page,
  }) => {
    const card = cardFor(page, "Joe Duffy");
    await expect(card).toContainText("The Last Mile Is Code");
    expect(await card.getAttribute("href")).toBe(
      "/2026/talks/the-last-mile-is-code",
    );
  });

  // -- Fidelity spot-checks (ADR-0015) --------------------------------------

  test("features and pitch bands use the mint background", async ({ page }) => {
    for (const id of ["#features", "#pitch"]) {
      const bg = await page
        .locator(id)
        .evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(bg).toBe("rgb(204, 241, 219)");
    }
  });

  test("networking section has no background tint", async ({ page }) => {
    const bg = await page
      .locator("#networking")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe("rgba(0, 0, 0, 0)");
  });

  test("a ticket card uses the sound-navy border", async ({ page }) => {
    const ticket = page.getByText("$799", { exact: true }).locator("xpath=..");
    const border = await ticket.evaluate((el) => getComputedStyle(el).border);
    expect(border).toBe("2px solid rgb(17, 35, 120)");
  });

  test("hero headline carries the 40px vertical margins the reference actually renders", async ({
    page,
  }) => {
    // The reference declares `.video-overlay h2 { margin: 0 }`, but the same
    // stylesheet also has `#landing h2 { margin: 40px 0 }` — an ID selector,
    // so it wins. 40px is what the live page renders (ADR-0001).
    const heading = page.getByRole("heading", {
      level: 2,
      name: "A Web + AI conference for the Pacific Northwest",
    });
    const margins = await heading.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { top: cs.marginTop, bottom: cs.marginBottom };
    });
    expect(margins).toEqual({ top: "40px", bottom: "40px" });
  });

  test("hero headline wraps instead of running off the viewport", async ({
    page,
  }) => {
    // The overlay is shrink-to-fit, capped at the width left after its 3vw
    // offset. Without that cap the headline sets on one line and overflows.
    await page.setViewportSize({ width: 1280, height: 900 });
    const heading = page.getByRole("heading", {
      level: 2,
      name: "A Web + AI conference for the Pacific Northwest",
    });
    const box = await heading.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(1280);
    // Two lines at 60px with a 1.125 line-height is ~135px; one line is ~68px.
    expect(box!.height).toBeGreaterThan(100);
  });

  test("hero stays within the viewport at both widths", async ({ page }) => {
    // Deliberately scoped to the hero rather than the document: the legacy
    // pricing row really is wider than the viewport (four 344px cards in a
    // 1216px container), so the page as a whole scrolls sideways on the live
    // site too. Reproducing that is fidelity; the hero spilling out was not.
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const box = await page.locator("#hero").boundingBox();
      expect(
        box!.width,
        `hero wider than viewport at ${width}px`,
      ).toBeLessThanOrEqual(width);
    }
  });

  test("a speaker photo card is a 250x250 box", async ({ page }) => {
    const photoBox = page
      .getByRole("img", { name: "photo of Joe Duffy" })
      .locator("xpath=..");
    const box = await photoBox.boundingBox();
    expect(box?.width).toBe(250);
    expect(box?.height).toBe(250);
  });

  // -- Responsive: both viewports must match (mobile isn't an afterthought) --

  test("feature panels sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    const first = page.getByRole("img", { name: "Feature: Amazing Speakers" });
    const second = page.getByRole("img", {
      name: "Feature: Cutting-Edge Content",
    });

    await page.setViewportSize({ width: 1280, height: 900 });
    const desktopFirst = await first.boundingBox();
    const desktopSecond = await second.boundingBox();
    expect(Math.abs(desktopFirst!.y - desktopSecond!.y)).toBeLessThan(2);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileFirst = await first.boundingBox();
    const mobileSecond = await second.boundingBox();
    expect(mobileSecond!.y).toBeGreaterThanOrEqual(
      mobileFirst!.y + mobileFirst!.height,
    );
  });

  test("ticket cards sit side by side at desktop width and stack at mobile width", async ({
    page,
  }) => {
    const t799 = page.getByText("$799", { exact: true });
    const t599 = page.getByText("$599", { exact: true });

    await page.setViewportSize({ width: 1280, height: 900 });
    const desktop799 = await t799.boundingBox();
    const desktop599 = await t599.boundingBox();
    expect(Math.abs(desktop799!.y - desktop599!.y)).toBeLessThan(2);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobile799 = await t799.boundingBox();
    const mobile599 = await t599.boundingBox();
    expect(mobile599!.y).toBeGreaterThan(mobile799!.y);
  });

  test("speaker card overlay only occupies layout at desktop width", async ({
    page,
  }) => {
    const overlay = cardFor(page, "Joe Duffy").locator(
      `xpath=.//img[@alt="photo of Joe Duffy"]/following-sibling::div`,
    );

    await page.setViewportSize({ width: 1280, height: 900 });
    expect(await overlay.evaluate((el) => getComputedStyle(el).display)).toBe(
      "block",
    );

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await overlay.evaluate((el) => getComputedStyle(el).display)).toBe(
      "none",
    );
  });
});
