import { AstraDB } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT, ASTRA_DB_NAMESPACE || "default_keyspace")

export async function get(req) {
  const slug = req.path.substr(1)
  const eventsCollection = await db.collection("events")
  const speakersCollection = await db.collection("speakers")
  const talksCollection = await db.collection("talks")
  // find the id for CascadiaJS 2024
  const event = await eventsCollection.findOne({slug: 'cascadiajs-2024'})
  // find this talk for CascadiaJS 2024
  const talk = await talksCollection.findOne({event_id: event.id, slug })
  // build a list of speakers for these talks
  const speaker = await speakersCollection.findOne({_id: t.speaker_id})  
  
  const { path } = req;
  return {
    json: {
      path,
      speaker,
      talk
    },
  };
}
