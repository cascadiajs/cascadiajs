//import { findEvent } from "../../../shared/data/events.mjs"
//import { findTalks } from "../../../shared/data/talks.mjs"
//import { findUsers } from "../../../shared/data/users.mjs"
//import attendees from "../../../shared/data/users.json" assert { type: "json" };
import organizers from "../../../shared/data/organizers.json" assert { type: "json" }

export async function get({ path, query }) {
  // find the id for CascadiaJS 2024
  //const event = await findEvent({ slug: 'cascadiajs-2024' })
  //console.log(event)
  // find all talks for CascadiaJS 2024
  //const talks = await findTalks({ query: { event_id: event._id }, inflate: true})
  // find all the attendees for CascadiaJS 2024
  //const attendees = await findUsers({ query: {}, limit: 1000 })

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

  const talks = [
    {
      speaker: {
        name: 'Shruti Kapoor',
        image: 'shruti-kapoor.jpg',
        company: 'Educator & Content Creator',
        location: 'Seattle, WA'
      }
    },
    {
      speaker: {
        name: 'Kevin Whinnery',
        image: 'kevin-whinnery.jpg',
        company: 'Open AI',
        location: 'Minneapolis, MN'
      }
    },
    {
      speaker: {
        name: 'Brian Leroux',
        image: 'brian-leroux.jpg',
        company: 'Sanity',
        location: 'Nanaimo, BC'
      }
    },
    {
      speaker: {
        name: 'Rachel Lee Nabors',
        image: 'rachel-lee-nabors.jpg',
        company: 'TinyFish',
        location: 'London, UK'
      }
    }
  ]

  return {
    json: {
      path,
      talks,
      sharing,
      //attendees,
      organizers: organizers["2025"]
    },
  };
}
