import { describe, expect, test } from "vitest";
import { render, tags, text } from "@shared/test-render";
import { resolvePerson, type PersonRecord } from "@shared/people";
import type { Sponsor, Talk } from "@shared/data/types";
import PersonCard from "./PersonCard.astro";
import SiteHeader from "./SiteHeader.astro";
import TalkBody from "./TalkBody.astro";
import TalkCard from "./TalkCard.astro";
import Testimonials from "./Testimonials.astro";
import VideoHero from "./VideoHero.astro";
import HallwayTrack from "./schedule/HallwayTrack.astro";
import TalkRow from "./schedule/TalkRow.astro";

/** A photo that exists under `src/assets`. */
const PHOTO = "/events/2026/images/theo.jpg";

const talk = (overrides: Partial<Talk> = {}): Talk => ({
  id: "a-talk",
  slug: "a-talk",
  title: "A Talk Title",
  type: "main",
  speaker: {
    name: "Ada Example",
    image: PHOTO,
    roles: ["speaker"],
    company: "Example Co",
    location: "Portland, OR",
  },
  ...overrides,
});

describe("TalkRow", () => {
  test("a Talk with a slug links to the Talk page of that slug", async () => {
    const html = await render(TalkRow, {
      props: { talk: talk({ slug: "ada-on-agents" }), when: "9:00am" },
    });
    const links = tags(html, "a");
    expect(links.map((a) => a.attrs.href)).toEqual([
      "/2026/talks/ada-on-agents",
    ]);
    expect(text(html)).toContain("A Talk Title");
  });

  test("a Talk without a slug shows its title and no link", async () => {
    const html = await render(TalkRow, {
      props: { talk: talk({ slug: null }) },
    });
    expect(tags(html, "a")).toEqual([]);
    expect(text(html)).toContain("A Talk Title");
  });

  test("a keynote Talk shows the keynote badge", async () => {
    const html = await render(TalkRow, {
      props: { talk: talk({ type: "keynote" }) },
    });
    expect(text(html)).toContain("Keynote");
  });

  test.each(["main", "lightning", "workshop"] as const)(
    "a %s Talk shows no keynote badge",
    async (type) => {
      const html = await render(TalkRow, { props: { talk: talk({ type }) } });
      expect(text(html)).not.toContain("Keynote");
    },
  );
});

describe("TalkCard", () => {
  test("the card links to the href it is given", async () => {
    const html = await render(TalkCard, {
      props: { talk: talk(), href: "/2026/talks/a-talk" },
    });
    expect(tags(html, "a").map((a) => a.attrs.href)).toEqual([
      "/2026/talks/a-talk",
    ]);
  });

  test("shows the Speaker's name and company", async () => {
    const html = await render(TalkCard, {
      props: { talk: talk(), href: "/x" },
    });
    expect(text(html)).toContain("Ada Example");
    expect(text(html)).toContain("Example Co");
  });

  test("an Event override replaces only the overridden field", async () => {
    const registry: PersonRecord[] = [
      {
        id: "ada",
        name: "Ada Example",
        image: PHOTO,
        roles: ["speaker"],
        company: "Registry Co",
        location: "Portland, OR",
      },
    ];
    const speaker = resolvePerson(registry, {
      id: "ada",
      overrides: { company: "Override Co" },
    });
    const html = await render(TalkCard, {
      props: { talk: talk({ speaker }), href: "/x" },
    });
    expect(text(html)).toContain("Override Co");
    expect(text(html)).not.toContain("Registry Co");
    expect(text(html)).toContain("Ada Example");
    expect(text(html)).toContain("Portland, OR");
  });
});

describe("PersonCard", () => {
  const organizer = {
    name: "Grace Organizer",
    image: PHOTO,
    roles: ["organizer" as const],
    title: "Lead Organizer",
    location: "Seattle, WA",
  };

  test("shows the name and title", async () => {
    const html = await render(PersonCard, { props: { person: organizer } });
    expect(text(html)).toContain("Grace Organizer");
    expect(text(html)).toContain("Lead Organizer");
    expect(tags(html, "img")[0].attrs.alt).toBe("photo of Grace Organizer");
  });

  test("an Event override replaces only the overridden title", async () => {
    const registry: PersonRecord[] = [{ id: "grace", ...organizer }];
    const person = resolvePerson(registry, {
      id: "grace",
      overrides: { title: "Emcee" },
    });
    const html = await render(PersonCard, { props: { person } });
    expect(text(html)).toContain("Emcee");
    expect(text(html)).not.toContain("Lead Organizer");
    expect(text(html)).toContain("Grace Organizer");
    expect(text(html)).toContain("Seattle, WA");
  });
});

describe("VideoHero", () => {
  test("the video is muted, autoplays, loops and plays inline", async () => {
    const html = await render(VideoHero, {
      props: { videoSrc: "/video/hero.mp4" },
    });
    const [video] = tags(html, "video");
    expect(video.attrs).toMatchObject({
      muted: "",
      autoplay: "",
      loop: "",
      playsinline: "",
    });
  });
});

describe("HallwayTrack", () => {
  const sponsor = (overrides: Partial<Sponsor>): Sponsor => ({
    id: "langchain",
    name: "LangChain",
    logo: "langchain.svg",
    url: "https://example.com/langchain",
    tier: "platinum",
    events: ["2026"],
    ...overrides,
  });

  test("a Sponsor logo opens in target=_new", async () => {
    const html = await render(HallwayTrack, {
      props: { year: "2026", sponsors: [sponsor({})] },
    });
    const logoLink = tags(html, "a").find(
      (a) => a.attrs.href === "https://example.com/langchain",
    );
    expect(logoLink?.attrs.target).toBe("_new");
  });
});

describe("TalkBody", () => {
  test("a Talk with a registration URL shows a link to it", async () => {
    const html = await render(TalkBody, {
      props: { talk: talk({ registrationUrl: "/2026/workshops/register" }) },
    });
    expect(tags(html, "a").map((a) => a.attrs.href)).toContain(
      "/2026/workshops/register",
    );
  });

  test("a Talk without a registration URL shows no link", async () => {
    const html = await render(TalkBody, { props: { talk: talk() } });
    expect(tags(html, "a")).toEqual([]);
  });

  test("a multi-block abstract renders more than one block", async () => {
    const html = await render(TalkBody, {
      props: { talk: talk({ abstract: "First block.\n\nSecond block." }) },
    });
    expect(tags(html, "p")).toHaveLength(2);
  });
});

describe("alert banner", () => {
  test("holds a link", async () => {
    const html = await render(SiteHeader, { props: { displayAlert: true } });
    const banner = html.match(
      /<div class="cjs-alert-banner[^"]*">([\s\S]*?)<\/div>/,
    );
    expect(banner).not.toBeNull();
    expect(tags(banner![1], "a")).toHaveLength(1);
  });

  test("is absent when the alert is off", async () => {
    const html = await render(SiteHeader, { props: { displayAlert: false } });
    expect(html).not.toContain("cjs-alert-banner");
  });
});

describe("Testimonials", () => {
  test("each Testimonial is readable text with a link when the X widget does not load", async () => {
    const html = await render(Testimonials, {
      props: {
        testimonials: [
          {
            id: "1",
            permalink: "https://x.com/someone/status/1",
            author: "Some One",
            handle: "@someone",
            date: "June 1, 2026",
            body: "Great conference!",
          },
        ],
      },
    });
    const quote = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/);
    expect(quote).not.toBeNull();
    expect(text(quote![1])).toContain("Great conference!");
    expect(text(quote![1])).toContain("Some One");
    expect(tags(quote![1], "a").map((a) => a.attrs.href)).toEqual([
      "https://x.com/someone/status/1",
    ]);
  });
});
