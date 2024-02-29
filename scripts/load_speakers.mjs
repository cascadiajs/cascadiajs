import fs from 'fs'
import 'dotenv/config'
import { AstraDB } from '@datastax/astra-db-ts'

const {
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    ASTRA_DB_NAMESPACE
  } = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT, ASTRA_DB_NAMESPACE || "default_keyspace")

async function main() {
    const file = fs.readFileSync(process.cwd() + "/app/data/speakers.json", "utf-8")
    const speakers = JSON.parse(file)
    const cleaned = speakers.map(s => { let slug = s.id; delete s.id; return { slug, ...s } })
    const chunkSize = 20;
    const chunks = [];
    for (let i = 0; i < cleaned.length; i += chunkSize) {
        const chunk = cleaned.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    const collection = await db.collection("speakers")
    for (let i = 0; i < chunks.length; i++) {
        const insertData = chunks[i]
        const response = await collection.insertMany(insertData)
        console.log(response)
    }   
}

main()