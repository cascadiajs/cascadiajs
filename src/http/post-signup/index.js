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
  let payload, res, url, body
  // set the payload for the create/update API call
  let created_at = Math.floor(Date.now() / 1000)
  payload = { created_at, first_name, last_name }
  // call REST API to update customer
  res = await fetch(`https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  })
  console.log(await res.text())

  // if a segment_id exists, add this user to the segment
  if (segment_id !== undefined) {
    payload = {ids: [ email_address ]}
    url = `https://track.customer.io/api/v1/segments/${ segment_id }/add_customers?id_type=email`
    console.log(url)
    body = JSON.stringify(payload)
    console.log(body)
    res = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })
    console.log(await res.text())
  }
  // if a form request, redirection to next steps
  if (req.headers['content-type'] !== 'application/json') {
    return { location: '/signup-next-steps' }
  }
  else {
    return { json: { ok: true } }
  }
}
