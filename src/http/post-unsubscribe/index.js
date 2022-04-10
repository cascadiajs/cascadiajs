let arc = require('@architect/functions')
let fetch = require('node-fetch')

exports.handler = arc.http.async(signup)

async function signup(req) {
  let { email_address } = req.body

  let profile = { unsubscribed: true }
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
  
  return { location: '/unsubscribed' }
}
