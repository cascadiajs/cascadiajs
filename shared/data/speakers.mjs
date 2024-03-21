import { getConnection } from "./connection.mjs"

async function findSpeakers({ query, limit = 100 }) {
    const db = getConnection()
    const collection = await db.collection("speakers")
    return await collection.find(query, { limit }).toArray()
}

async function upsertSpeaker(speaker) {
    const { _id, name, image, url, twitter } = speaker
    const db = getConnection()
    const collection = await db.collection("speakers")
    if (_id) {
        await collection.updateOne({ _id }, { $set: { name, image, url, twitter } })
    }
    else {
        await collection.insertOne({ name, image, url, twitter })
    }
}

export {
    findSpeakers,
    upsertSpeaker
}