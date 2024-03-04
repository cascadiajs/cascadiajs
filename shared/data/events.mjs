import { AstraDB } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

async function findEvents({ query, limit = 100 }) {
    const collection = await db.collection("events")
    return await collection.find(query, { limit }).toArray()
}

async function findEvent({ query }) {
  const collection = await db.collection("events")
  return await collection.findOne(query)
}

export {
  findEvents,
  findEvent
}