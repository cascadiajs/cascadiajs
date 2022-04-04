let arc = require('@architect/functions')
let fetch = require('node-fetch')

exports.handler = arc.http.async(signup)

async function signup(req) {
  console.log(req.body)
  let { first_name, last_name, email_address, segment_id } = req.body
  
  // set customer.io REST API headers
  let headers = {
    'Authorization': `Basic ${ Buffer.from(process.env.CIO_SITE_ID + ':' + process.env.CIO_API_KEY).toString('base64') }`,
    'Content-Type': 'application/json'
  }
  let created_at = Math.floor(Date.now() / 1000)
  // set the payload for the create/update API call
  let payload = { created_at, first_name, last_name }
  // call REST API to create/update customer
  await fetch(`https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  })
  // if a segment_id exists, add this user to the segment
  if (segment_id !== undefined) {
    payload = {ids: [ email_address ]}
    let res = await fetch(`https://track.customer.io/api/v1/segments/${ segment_id }/add_customers?id_type=email`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
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
