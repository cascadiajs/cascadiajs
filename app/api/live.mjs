async function checkAuth({ session }) {
  //console.log(session)
  const authorized = !!(session.userId)
  if (!authorized) return { location: '/login' }
}

export const get = [checkAuth, getLive]

export async function getLive({ session }) {
  const { userId, userName } = session
  //console.log(userId, userName)
  return {
    json: { userId, userName }
  }
}