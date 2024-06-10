import { findTicket } from '../../shared/data/tito.mjs'
import { findEvent } from '../../shared/data/events.mjs'

async function checkAuth({ session }) {
  //console.log(session)
  const authorized = !!(session.userId)
  if (!authorized) return { location: '/login' }
}

export const get = [ checkAuth, getHome ]

export async function getHome({ session }) {
  const { userId, userName, ticketId } = session
  const ticket = await findTicket({ _id: ticketId })
  const releaseId = ticket.release_id
  const event = await findEvent({ name: 'CascadiaJS 2024' })
  const playbackId = event.playbackId
  return {
    json: { userId, userName, ticketId, releaseId, playbackId }
  }
}