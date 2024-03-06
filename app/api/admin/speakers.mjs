import { findSpeakers, upsertSpeaker } from "../../../shared/data/speakers.mjs"

export const get = [checkAuth, getSpeakers]
export const post = [checkAuth, saveSpeaker]

const { SECRET_PASSWORD } = process.env

async function checkAuth({ session, headers }) {
    const authorized = headers['x-cascadiajs-pass'] === SECRET_PASSWORD || !!(session.authorized)
    if (!authorized) return { location: '/login' }
}

export async function getSpeakers({ query }) {
    return {
        json: {
            speakers: await findSpeakers({ query })
        }
    }
}

export async function saveSpeaker({ body }) {
    await upsertSpeaker(body)
    return {
        location: '/admin/speakers'
    }
}
