/**
 * PROTOTYPE, throwaway. Fake blog data for the "What should the blog look
 * like?" prototype (issue #55). Never merge to main.
 */
import type { ImageMetadata } from "astro";
import family from "@assets/images/cjs19-family-photo.jpg";
import stickers from "@assets/images/cjs18-pronoun-stickers.jpg";
import moon from "@assets/images/cjs26-moon-highway.jpg";
import kimpton from "@assets/images/cjs25-kimpton-seattle.jpg";
import adamStage from "@assets/images/cjs25-adam.jpg";
import moovweb from "@assets/images/cjs19-moovweb.jpg";
import monaco from "@assets/images/cjs24-kimpton-hotel-monaco.jpg";
import carterImg from "@assets/events/2026/images/carter-rabasa.jpg";
import adamImg from "@assets/events/2026/images/adam-argyle.jpg";
import kateImg from "@assets/events/2026/images/kate-pond.jpg";

export interface ProtoAuthor {
  id: string;
  name: string;
  image: ImageMetadata;
  pronouns?: string;
  title?: string;
  company?: string;
  location?: string;
  url?: string;
  bio?: string;
  social: {
    type: "bluesky" | "linkedin" | "github" | "x-twitter";
    url: string;
  }[];
}

export interface ProtoPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  author: ProtoAuthor;
  tags: string[];
  featured: boolean;
  image?: ImageMetadata;
  minutes: number;
}

export const authors: Record<string, ProtoAuthor> = {
  "carter-rabasa": {
    id: "carter-rabasa",
    name: "Carter Rabasa",
    image: carterImg,
    pronouns: "he/him",
    title: "Lead Organizer",
    company: "CascadiaJS",
    location: "Seattle, WA USA",
    url: "https://carter.rabasa.com",
    bio: "Carter has organized CascadiaJS since 2012. When he isn't wrangling venues and speakers he's probably on a ferry somewhere in the Salish Sea.",
    social: [
      { type: "bluesky", url: "https://bsky.app/profile/carter.rabasa.com" },
      { type: "linkedin", url: "https://linkedin.com/in/carterrabasa" },
      { type: "github", url: "https://github.com/crabasa" },
    ],
  },
  "adam-argyle": {
    id: "adam-argyle",
    name: "Adam Argyle",
    image: adamImg,
    pronouns: "he/him",
    title: "Co-Emcee",
    location: "Seattle, WA USA",
    url: "https://nerdy.dev",
    bio: "CSS enthusiast, emcee, and maker of very colorful demos.",
    social: [
      { type: "bluesky", url: "https://bsky.app/profile/nerdy.dev" },
      { type: "github", url: "https://github.com/argyleink" },
    ],
  },
  "kate-pond": {
    id: "kate-pond",
    name: "Kate Pond",
    image: kateImg,
    title: "Networking Lead",
    location: "Seattle, WA USA",
    social: [{ type: "linkedin", url: "https://linkedin.com/in/example" }],
  },
};

const a = authors;

export const posts: ProtoPost[] = [
  {
    slug: "announcing-cascadiajs-2027",
    title: "Announcing CascadiaJS 2027",
    description:
      "Dates, a new venue and a call for speakers: everything we know so far about next year's conference.",
    pubDate: new Date("2026-10-08"),
    author: a["carter-rabasa"],
    tags: ["announcements", "cascadiajs-2027"],
    featured: true,
    image: moon,
    minutes: 4,
  },
  {
    slug: "view-transitions-in-the-real-world",
    title: "View transitions in the real world",
    description:
      "What we learned shipping cross-document view transitions on a conference site with zero client framework.",
    pubDate: new Date("2026-09-30"),
    author: a["adam-argyle"],
    tags: ["css", "astro"],
    featured: true,
    image: adamStage,
    minutes: 9,
  },
  {
    slug: "scholarship-recipients-2026",
    title: "Meet the 2026 scholarship recipients",
    description:
      "Twenty-four people joined us on scholarship this year. Here are a few of their stories.",
    pubDate: new Date("2026-09-12"),
    author: a["kate-pond"],
    tags: ["community", "scholarships"],
    featured: true,
    image: family,
    minutes: 6,
  },
  {
    slug: "how-we-pick-talks",
    title: "How we pick talks",
    description:
      "A look inside the CFP review: blind scoring, the second pass, and why we save room for first-time speakers.",
    pubDate: new Date("2026-08-21"),
    author: a["carter-rabasa"],
    tags: ["cfp", "speaking"],
    featured: false,
    image: stickers,
    minutes: 7,
  },
  {
    slug: "hotel-block-tips",
    title: "Booking the hotel block without the headache",
    description:
      "Discount codes, cutoff dates and the one neighborhood we recommend for walking to the venue.",
    pubDate: new Date("2026-07-02"),
    author: a["kate-pond"],
    tags: ["travel"],
    featured: false,
    image: kimpton,
    minutes: 3,
  },
  {
    slug: "porting-the-site-to-astro",
    title: "Porting cascadiajs.com to Astro",
    description:
      "Fourteen years of conference sites, one content collection at a time.",
    pubDate: new Date("2026-06-15"),
    author: a["adam-argyle"],
    tags: ["astro", "behind-the-scenes"],
    featured: false,
    minutes: 12,
  },
  {
    slug: "a-look-back-at-2019",
    title: "A look back at 2019",
    description:
      "Seven years later, the talks that still hold up and the hallway track that started it all.",
    pubDate: new Date("2026-05-28"),
    author: a["carter-rabasa"],
    tags: ["community", "history"],
    featured: false,
    image: moovweb,
    minutes: 5,
  },
  {
    slug: "sponsor-spotlight-q2",
    title: "Sponsor spotlight: spring edition",
    description:
      "The companies that make the conference possible, and what they're building this year.",
    pubDate: new Date("2026-04-10"),
    author: a["kate-pond"],
    tags: ["sponsors"],
    featured: false,
    image: monaco,
    minutes: 4,
  },
];

export const featured = posts.filter((p) => p.featured).slice(0, 3);
export const list = posts.filter((p) => !featured.includes(p));
export const post = posts[1];
export const tag = "astro";
export const tagged = posts.filter((p) => p.tags.includes(tag));
export const author = authors["carter-rabasa"];
export const byAuthor = posts.filter((p) => p.author.id === author.id);
export const query = "astro";
export const results = posts.filter(
  (p) =>
    p.title.toLowerCase().includes(query) ||
    p.tags.includes(query) ||
    p.author.name.toLowerCase().includes(query),
);
export const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const shareLinks = (url: string, title: string) => [
  {
    label: "Bluesky",
    icon: "fa-brands fa-bluesky",
    href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "X",
    icon: "fa-brands fa-x-twitter",
    href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
];

export const sampleCode = `---
import { getCollection } from "astro:content";

const posts = (await getCollection("blog", ({ data }) => data.published))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<ul>
  {posts.map((post) => <li><a href={\`/blog/post/\${post.id}\`}>{post.data.title}</a></li>)}
</ul>`;
