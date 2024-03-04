import { AstraDB } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  SECRET_PASSWORD
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

export const get = [checkAuth, getEvents]
export const post = [checkAuth, saveEvent]

async function checkAuth({ session, headers }) {
    const authorized = headers['x-cascadiajs-pass'] === SECRET_PASSWORD || !!(session.authorized)
    if (!authorized) return { location: '/login' }
}

export async function getEvents() {
    const eventsCollection = await db.collection("events")
    const events = await eventsCollection.find().toArray()
    return {
        json: {
            events
        }
    }
}

export async function saveEvent({ body }) {
    const { _id, name } = body
    const eventsCollection = await db.collection("events")
    await eventsCollection.updateOne({ _id }, { $set: { name } })
    return {
        location: '/admin/events'
    }
}
