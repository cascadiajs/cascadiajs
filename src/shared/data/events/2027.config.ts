import type { EventConfig } from "../types";
import { DEFAULT_DESCRIPTION } from "../../site-defaults";

const config: EventConfig = {
  name: "CascadiaJS 2027",
  year: "2027",
  dates: "June 7-8, 2027",
  venue: "Seattle Convention Center",
  location: "Seattle, WA, USA",
  logo: "/events/2026/images/icon-dark-blue.png",
  ogImage: "/images/2027/share/social-sharing-general.png",
  ogDescription: DEFAULT_DESCRIPTION,
  nav: [
    { label: "Networking", href: "/2027#networking" },
    { label: "Pricing", href: "/2027#pricing" },
    //{ label: "Speakers", href: "/2026#speakers" },
    //{ label: "Schedule", href: "/2026/schedule" },
    //{ label: "Attend", href: "/2026/attend" },
    { label: "CFP", href: "/2027/cfp" },
    { label: "Sponsor", href: "/2027/sponsor" },
    //{ label: "Trainings", href: "/2026/trainings" },
    { label: "Tickets", href: "/2027/tickets", isCta: true },
  ],
  cta: { label: "Buy Tickets", href: "/2027/tickets" },
};

export default config;
