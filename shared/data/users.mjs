import { getConnection } from "./connection.mjs"

const COLLECTION = "users"

async function upsertUser({ id, name, email, profile_photo, oauth_payload }) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.updateOne(
    { _id: id },
    { $set: { name, email, profile_photo, oauth_payload }},
    { upsert: true }
  )
}

async function findUsers({ query, limit = 100 }) {
    const db = getConnection()
    const collection = await db.collection(COLLECTION)
    return await collection.find(query, { limit }).toArray()
}

async function findUser({ query }) {
  const db = getConnection()
  const collection = await db.collection(COLLECTION)
  return await collection.findOne(query)
}

export {
  upsertUser,
  findUsers,
  findUser
}