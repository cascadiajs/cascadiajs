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
  const doc = await findTicket({ _id: ticketRef })
  if (doc) {
    //console.log(doc)
    return {
      location: "/login",
      session: { ticketRef }
    }
  }
  else {
    return {
      location: "/signup?error=invalid-ticket"
    }
  }
}
