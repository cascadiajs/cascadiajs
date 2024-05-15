async function checkAuth({ session }) {
  //console.log(session)
  const authorized = !!(session.userId)
  if (!authorized) return { location: '/login' }
}

export const get = [ checkAuth, getHome ]

export async function getHome({ session }) {
  const { userId, userName, ticketId } = session
  //console.log(session)
  return {
    json: { userId, userName, ticketId }
  }
}