import slugify from 'slugify'
import { getConnection } from "./connection.mjs"
import { findSpeakers } from './speakers.mjs'
import { findEvents } from './events.mjs'

const COLLECTION = "talks"

async function inflateTalks(talks) {
    // get speakers for these talks
    const speakers = await findSpeakers({
        _id: {
            "$in": talks.map(t => t.speaker_id)
        }
    })
    // get events for these talks
    const events = await findEvents({
        _id: {
            "$in": talks.map(t => t.event_id)
        }
    })
    // inflate talks with speaker/event data
    return talks.map((t) => { 
        return {
            speaker: speakers.find(s => s._id === t.speaker_id),
            event: events.find(e => e._id === t.event_id),
            ...t
    }})
}

async function findTalks({ query, limit = 100, inflate = false }) {
    const db = getConnection()
    // get talks
    const talksCollection = await db.collection(COLLECTION)
    let talks = await talksCollection.find(query, { limit }).toArray()
    if (inflate) {
        talks = await inflateTalks(talks)
    }
    return talks
}

async function findTalk({ query, inflate = false }) {
    const db = getConnection()
    const talksCollection = await db.collection(COLLECTION)
    let talk = await talksCollection.findOne(query)
    if (inflate) {
        talk = (await inflateTalks([talk])).pop()
    }
    return talk
}

async function upsertTalk(talk) {
    const { _id, title, abstract, tags, short, event_id, speaker_id } = talk
    let tagsArray
    let slug
    if (tags && tags !== "") {
        tagsArray = tags.split(',').map(t => t.trim())
    }
    if (title) {
        slug = slugify(title, { lower: true, strict: true })
    }
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    let response
    if (_id) {
        response = collection.updateOne({ _id }, { $set: { title, abstract, slug, tags: tagsArray, short, event_id, speaker_id } })
    }
    else {
        response = await collection.insertOne({ title, abstract, slug, tags: tagsArray, short, event_id, speaker_id })
    }
    return response
}

async function deleteTalk(_id) {
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    return await collection.deleteOne({ _id })
}


export {
    findTalks,
    findTalk,
    upsertTalk,
    deleteTalk
}
