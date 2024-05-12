import * as crypto from "crypto"
import { deleteTicket, findTicket, upsertTicket } from "../../../shared/data/tito.mjs" 

export const post = async function(req) {
  //console.log(req)
  // authenticate the token passed in the header
  let titoSig = req.headers['Tito-Signature'] || req.headers['tito-signature']
  let hash = crypto.createHmac("sha256", process.env.TITO_WEBHOOK_KEY).update(req.rawBody).digest("base64")
  // the hash of the POST body and the value of tito sig don't match, this is a bad request
  if (hash !== titoSig) {
    console.log('ERROR!!! the Tito sig and the calculated hash value did not match ', process.env.TITO_WEBHOOK_KEY, titoSig, hash)
    return {
      statusCode: 401,
      json: { message: "not authorized" }
    }
  }
  // else, let's process the webhook!
  else {
    let action = req.headers['x-webhook-name'] || req.headers['X-Webhook-Name']
    // payment for the ticket has occurred
    if (action === 'registration.finished') {
      //console.log('processing registration.finished webhook')
      return registrationFinished(req)
    }
    // update the full name associated with ticket(s)
    else if (action === 'ticket.completed' || action === 'ticket.updated') {
      //console.log('processing ticket.completed or ticket.updated webhook')
      return ticketCompletedOrUpdated(req)
    }
    // delete voided tickets
    else if (action === 'ticket.voided') {
      //console.log('processing ticket.voided webhook')
      return ticketVoided(req)
    }
    else {
      console.log('unsupported webhook')
      console.log(req.body)
      return {
        statusCode: 400,
        json: { message: "unsupported webhook" }
      }
    }
  }
}

async function registrationFinished(req) {
  let registation_payload = req.body
  const { event } = registation_payload
  const { id: event_id, title: event_title} = event
  // an order can include multiple tickets, write ticket data to the DB
  for (let ticket of registation_payload.tickets) {
    const { reference, release_id, release_title, release_slug } = ticket
    const number = parseInt(registation_payload.receipt.number)
    await upsertTicket({ reference, release_id, release_title, release_slug, number, event_id, event_title })
  }

  return {
    statusCode: 201,
    json: { success: true }
  }
}

async function ticketCompletedOrUpdated(req) {
  const tito_payload = req.body
  const ticket = await findTicket({ reference: tito_payload.reference })
  const _id = ticket._id
  const { name: full_name, email } = tito_payload
  // update the name and email associated with this ticket
  await upsertTicket({ _id, full_name, email })
  return {
    statusCode: 200,
    json: { success: true }
  }
}

async function ticketVoided(req) {
  let tito_payload = req.body
  const ticket = await findTicket({ reference: tito_payload.reference })
  const _id = ticket._id
  // delete the ticket
  await deleteTicket(_id)
  return {
    statusCode: 200,
    json: { success: true }
  }
}
