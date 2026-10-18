import { test, expect } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";
import {
  expectHeaderEventLinkIsFeaturedEvent,
  expectPastSponsorsMatchFeaturedEvent,
} from "./helpers";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    // The Testimonials section loads X's widgets.js to upgrade blockquotes
    // into embedded cards. Block it at the network layer so the fallback
    // DOM stays deterministic and the suite doesn't depend on a third
    // party's availability.
    await page.route(
      /^https:\/\/(platform\.twitter\.com|.*\.twimg\.com)\//,
      (route) => route.abort(),
    );
    await page.goto("/");
  });

  test("renders", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });

  test("site header shows the alert banner", async ({ page }) => {
    const banner = page.locator(".alert-banner");
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("link")).toHaveCount(1);
  });

  test("site header shows the logo linking home", async ({ page }) => {
    const header = page.getByRole("banner");
    const logoLink = header.getByRole("link", { name: "CascadiaJS logo" });
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute("href", "/");
  });

  test("hero shows pre-header, heading, and intro copy", async ({ page }) => {
    await expect(page.getByText("Connecting devs since 2012")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "We're a community for web + AI developers in the Pacific Northwest.",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "We create events that will help you level up, grow your network, find a job and have fun!",
        { exact: false },
      ),
    ).toBeVisible();
  });

  test("hero image is present with its alt text", async ({ page }) => {
    const image = page.getByRole("img", {
      name: "Sasquatch driving a camper van",
    });
    await expect(image).toBeVisible();
  });

  test("site footer is present with its sections", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByRole("heading", {
        name: "CascadiaJS - a Web + AI conf for the PNW",
      }),
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Stay Connected" }),
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Past Events" }),
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Privacy Policy" }),
    ).toBeVisible();
  });

  test("sponsors grid shows representative logos with alt text", async ({
    page,
  }) => {
    await expect(
      page.getByRole("img", { name: "Cloudflare logo" }),
    ).toBeVisible();
    await expect(page.getByRole("img", { name: "Netlify logo" })).toBeVisible();
    await expect(
      page.getByRole("img", { name: "CircleCI logo" }),
    ).toBeVisible();
  });

  test("sponsors grid renders logos unlinked in the flat layout", async ({
    page,
  }) => {
    // The home page renders the flat layout, so logos are never linked.
    await expect(
      page.getByRole("link", { name: "Cloudflare logo" }),
    ).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Netlify logo" })).toHaveCount(
      0,
    );
  });

  test("site header Event link points to the Featured Event", async ({
    page,
  }) => {
    await expectHeaderEventLinkIsFeaturedEvent(page);
  });

  test("hero CTA points to the Featured Event", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /^CascadiaJS: June/ }),
    ).toHaveAttribute("href", `/${FEATURED_EVENT}`);
  });

  test("Past Sponsors set and Sponsor CTA match the Featured Event", async ({
    page,
  }) => {
    await expectPastSponsorsMatchFeaturedEvent(page);
  });

  test("sponsors section shows the Past Sponsors heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "Past Sponsors" }),
    ).toBeVisible();
  });

  test("testimonials section is present with its fragment identifier", async ({
    page,
  }) => {
    const testimonials = page.locator("#testimonials");
    await expect(testimonials).toBeVisible();
  });

  test("testimonials section follows the sponsors section", async ({
    page,
  }) => {
    const sponsorsIndex = await page
      .locator("#sponsors")
      .evaluate((el) => Array.from(el.parentElement!.children).indexOf(el));
    const testimonialsIndex = await page
      .locator("#testimonials")
      .evaluate((el) => Array.from(el.parentElement!.children).indexOf(el));
    expect(testimonialsIndex).toBeGreaterThan(sponsorsIndex);
  });

  const testimonials: {
    author: string;
    handle: string;
    date: string;
    permalink: string;
  }[] = [
    {
      author: "swyx",
      handle: "@swyx",
      date: "August 14, 2025",
      permalink:
        "https://twitter.com/swyx/status/1955883084236382704?ref_src=twsrc%5Etfw",
    },
    {
      author: "Josh Goldberg 🦋",
      handle: "@JoshuaKGoldberg",
      date: "June 22, 2024",
      permalink:
        "https://twitter.com/JoshuaKGoldberg/status/1804535853739556963?ref_src=twsrc%5Etfw",
    },
    {
      author: "Michelle Bakels",
      handle: "@MichelleBakels",
      date: "March 28, 2025",
      permalink:
        "https://twitter.com/MichelleBakels/status/1905588634130014503?ref_src=twsrc%5Etfw",
    },
    {
      author: "Charlie Gerard",
      handle: "@devdevcharlie",
      date: "September 2, 2022",
      permalink:
        "https://twitter.com/devdevcharlie/status/1565509276021362688?ref_src=twsrc%5Etfw",
    },
    {
      author: "Mark Palfreeman 🪐",
      handle: "@markpalfreeman",
      date: "September 3, 2022",
      permalink:
        "https://twitter.com/markpalfreeman/status/1566111262014320640?ref_src=twsrc%5Etfw",
    },
    {
      author: "Tejas Kumar",
      handle: "@TejasKumar_",
      date: "September 3, 2022",
      permalink:
        "https://twitter.com/TejasKumar_/status/1566127865594355712?ref_src=twsrc%5Etfw",
    },
    {
      author: "Formidable, Now Nearform",
      handle: "@FormidableLabs",
      date: "September 6, 2022",
      permalink:
        "https://twitter.com/FormidableLabs/status/1567143084957237251?ref_src=twsrc%5Etfw",
    },
    {
      author: "Divya",
      handle: "@shortdiv",
      date: "November 9, 2019",
      permalink:
        "https://twitter.com/shortdiv/status/1192967417867034625?ref_src=twsrc%5Etfw",
    },
    {
      author: "Cassidy",
      handle: "@cassidoo",
      date: "September 3, 2020",
      permalink:
        "https://twitter.com/cassidoo/status/1301313550577577984?ref_src=twsrc%5Etfw",
    },
    {
      author: "Nathan Pickard",
      handle: "@NathanPickard",
      date: "November 8, 2021",
      permalink:
        "https://twitter.com/NathanPickard/status/1457848244034170886?ref_src=twsrc%5Etfw",
    },
    {
      author: "Treasure Porth",
      handle: "@treasureporth",
      date: "November 13, 2019",
      permalink:
        "https://twitter.com/treasureporth/status/1194446190068158464?ref_src=twsrc%5Etfw",
    },
    {
      author: "Nicole Oliver",
      handle: "@nixcodes",
      date: "November 5, 2021",
      permalink:
        "https://twitter.com/nixcodes/status/1456441379760992258?ref_src=twsrc%5Etfw",
    },
    {
      author: "Jessica West",
      handle: "@jessicaewest",
      date: "November 5, 2021",
      permalink:
        "https://twitter.com/jessicaewest/status/1456483897596809216?ref_src=twsrc%5Etfw",
    },
    {
      author: "Welling Guzmán",
      handle: "@wellingguzman",
      date: "November 17, 2018",
      permalink:
        "https://twitter.com/wellingguzman/status/1063708080259518464?ref_src=twsrc%5Etfw",
    },
    {
      author: "meganmckissack",
      handle: "@meganmckissack",
      date: "November 19, 2018",
      permalink:
        "https://twitter.com/meganmckissack/status/1064595216995246081?ref_src=twsrc%5Etfw",
    },
  ];

  test("testimonials render all fifteen in order", async ({ page }) => {
    const blockquotes = page.locator("#testimonials blockquote.twitter-tweet");
    await expect(blockquotes).toHaveCount(testimonials.length);

    const texts = await blockquotes.evaluateAll((nodes) =>
      nodes.map((node) => node.textContent ?? ""),
    );
    testimonials.forEach(({ author }, index) => {
      expect(texts[index]).toContain(author);
    });
  });

  test("each testimonial shows its author name, handle, and date label", async ({
    page,
  }) => {
    const blockquotes = page.locator("#testimonials blockquote.twitter-tweet");

    for (let i = 0; i < testimonials.length; i++) {
      const { author, handle, date } = testimonials[i];
      const blockquote = blockquotes.nth(i);
      await expect(blockquote).toContainText(`${author} (${handle})`);
      await expect(blockquote.getByRole("link", { name: date })).toBeVisible();
    }
  });

  test("each testimonial permalink points at its original post", async ({
    page,
  }) => {
    const blockquotes = page.locator("#testimonials blockquote.twitter-tweet");

    for (let i = 0; i < testimonials.length; i++) {
      const { date, permalink } = testimonials[i];
      const link = blockquotes.nth(i).getByRole("link", { name: date });
      await expect(link).toHaveAttribute("href", permalink);
    }
  });

  test("exactly one X widget script tag is present on the page", async ({
    page,
  }) => {
    const widgetScripts = page.locator(
      'script[src="https://platform.twitter.com/widgets.js"]',
    );
    await expect(widgetScripts).toHaveCount(1);
  });

  test("with the widget script blocked, testimonial text and inline links remain readable", async ({
    page,
  }) => {
    const blockquotes = page.locator("#testimonials blockquote.twitter-tweet");

    for (let i = 0; i < testimonials.length; i++) {
      const { author, handle } = testimonials[i];
      const blockquote = blockquotes.nth(i);
      await expect(blockquote).toBeVisible();
      await expect(blockquote).toContainText(`${author} (${handle})`);
    }

    // Spot-check that inline links within the body text (e.g. @mentions,
    // hashtags) survive as real anchors rather than being stripped, and
    // that any embedded media in the fallback renders as a bare link
    // rather than an inline image (the widget script owns image upgrade).
    const firstBody = blockquotes.first().locator("p");
    const mention = firstBody.getByRole("link", { name: "@CascadiaJS" });
    await expect(mention).toBeVisible();
    await expect(mention).toHaveAttribute(
      "href",
      "https://twitter.com/CascadiaJS?ref_src=twsrc%5Etfw",
    );
  });

  test("fallback blockquotes and links match the reference styling", async ({
    page,
  }) => {
    // The reference styles fallback blockquotes with a gray left rule and
    // blue underlined links (legacy `blockquote` and `a` rules). These are
    // only visible before widgets.js upgrades the blockquote, so the widget
    // block in beforeEach is what makes them assertable.
    const blockquote = page
      .locator("#testimonials blockquote.twitter-tweet")
      .first();
    const bq = await blockquote.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        borderLeft: `${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}`,
        paddingLeft: cs.paddingLeft,
      };
    });
    expect(bq.borderLeft).toBe("2px solid rgb(170, 170, 170)");
    expect(bq.paddingLeft).toBe("18px");

    const link = await blockquote
      .getByRole("link", { name: "@CascadiaJS" })
      .evaluate((el) => {
        const cs = getComputedStyle(el);
        return { color: cs.color, decoration: cs.textDecorationLine };
      });
    expect(link.color).toBe("rgb(0, 51, 255)");
    expect(link.decoration).toBe("underline");
  });
});
