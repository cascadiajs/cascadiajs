let arc = require('@architect/functions')
let fetch = require('node-fetch')

exports.handler = arc.http.async(signup)

async function signup(req) {
  let { first_name, last_name, email_address } = req.body
  // call customer.io API to create/update person
  let created_at = Math.floor(Date.now() / 1000)
  let payload = { created_at, first_name, last_name }
  let response = await fetch(`https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }`, {
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${ Buffer.from(process.env.CIO_SITE_ID + ':' + process.env.CIO_API_KEY).toString('base64') }`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })
  // redirect to /signup-next-steps
  let location = '/signup-next-steps'
  return { location }
}
