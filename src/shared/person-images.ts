import type { ImageMetadata } from "astro";

/**
 * The glob that loads Person images. It covers `src/assets/people/` and
 * `src/assets/events/`. Keys look like `./people/jane-doe.jpg`, so a Person's
 * `image` string with a leading dot is the key. `import.meta.glob` needs
 * literal arguments, so every component imports this one glob.
 */
export const personImages = import.meta.glob<{ default: ImageMetadata }>(
  ["@assets/people/**/*.{jpg,png,jpeg}", "@assets/events/**/*.{jpg,png,jpeg}"],
  { eager: false, base: "/src/assets" },
);
