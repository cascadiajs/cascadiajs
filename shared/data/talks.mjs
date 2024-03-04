import { AstraDB } from '@datastax/astra-db-ts'
import { findSpeakers } from './speakers.mjs'
import { findEvents } from './events.mjs'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

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
    // get talks
    const talksCollection = await db.collection("talks")
    let talks = await talksCollection.find(query, { limit }).toArray()
    if (inflate) {
        talks = await inflateTalks(talks)
    }
    return talks
}

async function findTalk({ query, inflate = false }) {
    const talksCollection = await db.collection("talks")
    let talk = await talksCollection.findOne(query)
    if (inflate) {
        talk = (await inflateTalks([talk])).pop()
    }
    return talk
}

export {
    findTalks,
    findTalk
}
