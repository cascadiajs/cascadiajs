import { test, expect } from "@playwright/test";
import { FEATURED_EVENT } from "@shared/site-defaults";

test("an unknown Sponsor slug returns 404", async ({ request }) => {
  const response = await request.get(
    `/${FEATURED_EVENT}/sponsors/no-such-sponsor`,
  );
  expect(response.status()).toBe(404);
});
