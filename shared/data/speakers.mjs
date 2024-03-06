import { getConnection } from "./connection.mjs"

async function findSpeakers({ query, limit = 100 }) {
    const db = getConnection()
    const collection = await db.collection("speakers")
    return await collection.find(query, { limit }).toArray()
}

async function upsertSpeaker(speaker) {
    const { _id, name, url, twitter } = speaker
    const db = getConnection()
    const collection = await db.collection("speakers")
    await collection.updateOne({ _id }, { $set: { name, url, twitter } })
}

export {
    findSpeakers,
    upsertSpeaker
}