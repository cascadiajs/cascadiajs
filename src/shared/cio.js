let fetch = require('node-fetch')

async function tracking_api({ method, url, body }) {
  // set customer.io REST API headers
  let headers = {
    'Authorization': `Basic ${ Buffer.from(process.env.CIO_SITE_ID + ':' + process.env.CIO_API_KEY).toString('base64') }`,
    'Content-Type': 'application/json'
  }
  console.log(method, headers, url, body)
  return await fetch(url, { method, headers, body })
}

async function app_api({ method, url, body }) {
    // set customer.io REST API headers
    let headers = {
      'Authorization': `Bearer ${ process.env.CIO_APP_KEY }`,
      'Content-Type': 'application/json'
    }
    return await fetch(url, { method, headers, body })
  }
  

module.exports = {
    tracking_api,
    app_api
}