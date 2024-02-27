import fs from 'fs'
import 'dotenv/config'
import { AstraDB } from '@datastax/astra-db-ts'

const {
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

async function main() {
    const file = fs.readFileSync(process.cwd() + "/app/data/talks.json", "utf-8")
    const talks = JSON.parse(file)
    
    const talksCol = await db.collection("talks")
    const speakersCol = await db.collection("speakers")
    const eventsCol = await db.collection("events")

    let cleaned = []
    for (let i = 0; i < talks.length; i++) {
        const t = talks[i]
        console.log("Processing talk: ", t.event_id, t.speaker_id)
        // delete the id
        delete t.id; 
        // map the event_id to the value in Astra
        t.event_id = (await eventsCol.findOne({slug: t.event_id}))._id 
        // map the speaker_id to the value in Astra
        t.speaker_id = (await speakersCol.findOne({slug: t.speaker_id}))._id 
        cleaned.push(t)
    }
    
    const chunkSize = 20;
    const chunks = [];
    for (let i = 0; i < cleaned.length; i += chunkSize) {
        const chunk = cleaned.slice(i, i + chunkSize);
        chunks.push(chunk);
    }
    
    for (let i = 0; i < chunks.length; i++) {
        const insertData = chunks[i]
        const response = await talksCol.insertMany(insertData)
        console.log(response)
    }   
}

main()