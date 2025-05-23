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
        image: 'shruti-kapoor-illo.svg',
        company: '',
        location: 'Seattle, WA, USA',
        linkedin: 'https://www.linkedin.com/in/shrutikapoor08/',
        x: 'https://x.com/shrutikapoor08'
      }
    },
    {
      speaker : {
        name: 'Kent C. Dodds',
        image: 'kent-dodds-illo.svg',
        company: '',
        location: 'Salt Lake City, UT, USA',
        linkedin: 'https://www.linkedin.com/in/kentcdodds/',
        x: 'https://x.com/kentcdodds'
      }
    },
    {
      speaker: {
        name: 'Jack Herrington',
        image: 'jack-herrington-illo.svg',
        company: '',
        location: 'Portland, OR, USA',
        linkedin: 'https://www.linkedin.com/in/jherr/',
        x: 'https://x.com/jherr'
      }
    },
    {
      speaker: {
        name: 'Rachel Lee Nabors',
        image: 'rachel-lee-nabors-illo.svg',
        company: '',
        location: 'London, United Kingdom',
        linkedin: 'https://www.linkedin.com/in/rachelnabors/',
        x: 'https://x.com/rachelnabors'
      }
    },
    {
      speaker: {
        name: 'Peter-Paul Koch',
        image: 'ppk-illo.svg',
        company: '',
        location: 'Amsterdam, Netherlands',
        linkedin: 'https://www.linkedin.com/in/peter-paul-koch-b0b9/',
        x: 'https://x.com/ppk'
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
