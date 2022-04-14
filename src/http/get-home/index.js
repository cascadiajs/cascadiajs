let arc = require('@architect/functions')
let HomeView = require('@architect/views/home')

async function unauthenticated(req) {
  if (!req.session.logged_in) {
    return {
      location: '/login'
    }
  }
}

/** render the speaker list/form */
async function authenticated(req) {
  let { session } = req
  return await HomeView({ session })
}

exports.handler = arc.http.async(unauthenticated, authenticated)

