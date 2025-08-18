import { findTicket } from '../../shared/data/tito.mjs'

export async function get({ query }) {
  const { error } = query
  return {
    json: { error }
  }
}

export async function post({ body }) {
  const { ticketRef } = body
  //console.log(ticketRef)
  // look-up ticketRef in database, if found set session
  // HARD CODED FOR CASCADIAJS 2025
  const doc = await findTicket({ reference: ticketRef, event_id: '1143718' })
  if (doc) {
    //console.log(doc)
    return {
      location: "/login",
      session: { ticketId: doc._id }
    }
  }
  else {
    return {
      location: "/signup?error=invalid-ticket"
    }
  }
}
