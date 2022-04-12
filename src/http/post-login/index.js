let arc = require('@architect/functions')
let { tracking_api } = require('@architect/shared/cio')

exports.handler = arc.http.async(login)

async function login(req) {
  let { email_address } = req.body
  // create a 6 digit token
  let token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  // send event
  let name = 'login-attempt'
  let type = 'event'
  let data = { token }
  let body = JSON.stringify({ name, type, data })
  let url = `https://track.customer.io/api/v1/customers/${ encodeURIComponent(email_address) }/events`
  let res = await tracking_api({ method: 'POST', url, body })
  console.log(res)
  return { location: '/check-email' }
}
