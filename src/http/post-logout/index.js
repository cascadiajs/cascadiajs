let arc = require('@architect/functions')

exports.handler = arc.http.async(logout)

async function logout(req) {
  return { session: {}, location: '/login' }
}
