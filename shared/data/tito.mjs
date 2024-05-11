import { getConnection } from "./connection.mjs"

const COLLECTION = "tito"

async function findTickets({ query, limit = 100 } = {}) {
    const db = getConnection()
    query._type = "ticket"
    const collection = await db.collection(COLLECTION)
    return await collection.find(query, { limit }).toArray()
}

async function findTicket({ query }) {
  const db = getConnection()
  query._type = "ticket"
  const collection = await db.collection(COLLECTION)
  return await collection.findOne(query)
}

async function upsertTicket({ _id, release_id, release_title, release_slug, ticket_number, event_id, event_title, full_name, email }) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.updateOne(
    { _id },
    { $set: { _type: "ticket", release_id, release_title, release_slug, ticket_number, event_id, event_title, full_name, email }},
    { upsert: true }
  )
}

async function insertTickets(tickets) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.insertMany(tickets.map(t => ({ _type: "ticket", ...t })))
}

async function deleteTicket(_id) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.deleteOne({ _id })
}

export {
  findTickets,
  findTicket,
  upsertTicket,
  deleteTicket,
  insertTickets
}