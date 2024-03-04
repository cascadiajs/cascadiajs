import { AstraDB } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

async function findSpeakers({ query, limit = 100 }) {
    const collection = await db.collection("speakers")
    return await collection.find(query, { limit }).toArray()
}

export {
    findSpeakers
}