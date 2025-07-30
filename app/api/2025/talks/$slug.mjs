//import { findEvent } from "../../../../shared/data/events.mjs"
//import { findTalk } from "../../../../shared/data/talks.mjs"
import talks from "../../../../shared/data/2025/talks.json" assert { type: "json" }

export async function get({pathParameters, query, path}) {
  const { slug } = pathParameters
  const { social } = query

  // get talk
  const talk = talks.find(t => t.slug === slug)
  if (!talk) {
    return {
      status: 404,
      json: { error: 'Talk not found' }
    }
  }
  // set social sharing info
  const sharing = {
    social,
    title: talk.speaker.name,
    image: '/_public/images/speakers/' + talk.speaker.image,
    description: talk.title,
    sharingTitle: 'CascadiaJS 2025 | Speakers | ' + talk.speaker.name,
    //sharingImage: '/_public/images/sharing' + path + '.png',
    sharingImage: `/_public/images/2025/social/social-speaker-${talk.speaker.slug}.png`,
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
