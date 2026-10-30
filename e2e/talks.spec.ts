import { test, expect } from "@playwright/test";

test("an unknown Talk slug returns 404", async ({ request }) => {
  // The Featured Event's Talk pages live at the site root.
  const response = await request.get("/talks/no-such-talk-slug");
  expect(response.status()).toBe(404);
});
