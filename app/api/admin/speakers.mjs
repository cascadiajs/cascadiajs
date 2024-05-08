import { findSpeakers, upsertSpeaker, deleteSpeaker } from "../../../shared/data/speakers.mjs"

export const get = [checkAuth, getSpeakers]
export const post = [checkAuth, saveOrDeleteSpeaker]

const { SECRET_PASSWORD } = process.env

async function checkAuth({ session, headers }) {
    const authorized = headers['x-cascadiajs-pass'] === SECRET_PASSWORD || !!(session.authorized)
    if (!authorized) return { location: '/admin/login' }
}

export async function getSpeakers({ query }) {
    return {
        json: {
            speakers: await findSpeakers({ query })
        }
    }
}

export async function saveOrDeleteSpeaker({ body }) {
    const { _id, slug, name, image, url, twitter, company, location, pronouns, __delete } = body
    if (__delete) {
        await deleteSpeaker(_id)
    }
    else {
        await upsertSpeaker({ _id, slug, name, image, url, twitter, company, location, pronouns })
    }
    return {
        location: '/admin/speakers'
    }
}
