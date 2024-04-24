import slugify from 'slugify'
import { findTalks, upsertTalk } from '../../../shared/data/talks.mjs'

export const get = [checkAuth, getTalks]
export const post = [checkAuth, saveTalk]

async function checkAuth({ session, headers }) {
    const authorized = headers['x-cascadiajs-pass'] === SECRET_PASSWORD || !!(session.authorized)
    if (!authorized) return { location: '/admin/login' }
}

export async function getTalks({ query }) {
    // get talks
    const talks = await findTalks({ query, inflate: true})
    //console.log(talks)
    return {
        json: {
            talks
        }
    }
}

export async function saveTalk({ _id, title, abstract, tags, short, event_id }) {
    await upsertTalk({ id: _id, title, abstract, tags, short, event_id })
    return {
        location: '/admin/talks?event_id=' + event_id
    }
}
