import { getConnection } from "./connection.mjs"

const COLLECTION = "tito"

async function findTickets({ query, limit = 100 } = {}) {
    const db = getConnection()
    query._type = "ticket"
    const collection = await db.collection(COLLECTION)
    return await collection.find(query, { limit }).toArray()
}

async function findTicket(query) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  //console.log(query)
  return await collection.findOne(query)
}

async function upsertTicket({ _id, reference, release_id, release_title, release_slug, number, event_id, event_title, full_name, email, user_id }) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  if (_id) {
    await collection.updateOne(
      { _id },
      { $set: { _type: "ticket", reference, release_id, release_title, release_slug, number, event_id, event_title, full_name, email, user_id }}
    )
  }
  else {
    await collection.insertOne({ _type: "ticket", reference, release_id, release_title, release_slug, number, event_id, event_title, full_name, email, user_id })  
  }
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

async function deleteAllTickets() {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.deleteMany({ _type: "ticket" })
}

export {
  findTickets,
  findTicket,
  upsertTicket,
  deleteTicket,
  insertTickets,
  deleteAllTickets
}