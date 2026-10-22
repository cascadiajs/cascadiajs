# People Live in One Registry with Per-Event Overrides

Every Person the site credits (Speakers, Organizers and Authors) lives once in `src/shared/data/people.json`, loaded as a `people` Collection. Talks, organizer lists and Posts reference a Person by `id`. A Talk or organizer entry can add an `overrides` object for the details that were true only at that Event (`title`, `company`, `location`, `image`). Posts have no overrides. With one registry, maintainers edit a Person who is both a Speaker and an Author in one place, and a correction reaches every page.

The `id` is a hand-written kebab-case of the name (`carter-rabasa`) and doubles as the Author page slug. We did not use UUIDs. With kebab-case ids, references stay readable in Posts and Talks, and maintainers need no tool to add a Person. A short parser on the `people` Collection fails the build on a duplicate `id`, because Astro's `file()` loader only warns and lets the later entry replace the earlier one. The site-wide `prerenderConflictBehavior: "error"` was rejected because it also fails on existing route conflicts such as `/2026/schedule`.

## Considered Options

- **People inline in each Talk and organizer list (the status quo).** A Person who is also an Author would be maintained twice.
- **A blog-only Author dataset.** Same duplication, limited to the blog.
- **UUID ids with a separate `slug` field.** Survives a name change, but references become unreadable, each new Person needs a generated UUID, and the `slug` still needs its own uniqueness check.

## Consequences

`roles` stays on the Person and gains `author`. The build does not fail when the roles of a Person disagree with the references to that Person. Frozen Snapshots keep their inline people (ADR-0008). Person images may still point at Event asset folders until a later change moves them to one shared folder.
