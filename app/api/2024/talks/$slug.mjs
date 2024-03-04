import { findEvent } from "../../../../shared/data/events.mjs"
import { findTalk } from "../../../../shared/data/talks.mjs"

export async function get({pathParameters, query, path}) {
  const { slug } = pathParameters
  const { social } = query

  // get ID for CascadiaJS 2024 event
  const event = await findEvent({query: { slug: "cascadiajs-2024"}})
  const event_id = event._id
  // get talk
  const talk = await findTalk({query: { event_id, slug }, inflate: true })  
  // set social sharing info
  const sharing = {
    social,
    title: talk.speaker.name,
    image: '/_public/images/speakers/' + talk.speaker.image,
    description: talk.short || talk.description,
    sharingTitle: 'CascadiaJS 2024 | Speakers | ' + talk.speaker.name,
    sharingImage: '/_public/images/sharing' + path + '.png',
    sharingDescription: talk.short || talk.description
  }
  return {
    json: {
      path,
      talk,
      sharing
    },
  }
}
