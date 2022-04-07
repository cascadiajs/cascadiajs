let arc = require('@architect/functions')
let fetch = require('node-fetch')

exports.handler = arc.http.async(signup)

async function signup(req) {
  let { first_name, last_name, email_address, list } = req.body
  // set customer.io REST API headers
  let headers = {
    'Authorization': `Basic ${ Buffer.from(process.env.CIO_SITE_ID + ':' + process.env.CIO_API_KEY).toString('base64') }`,
    'Content-Type': 'application/json'
  }
  let res, url, body
  // set the payload for the create/update API call
  let created_at = Math.floor(Date.now() / 1000)
  body = JSON.stringify({ created_at, first_name, last_name })
  // call REST API to update customer
  res = await fetch(`https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }`, {
    method: 'PUT', headers, body
  })
  // if a list exists, add this user to the segment
  if (list !== undefined) {
    let name = "sign-up"
    let type = "event"
    let data = { list }
    body = JSON.stringify({ name, type, data })
    url = `https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }/events`
    res = await fetch(url, {
      method: 'POST', headers, body
    })
  }
  // if a form request, redirection to next steps
  if (req.headers['content-type'] !== 'application/json') {
    return { location: '/signup-next-steps' }
  }
  else {
    return { json: { ok: true } }
  }
}
