let arc = require('@architect/functions')
let { app_api } = require('@architect/shared/cio')

exports.handler = arc.http.async(verify)

async function verify(req) {
  let { email_address, token } = req.queryStringParameters
  // look up activities by email_address
  let query = new URLSearchParams()
  query.append('id_type', 'email')
  query.append('type', 'event')
  query.append('name', 'login-attempt')
  let url = `https://api.customer.io/v1/customers/${ encodeURIComponent(email_address) }/activities?${ query }`
  let res = await app_api({ method: 'GET', url })
  let obj = await res.json()
  let response
  // if there is a valid response from the API
  if (obj.activities) {
    let activities = obj.activities
      .filter(a => a.timestamp > (Date.now() / 1000) - 60*5) // scrub login-token events more than 5 minutes old
      .sort((a, b) => { return b.timestamp - a.timestamp}) // sort in reserve chron order
    if (activities.length > 0 && activities[0].data.token === token) {
      // set session
      response = { location: '/home' }
    }
    else {
      response = { location: "/error?m=no-token-found" }
    }
  }
  else {
    console.log(obj)
    response = { location: "/error?m=unknown" }
  }

  return response
}
