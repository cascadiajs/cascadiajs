import { findUsers } from "../../../shared/data/users.mjs"
import organizers from "../../../shared/data/organizers.json" assert { type: "json" }
import talks from "../../../shared/data/2025/talks.json" assert { type: "json" }

export async function get({ path, query }) {
  // find all the attendees for CascadiaJS 2025
  const attendees = await findUsers({ query: {$and: [ { attending: '2025' } ] }, limit: 1000 })
  //console.log(attendees[0])

  const { social } = query
  // set social sharing info
  const sharing = {
    social,
    title: 'CascadiaJS 2025',
    image: '/_public/images/past/cjs19-family-photo.jpg',
    description: 'Coming up on Sept 18 - 19 in Seattle, WA!',
    sharingTitle: 'CascadiaJS 2025 | Sept 18 - 19 | Seattle, WA',
    sharingImage: '/_public/images/2025/social-sharing-general.png',
    sharingDescription: 'CascadiaJS 2025 is coming up Sept 18 - 19 in Seattle, WA!'
  }

  return {
    json: {
      path,
      talks,
      sharing,
      attendees,
      organizers: organizers["2025"],
      year: 2025,
    },
  };
}
