import { test, expect, type Page } from "@playwright/test";

/**
 * The 2027 landing page at `/` has its own chrome from the Figma mockup:
 * HomeNav instead of the Event nav, and HomeFooter instead of SiteFooter.
 */

test.describe("the home page", () => {
  test("has HomeNav, not the Event nav", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav).toHaveCount(1);
    await expect(
      nav.getByRole("link", { name: "CascadiaJS home" }),
    ).toHaveAttribute("href", "/");
    await expect(nav.getByRole("link", { name: "Sponsor" })).toHaveAttribute(
      "href",
      "/sponsor",
    );
    await expect(nav.getByRole("link", { name: "Tickets" })).toHaveAttribute(
      "href",
      "/tickets",
    );
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
  });

  test("has HomeFooter, not SiteFooter", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator(".cjs-home-footer");
    await expect(
      footer.getByRole("heading", { name: "Stay in touch!" }),
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Code of Conduct" }),
    ).toHaveAttribute("href", "/code-of-conduct");
    await expect(page.locator(".cjs-site-footer")).toHaveCount(0);
  });

  test("has one h1, the tagline", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(
      /A Web \+ AI conference for\s*the Pacific Northwest/,
    );
  });

  test("nav items without a page aren't links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByText("About")).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toHaveCount(0);
  });

  test("leaves out the items hidden for now", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const label of ["Trainings", "Schedule", "Attend"]) {
      await expect(nav.getByText(label, { exact: true })).toHaveCount(0);
    }
    for (const label of ["CFP", "Sponsor", "Tickets"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test.describe("the hero video", () => {
    const video = (page: Page) => page.locator(".cjs-home-hero-video video");
    const isPaused = (page: Page) =>
      video(page).evaluate((el: HTMLVideoElement) => el.paused);

    test("plays, and the button pauses and plays it", async ({ page }) => {
      await page.goto("/");
      await expect.poll(() => isPaused(page)).toBe(false);

      await page.getByRole("button", { name: "Pause video" }).click();
      await expect.poll(() => isPaused(page)).toBe(true);

      await page.getByRole("button", { name: "Play video" }).click();
      await expect.poll(() => isPaused(page)).toBe(false);
    });

    test("with reduced motion, stays on the poster until someone presses play", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await expect(
        page.getByRole("button", { name: "Play video" }),
      ).toBeVisible();
      expect(await isPaused(page)).toBe(true);
    });
  });

  test.describe("the photo gallery", () => {
    const playState = (page: Page) =>
      page.locator("[data-home-gallery-track]").evaluate((el) => {
        const style = getComputedStyle(el);
        return style.animationName === "none"
          ? "still"
          : style.animationPlayState;
      });

    test("scrolls, and the button pauses and plays it", async ({ page }) => {
      await page.goto("/");
      await expect.poll(() => playState(page)).toBe("running");

      await page.getByRole("button", { name: "Pause photo gallery" }).click();
      await page.mouse.move(0, 0);
      await expect.poll(() => playState(page)).toBe("paused");

      await page.getByRole("button", { name: "Play photo gallery" }).click();
      await page.mouse.move(0, 0);
      await expect.poll(() => playState(page)).toBe("running");
    });

    test("with reduced motion, stays still until someone presses play", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await expect(
        page.getByRole("button", { name: "Play photo gallery" }),
      ).toBeVisible();
      expect(await playState(page)).toBe("still");
    });
  });

  test.describe("from 880px up, where the full nav fits on one line", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    const navTop = async (page: Page) =>
      Math.round(
        (await page
          .getByRole("navigation", { name: "Main" })
          .evaluate((el) => el.getBoundingClientRect().top)) as number,
      );

    test("the nav takes no room: Call for presenters is 64px below the photo", async ({
      page,
    }) => {
      await page.goto("/");
      const gap = await page.evaluate(() => {
        const hero = document.querySelector("[data-home-nav-pin]")!;
        const cfp = document.querySelector("#cfp")!.firstElementChild!;
        return (
          cfp.getBoundingClientRect().top - hero.getBoundingClientRect().bottom
        );
      });
      expect(Math.round(gap)).toBe(64);
    });

    test("the nav slides in once the hero photo reaches the top", async ({
      page,
    }) => {
      await page.goto("/");
      const heroTop = await page
        .locator("[data-home-nav-pin]")
        .evaluate((el) => el.getBoundingClientRect().top + scrollY);

      // Above the window until the photo's top reaches the top.
      await page.evaluate((y) => scrollTo(0, y), heroTop - 10);
      await expect.poll(() => navTop(page)).toBe(-75);

      await page.evaluate((y) => scrollTo(0, y), heroTop + 10);
      await expect.poll(() => navTop(page)).toBe(0);

      await page.evaluate(() => scrollTo(0, 0));
      await expect.poll(() => navTop(page)).toBe(-75);
    });

    test("the nav slides in while it has keyboard focus", async ({ page }) => {
      await page.goto("/");
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "CFP" })
        .focus();
      await expect.poll(() => navTop(page)).toBe(0);
    });
  });

  test.describe("below 880px, the nav items collapse into a menu", () => {
    test.use({ viewport: { width: 375, height: 800 } });

    test("the bar is one row with a menu button", async ({ page }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("button", { name: "Menu" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "CFP" })).toBeHidden();
      expect(Math.round((await nav.boundingBox())!.height)).toBe(75);
    });

    test("the button opens the menu, and Escape closes it", async ({
      page,
    }) => {
      await page.goto("/");
      const nav = page.getByRole("navigation", { name: "Main" });
      const button = nav.getByRole("button", { name: "Menu" });

      await button.click();
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(nav.getByRole("link", { name: "CFP" })).toBeVisible();
      await expect(nav.getByText("About")).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(nav.getByRole("link", { name: "CFP" })).toBeHidden();
      await expect(button).toBeFocused();
    });
  });

  test("at 880px the full nav fits on one line, with no menu button", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 880, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("button", { name: "Menu" })).toBeHidden();
    await expect(nav.getByRole("link", { name: "CFP" })).toBeVisible();
    expect(Math.round((await nav.boundingBox())!.height)).toBe(75);
  });

  // The testimonials row overhangs the content column; below 1352px that
  // used to make the page scroll sideways.
  for (const width of [375, 768, 1024, 1280, 1512]) {
    test(`doesn't scroll sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
});

/**
 * /tickets uses the home page's chrome, with the green nav fixed to the top
 * of the window, and gates the ticket prices behind a Kit email form.
 */
test.describe("the tickets page", () => {
  test("has the sticky green nav, the headline and the email form", async ({
    page,
  }) => {
    await page.goto("/tickets");
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
    await expect(page.locator(".cjs-home-footer")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 1, name: "View Ticket Prices" }),
    ).toBeVisible();
    // Kit's script replaces its own tag once it loads, so check the HTML as
    // served (which also keeps the test from depending on kit.com).
    const html = await (await page.request.get("/tickets")).text();
    expect(html).toMatch(
      /class="cjs-kit-signup[^"]*"[^>]*>\s*<script[^>]*data-uid="44b5c8e9d5"/,
    );
  });

  for (const width of [375, 1280]) {
    test(`at ${width}px the nav stays at the top of the window`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.goto("/tickets");
      const nav = page.getByRole("navigation", { name: "Main" });
      const h1 = page.getByRole("heading", { level: 1 });
      // 64px between the nav and the headline.
      const gap = await page.evaluate(
        () =>
          document.querySelector("h1")!.getBoundingClientRect().top -
          document.querySelector(".cjs-home-nav")!.getBoundingClientRect()
            .bottom,
      );
      expect(Math.round(gap)).toBe(64);
      await expect(h1).toBeVisible();

      await page.evaluate(() =>
        scrollTo(0, document.documentElement.scrollHeight),
      );
      await expect
        .poll(() =>
          nav.evaluate((el) => Math.round(el.getBoundingClientRect().top)),
        )
        .toBe(0);
    });
  }

  test("sends people who already signed up to /buy-tickets", async ({
    page,
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem("cksubscribed-44b5c8e9d5", "true"),
    );
    await page.goto("/tickets");
    await expect(page).toHaveURL(/\/buy-tickets$/);
  });
});

/**
 * /buy-tickets (Figma "Interior page - buy-tickets - laptop"): the green nav
 * with a yellow Tickets button, a section bar under it, and the ticket
 * details.
 */
test.describe("the buy-tickets page", () => {
  test("has the green nav, section bar and ticket details", async ({
    page,
  }) => {
    await page.goto("/buy-tickets");
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
    await expect(page.locator(".cjs-home-footer")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 1, name: "Tickets" }),
    ).toBeVisible();
    const sectionBar = page.getByRole("navigation", {
      name: "Tickets sections",
    });
    for (const name of ["Release Schedule", "Group Sales"]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
      await expect(sectionBar.getByRole("link", { name })).toBeVisible();
    }
    // The checkout has no heading, only a section bar link.
    await expect(
      page.getByRole("heading", { name: "Buy Tickets" }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("region", { name: "Buy Tickets" }),
    ).toBeVisible();
    await expect(
      sectionBar.getByRole("link", { name: "Buy Tickets" }),
    ).toBeVisible();
    await expect(page.getByRole("row")).toHaveCount(5);
    await expect(
      page.getByRole("row", { name: /Blind Bird On sale now/ }),
    ).toBeVisible();
    await expect(
      page.locator(
        "#buy-tickets iframe[title='Buy CascadiaJS 2027 tickets on Luma']",
      ),
    ).toHaveAttribute(
      "src",
      "https://luma.com/embed/event/evt-lnaYPvSZF8EnaHw/simple",
    );
  });

  test("the on-sale card shows the current prices and jumps to the checkout", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto("/buy-tickets");
    const prices = page.getByRole("definition");
    await expect(prices).toHaveText(["$499", "$299"]);
    await expect(page.getByRole("term")).toHaveText(["Blind Bird", "Indie"]);
    await page.getByRole("link", { name: "Get your ticket" }).click();
    await expect
      .poll(() =>
        page
          .locator("#luma-checkout")
          .evaluate((el) => el.getBoundingClientRect().top),
      )
      .toBeGreaterThanOrEqual(122);
    await expect(page.locator("#luma-checkout")).toBeInViewport();
  });

  test("a section link lands below both bars", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto("/buy-tickets");
    await page
      .getByRole("navigation", { name: "Tickets sections" })
      .getByRole("link", { name: "Group Sales" })
      .click();
    await expect
      .poll(() =>
        page.evaluate(() => ({
          nav: document.querySelector(".cjs-home-nav")!.getBoundingClientRect()
            .top,
          bar: document
            .querySelector(".cjs-page-subnav")!
            .getBoundingClientRect().bottom,
          section: document
            .querySelector("#group-sales")!
            .getBoundingClientRect().top,
        })),
      )
      .toMatchObject({ nav: 0, bar: 122 });
    const sectionTop = await page
      .locator("#group-sales")
      .evaluate((el) => el.getBoundingClientRect().top);
    expect(sectionTop).toBeGreaterThanOrEqual(122);
  });

  test("the section bar's links all fit on a 360px phone", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto("/buy-tickets");
    const row = page.locator(".cjs-page-subnav > div");
    const { scrollWidth, clientWidth } = await row.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    await expect(
      page.getByRole("link", { name: "Group Sales" }).first(),
    ).toBeInViewport({ ratio: 1 });
  });

  test("doesn't scroll sideways at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/buy-tickets");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
});

/**
 * /next-steps/attendees: an interior page on InteriorLayout, like
 * /buy-tickets.
 */
test.describe("the attendee next steps page", () => {
  test("has the interior chrome and the community links", async ({ page }) => {
    await page.goto("/next-steps/attendees");
    await expect(page).toHaveTitle(/^Next Steps \| CascadiaJS 2027/);
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
    await expect(page.locator(".cjs-home-footer")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 1, name: "Next Steps" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Connect With Our Community",
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Next Steps sections" })
        .getByRole("link", { name: "Connect With Our Community" }),
    ).toHaveAttribute("href", "#connect-with-our-community");
    const section = page.locator("#connect-with-our-community");
    for (const [name, href] of [
      ["Discord Community", "https://discord.gg/kkYR86GM29"],
      ["Bluesky", "https://bsky.app/profile/cascadiajs.com"],
      ["LinkedIn", "https://www.linkedin.com/showcase/cascadiajs"],
      ["Twitter", "https://twitter.com/CascadiaJS"],
      ["YouTube", "https://www.youtube.com/@cascadiajs"],
    ]) {
      await expect(section.getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
    }
  });
});

/**
 * /sponsor: the sponsor brochure gate, on the same EmailGateLayout as
 * /tickets, with the brochure's Kit form.
 */
test.describe("the sponsor brochure page", () => {
  test("has the sticky green nav, the headline and the brochure form", async ({
    page,
  }) => {
    await page.goto("/sponsor");
    await expect(page).toHaveTitle(/^Request Sponsor Brochure \| CascadiaJS/);
    await expect(page.locator(".cjs-event-nav")).toHaveCount(0);
    await expect(page.locator(".cjs-home-nav[data-sticky]")).toHaveCount(1);
    await expect(page.locator(".cjs-home-footer")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 1, name: "Request Sponsor Brochure" }),
    ).toBeVisible();
    // As on /tickets, check the HTML as served: Kit's script replaces its tag.
    const html = await (await page.request.get("/sponsor")).text();
    expect(html).toMatch(
      /class="cjs-kit-signup[^"]*"[^>]*>\s*<script[^>]*data-uid="8371f9bcf5"/,
    );
  });

  test("sends people who already requested it to /sponsorships", async ({
    page,
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem("cksubscribed-8371f9bcf5", "true"),
    );
    await page.goto("/sponsor");
    await expect(page).toHaveURL(/\/sponsorships$/);
  });
});
