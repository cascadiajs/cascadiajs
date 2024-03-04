import { getConnection } from "./connection.mjs"

async function findEvents({ query, limit = 100 }) {
    const db = getConnection()
    const collection = await db.collection("events")
    return await collection.find(query, { limit }).toArray()
}

async function findEvent({ query }) {
  const db = getConnection()
  const collection = await db.collection("events")
  return await collection.findOne(query)
}

export {
  findEvents,
  findEvent
}