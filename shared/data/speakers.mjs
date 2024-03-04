import { getConnection } from "./connection.mjs"

async function findSpeakers({ query, limit = 100 }) {
    const db = getConnection()
    const collection = await db.collection("speakers")
    return await collection.find(query, { limit }).toArray()
}

export {
    findSpeakers
}