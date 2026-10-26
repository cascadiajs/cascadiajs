import { test, expect } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";

test("an unknown Talk slug returns 404", async ({ request }) => {
  const response = await request.get(
    `/${FEATURED_EVENT}/talks/no-such-talk-slug`,
  );
  expect(response.status()).toBe(404);
});
