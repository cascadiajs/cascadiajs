//import { findEvent } from "../../../shared/data/events.mjs"
//import { findTalks } from "../../../shared/data/talks.mjs"
import talks from "../../../shared/data/2025/talks.json" assert { type: "json" }

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
    title: 'CascadiaJS 2025 - Schedule',
    image: '/_public/images/past/cjs19-family-photo.jpg',
    description: 'Coming up on Sept 18 - 19 in Seattle, WA!',
    sharingTitle: 'CascadiaJS 2025 | Sept 18 - 19 | Seattle, WA',
    sharingImage: '/_public/images/sharing' + path + '.png',
    sharingDescription: 'CascadiaJS 2025 is coming up Sept 18 - 19 in Seattle, WA!'
  }

  return {
    json: {
      path,
      talks,
      sharing
    },
  };
}
