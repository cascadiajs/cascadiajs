import slugify from 'slugify'
import { AstraDB } from '@datastax/astra-db-ts'
import { findTalks } from '../../../shared/data/talks.mjs'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  SECRET_PASSWORD
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

export const get = [checkAuth, getTalks]
export const post = [checkAuth, saveTalk]

async function checkAuth({ session, headers }) {
    const authorized = headers['x-cascadiajs-pass'] === SECRET_PASSWORD || !!(session.authorized)
    if (!authorized) return { location: '/login' }
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

export async function saveTalk({ body }) {
    const { _id, title, abstract, tags, short, event_id } = body
    let tagsArray
    let slug
    if (tags && tags !== "") {
        tagsArray = tags.split(',')
    }
    if (title) {
        slug = slugify(title, { lower: true, strict: true })
    }
    const talksCollection = await db.collection("talks")
    await talksCollection.updateOne({ _id }, { $set: { title, abstract, slug, tags: tagsArray, short } })
    return {
        location: '/admin/talks?event_id=' + event_id
    }
}
