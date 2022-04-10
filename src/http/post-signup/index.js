let arc = require('@architect/functions')
let fetch = require('node-fetch')

exports.handler = arc.http.async(signup)

async function signup(req) {
  let { first_name, last_name, email_address, list, lists } = req.body
  // build profile object
  //let created_at = Math.floor(Date.now() / 1000) // set created_at to a Unix timestamp
  let unsubscribed = false // necessary if the person unsubscribed and is now trying to re-subscribe
  let profile = { first_name, last_name, unsubscribed }

  // if the mailing list web form was submitted, add subscriptions to profile object
  if (lists !== undefined) {
    // build a subscription object that reflects a timestamp (in seconds) for lists chosen, and null for lists omitted
    const LISTS = ['list-general', 'list-cascadiajs', 'list-seattlejs', 'list-pacnw'] // List of all possible list choices on the signup form
    let subscriptions = LISTS.reduce(
      (a, v) => (
        { ...a, [v]: (lists.indexOf(v) >= 0 ? Math.floor(Date.now() / 1000) : null)
      }), {})
    profile = { ...subscriptions, ...profile }
  }
  // set customer.io REST API headers
  let headers = {
    'Authorization': `Basic ${ Buffer.from(process.env.CIO_SITE_ID + ':' + process.env.CIO_API_KEY).toString('base64') }`,
    'Content-Type': 'application/json'
  }
  let res, url, body
  // set the payload for the create/update API call
  body = JSON.stringify(profile)
  // call REST API to update customer
  res = await fetch(`https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }`, {
    method: 'PUT', headers, body
  })
  // if a list parameter exists, send it as a sign-up event
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
    return { location: '/next-steps' }
  }
  else {
    return { json: { ok: true } }
  }
}
