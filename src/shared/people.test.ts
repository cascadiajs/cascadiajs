import { describe, expect, it } from "vitest";
import { parsePeople, resolvePerson } from "@shared/people";

const person = (id: string, extra: object = {}) => ({
  id,
  name: id,
  image: "/events/2026/images/x.jpg",
  roles: ["speaker"],
  ...extra,
});

describe("parsePeople", () => {
  it("returns every Person in the registry", () => {
    const people = parsePeople(JSON.stringify([person("a"), person("b")]));
    expect(people.map((p) => p.id)).toEqual(["a", "b"]);
  });

  it("rejects two People with the same id", () => {
    const text = JSON.stringify([person("a"), person("b"), person("a")]);
    expect(() => parsePeople(text)).toThrow(/duplicate.*"a"/i);
  });

  it("accepts the author role and a plain-text bio", () => {
    const [p] = parsePeople(
      JSON.stringify([person("a", { roles: ["author"], bio: "Writes." })]),
    );
    expect(p.roles).toEqual(["author"]);
    expect(p.bio).toBe("Writes.");
  });

  it("rejects a Person without an id", () => {
    const noId: Partial<ReturnType<typeof person>> = person("a");
    delete noId.id;
    expect(() => parsePeople(JSON.stringify([noId]))).toThrow();
  });
});

describe("resolvePerson", () => {
  const registry = parsePeople(
    JSON.stringify([
      person("jo", {
        title: "Lead",
        company: "Acme",
        location: "Seattle",
        bio: "Hi.",
        pronouns: "she/her",
      }),
    ]),
  );

  it("returns the registry values when there are no overrides", () => {
    expect(resolvePerson(registry, { id: "jo" })).toEqual({
      name: "jo",
      image: "/events/2026/images/x.jpg",
      roles: ["speaker"],
      title: "Lead",
      company: "Acme",
      location: "Seattle",
      pronouns: "she/her",
    });
  });

  it("replaces an overridden field and keeps the rest from the registry", () => {
    const resolved = resolvePerson(registry, {
      id: "jo",
      overrides: { title: "Past Title", company: "Old Co" },
    });
    expect(resolved.title).toBe("Past Title");
    expect(resolved.company).toBe("Old Co");
    expect(resolved.location).toBe("Seattle");
    expect(resolved.name).toBe("jo");
    expect(resolved.pronouns).toBe("she/her");
  });

  it("does not expose the id or bio on the resolved Person", () => {
    const resolved = resolvePerson(registry, { id: "jo" });
    expect(resolved).not.toHaveProperty("id");
    expect(resolved).not.toHaveProperty("bio");
  });

  it("throws for an id that is not in the registry", () => {
    expect(() => resolvePerson(registry, { id: "nobody" })).toThrow(/"nobody"/);
  });
});
