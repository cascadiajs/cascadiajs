import { describe, expect, it } from "vitest";
import { applyFixtureOverrides } from "./test-fixtures";

describe("applyFixtureOverrides", () => {
  const refs = [{ id: "a" }, { id: "b", overrides: { company: "Old" } }];

  it("adds an override to the matching Person in that year", () => {
    expect(
      applyFixtureOverrides(refs, "2026", { "2026": { a: { title: "T" } } }),
    ).toEqual([{ id: "a", overrides: { title: "T" } }, refs[1]]);
  });
  it("keeps existing overrides and ignores other years", () => {
    expect(
      applyFixtureOverrides(refs, "2026", {
        "2026": { b: { title: "T" } },
        "2027": { a: { title: "X" } },
      }),
    ).toEqual([
      refs[0],
      { id: "b", overrides: { company: "Old", title: "T" } },
    ]);
  });
});
