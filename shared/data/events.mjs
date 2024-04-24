import { getConnection } from "./connection.mjs"

const COLLECTION = "events"

async function findEvents({ query, limit = 100 } = {}) {
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    return await collection.find(query, { limit }).toArray()
}

async function findEvent({ query }) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.findOne(query)
}

async function upsertEvent() {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.updateOne(
    { _id: id },
    { $set: { name, email, profile_photo, oauth_payload }},
    { upsert: true }
  )
}

export {
  findEvents,
  findEvent,
  upsertEvent
}