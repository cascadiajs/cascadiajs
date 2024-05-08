import { findTalks, upsertTalk, deleteTalk } from '../../../shared/data/talks.mjs'

export const get = [checkAuth, getTalks]
export const post = [checkAuth, saveOrDeleteTalk]

const { SECRET_PASSWORD } = process.env

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
            talks,
            event_id: query.event_id
        }
    }
}

export async function saveOrDeleteTalk({ body }) {
    const { _id, event_id, speaker_id, title, abstract, tags, short, __delete } = body
    if (__delete) {
        await deleteTalk(_id)
    }
    else {
        await upsertTalk({ _id, event_id, speaker_id, title, abstract, tags, short })
    }
    
    return {
        location: '/admin/talks?event_id=' + event_id
    }
}
