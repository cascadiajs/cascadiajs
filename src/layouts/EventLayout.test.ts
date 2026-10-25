import { expect, test, vi } from "vitest";
import { render, tags } from "@shared/test-render";
import EventLayout from "./EventLayout.astro";

vi.mock("@shared/data/events", () => ({
  getEventConfig: (year: string) => ({
    year,
    logo: "/events/sample/images/test-photo.png",
    ogImage: "/share.png",
    ogDescription: "An Event",
    nav: [{ label: "Tickets", href: `/${year}/tickets` }],
  }),
}));

test("EventLayout shows the EventNav and not the site header navigation", async () => {
  const html = await render(EventLayout, {
    props: { year: "2099", title: "A page" },
  });
  expect(html).toContain("cjs-event-nav");
  expect(tags(html, "a").map((a) => a.attrs.href)).toContain("/2099/tickets");
  expect(tags(html, "a").some((a) => a.attrs.id === "logo")).toBe(false);
  expect(html).not.toContain("Newsletter");
});
