//import { findEvent } from "../../../shared/data/events.mjs"
//import { findTalks } from "../../../shared/data/talks.mjs"
import talks from "../../../shared/data/2026/talks.json" with { type: "json" }

export async function get({ path, query }) {
  // find the id for CascadiaJS 2024
  //const event = await findEvent({ slug: 'cascadiajs-2024' })
  //console.log(event)
  // find all talks for CascadiaJS 2024
  //const talks = await findTalks({ query: { event_id: event._id }, inflate: true})
  // return values
  const { social } = query
  // set social sharing info
  const sharing = {
    social,
    title: 'CascadiaJS 2026 - Schedule',
    image: '/_public/images/past/cjs19-family-photo.jpg',
    description: 'Coming up on June 1 - 2 in Seattle, WA!',
    sharingTitle: 'CascadiaJS 2026 | June 1 - 2 | Seattle, WA',
    sharingImage: '/_public/images/2026/social-sharing-general.png',
    sharingDescription: 'CascadiaJS 2026 is coming up June 1 - 2 in Seattle, WA!'
  }

  return {
    json: {
      path,
      talks,
      sharing
    },
  };
}
