import { AstraDB } from '@datastax/astra-db-ts'

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN
} = process.env

const db = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)

export async function get(req) {
  const speakersCollection = await db.collection("speakers")
  const talksCollection = await db.collection("talks")
  // find all talks for CascadiaJS 2024
  const talks = await talksCollection.find({event_id: "405fff2e-6083-4aae-b518-18a08cacc463"}).toArray()
  // build a list of speakers for these talks
  const speakers = await Promise.all(talks.map(async t => { return await speakersCollection.findOne({_id: t.speaker_id}) }))

  const { path } = req;
  return {
    json: {
      path,
      speakers,
    },
  };
}
