import 'dotenv/config'
import { findUsers } from '../shared/data/users.mjs'

const attendees = await findUsers({ query: {}, limit: 1000 })

console.log(JSON.stringify(attendees))