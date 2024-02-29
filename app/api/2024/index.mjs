import { AstraDB } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

export async function get(req) {
  const eventsCollection = await db.collection("events")
  const speakersCollection = await db.collection("speakers")
  const talksCollection = await db.collection("talks")
  // find the id for CascadiaJS 2024
  const event = await eventsCollection.findOne({slug: 'cascadiajs-2024'})
  // find all talks for CascadiaJS 2024
  const talks = await talksCollection.find({event_id: event._id}).toArray()
  // build a list of speakers for these talks
  const speakers = await speakersCollection.find({
    _id: {
      "$in": talks.map(t => t.speaker_id)
    }  
  }).toArray()

  const { path } = req;
  return {
    json: {
      path,
      speakers,
    },
  };
}
