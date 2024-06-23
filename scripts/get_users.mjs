import 'dotenv/config'
import { findUsers } from '../shared/data/users.mjs'

const attendees = await findUsers({ query: {}, limit: 1000 })
const photos = attendees.map(a => { return { profile_photo: a.profile_photo}})

console.log(JSON.stringify(photos))