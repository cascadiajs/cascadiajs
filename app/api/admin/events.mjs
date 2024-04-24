import { findEvents, upsertEvent } from "../../../shared/data/events.mjs"

export const get = [checkAuth, getEvents]
export const post = [checkAuth, saveEvent]

const { SECRET_PASSWORD } = process.env

async function checkAuth({ session, headers }) {
    const authorized = headers['x-cascadiajs-pass'] === SECRET_PASSWORD || !!(session.authorized)
    if (!authorized) return { location: '/admin/login' }
}

export async function getEvents() {
    const events = await findEvents()
    return {
        json: {
            events
        }
    }
}

export async function saveEvent({ body }) {
    const { _id, name } = body
    await upsertEvent({ _id, name } )
    return {
        location: '/admin/events'
    }
}
