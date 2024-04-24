async function checkAuth({ session, headers }) {
  const authorized = !!(session.id)
  if (!authorized) return { location: '/login' }
}

export const get = [checkAuth, getLive]

export async function getLive(req) {
  return {
    json: {
      foo: "bar"      
    }
  }
}