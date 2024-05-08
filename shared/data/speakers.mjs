import { getConnection } from "./connection.mjs"

const COLLECTION = "speakers"

async function findSpeakers({ query, limit = 200 }) {
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    return await collection.find(query, { limit }).toArray()
}

async function upsertSpeaker(speaker) {
    const { _id, slug, name, image, url, twitter, company, location, pronouns } = speaker
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    let response
    if (_id) {
        response = await collection.updateOne({ _id }, { $set: { slug, name, image, url, twitter, company, location, pronouns } })
    }
    else {
        response = await collection.insertOne({ slug, name, image, url, twitter, company, location, pronouns })
    }
    return response
}

async function deleteSpeaker(_id) {
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    return await collection.deleteOne({ _id })
}

export {
    findSpeakers,
    upsertSpeaker,
    deleteSpeaker
}