import 'dotenv/config'

import { DataAPIClient } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN).db(ASTRA_DB_API_ENDPOINT)

async function main(name, id) {
    const collection = await db.collection(name)
    const response = await collection.deleteOne({ _id: id})
    console.log(response)
}

const name = process.argv[2]
const id = process.argv[3]

main(name, id)