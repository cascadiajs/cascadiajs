import { findEvent } from "../../../shared/data/events.mjs"
import { findTalks } from "../../../shared/data/talks.mjs"

export async function get(req) {
  // find the id for CascadiaJS 2024
  const event = await findEvent({ query: { slug: 'cascadiajs-2024' }})
  //console.log(event)
  // find all talks for CascadiaJS 2024
  const talks = await findTalks({ query: { event_id: event._id }, inflate: true})
  // return values
  const { path } = req;
  return {
    json: {
      path,
      talks,
    },
  };
}
