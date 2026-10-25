import { afterEach, describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import "../../styles/global.css";
import "./share-bar.css";
import { mountAstro, unmountAll } from "@shared/test/mount-astro";
import { initShareBars } from "./share-bar";

const SHARE_BAR = "src/components/blog/ShareBar.astro";
const FOOTER = "src/components/SiteFooter.astro";
const PROPS = { title: "A literal title" };

// Font Awesome loads from a kit script that the test page does not have. Give
// each icon the box a loaded glyph has, so the bar has its real height.
const iconBox = document.createElement("style");
iconBox.textContent = `i[class*="fa-"] { display: inline-block; width: 1em; height: 1em; }`;
document.head.append(iconBox);

afterEach(() => {
  unmountAll();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

/** The share bar inside a copy of the Post page grid. */
async function mountInPostGrid() {
  return mountAstro(
    SHARE_BAR,
    PROPS,
    `<div class="mx-auto box-content max-w-[720px] px-4 py-12 md:grid md:max-w-[824px] md:grid-cols-[48px_minmax(0,720px)] md:gap-10">%s<div data-testid="body" style="height:2000px">Body</div></div>`,
  );
}

describe("copy link", () => {
  test("writes the page URL and announces that the link was copied", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    await mountAstro(SHARE_BAR, PROPS);
    initShareBars();

    await page.getByRole("button", { name: "Copy link" }).click();

    expect(writeText).toHaveBeenCalledWith("https://example.test/");
    await expect
      .element(page.getByRole("status"))
      .toHaveTextContent("Link copied");
  });

  test("announces the failure when the copy is rejected", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    await mountAstro(SHARE_BAR, PROPS);
    initShareBars();

    await page.getByRole("button", { name: "Copy link" }).click();

    await expect
      .element(page.getByRole("status"))
      .toHaveTextContent("Couldn't copy link");
  });
});

describe("Web Share", () => {
  test("stays hidden when the browser has no navigator.share", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn() } });
    await mountAstro(SHARE_BAR, PROPS);
    initShareBars();

    await expect
      .element(page.getByRole("button", { name: "Copy link" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Share", exact: true }))
      .not.toBeInTheDocument();
  });

  test("shows when the browser has navigator.share and shares the URL", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { share });
    await mountAstro(SHARE_BAR, PROPS);
    initShareBars();

    await page.getByRole("button", { name: "Share", exact: true }).click();

    expect(share).toHaveBeenCalledWith({
      title: "",
      url: "https://example.test/",
    });
  });

  test("a cancelled share changes nothing", async () => {
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException("cancelled", "AbortError"));
    vi.stubGlobal("navigator", { share });
    await mountAstro(SHARE_BAR, PROPS);
    initShareBars();
    const unhandled = vi.fn();
    window.addEventListener("unhandledrejection", unhandled);

    await page.getByRole("button", { name: "Share", exact: true }).click();

    expect(share).toHaveBeenCalledOnce();
    await expect.element(page.getByRole("status")).toHaveTextContent("");
    expect(unhandled).not.toHaveBeenCalled();
    window.removeEventListener("unhandledrejection", unhandled);
  });
});

describe("placement", () => {
  test("sits at the side of the Post at desktop width", async () => {
    await page.viewport(1280, 800);
    await mountInPostGrid();

    const links = page.getByRole("link").elements();
    const first = links[0].getBoundingClientRect();
    const last = links[links.length - 1].getBoundingClientRect();
    const body = page.getByTestId("body").element().getBoundingClientRect();

    expect(first.right).toBeLessThanOrEqual(body.left);
    expect(last.top).toBeGreaterThan(first.top);
    expect(last.left).toBeCloseTo(first.left, 0);
  });

  test("sits at the bottom of the screen at phone width", async () => {
    await page.viewport(390, 844);
    await mountInPostGrid();

    const links = page.getByRole("link").elements();
    const first = links[0].getBoundingClientRect();
    const last = links[links.length - 1].getBoundingClientRect();

    expect(first.bottom).toBeGreaterThan(844 - 80);
    expect(last.top).toBeCloseTo(first.top, 0);
    expect(last.left).toBeGreaterThan(first.left);
  });

  test("does not cover the end of the footer at phone width", async () => {
    await page.viewport(390, 844);
    await mountAstro(
      SHARE_BAR,
      PROPS,
      `<div>%s<div style="height:2000px">Body</div></div>`,
    );
    const footer = await mountAstro(FOOTER);
    window.scrollTo(0, document.body.scrollHeight);

    const bar = document.querySelector(".cjs-share-bar > div")!;
    const footerEnd = footer
      .querySelector("footer")!
      .lastElementChild!.getBoundingClientRect();

    expect(footerEnd.bottom).toBeLessThanOrEqual(
      bar.getBoundingClientRect().top,
    );
  });
});
