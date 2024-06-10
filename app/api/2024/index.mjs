import { findEvent } from "../../../shared/data/events.mjs"
import { findTalks } from "../../../shared/data/talks.mjs"
import { findUsers } from "../../../shared/data/users.mjs"

export async function get({ path, query }) {
  // find the id for CascadiaJS 2024
  const event = await findEvent({ slug: 'cascadiajs-2024' })
  //console.log(event)
  // find all talks for CascadiaJS 2024
  const talks = await findTalks({ query: { event_id: event._id }, inflate: true})
  // find all the attendees for CascadiaJS 2024
  const attendees = await findUsers({ query: {}, limit: 1000 })
  const { social } = query
  // set social sharing info
  const sharing = {
    social,
    title: 'CascadiaJS 2024',
    image: '/_public/images/past/cjs19-family-photo.jpg',
    description: 'Coming up on June 19 - 22 in Seattle, WA!',
    sharingTitle: 'CascadiaJS 2024 | June 19 - 22 | Seattle, WA',
    sharingImage: '/_public/images/sharing' + path + '.png',
    sharingDescription: 'CascadiaJS 2024 is coming up June 19 - 22 in Seattle, WA!'
  }

  return {
    json: {
      path,
      talks,
      sharing,
      attendees
    },
  };
}
