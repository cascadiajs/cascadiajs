/**
 * Test-only fixtures. They load only when the test-build environment
 * variable is set (Playwright sets it for its build and in its own process).
 * A production build never includes them. Pure on purpose: the content
 * config, the Event data module and the e2e helpers all import it.
 */
import process from "node:process";
import type { PersonRef } from "./people";

/** The environment variable that turns fixtures on. */
export const TEST_FIXTURES_ENV = "CJS_TEST_FIXTURES";

export const TEST_FIXTURES = process.env[TEST_FIXTURES_ENV] === "1";

/** Fixture Posts live here; the `blog` Collection adds them under the flag. */
export const FIXTURE_POSTS_DIR = "blog-fixtures";
/** Fixture Authors, merged into the Person registry under the flag. */
export const FIXTURE_PEOPLE_FILE = "./src/shared/data/fixtures/people.json";
/** Event overrides to add under the flag: `{ [year]: { [personId]: overrides } }`. */
export const FIXTURE_OVERRIDES_FILE =
  "./src/shared/data/fixtures/organizer-overrides.json";

export type FixtureOverrides = Record<
  string,
  Record<string, NonNullable<PersonRef["overrides"]>>
>;

/**
 * Add fixture overrides to one Event's Organizer references. A reference
 * keeps any overrides it already has; fixture values win on a clash.
 */
export function applyFixtureOverrides(
  refs: readonly PersonRef[],
  year: string,
  fixtures: FixtureOverrides,
): PersonRef[] {
  const forYear = fixtures[year] ?? {};
  return refs.map((ref) =>
    forYear[ref.id]
      ? { ...ref, overrides: { ...ref.overrides, ...forYear[ref.id] } }
      : ref,
  );
}
