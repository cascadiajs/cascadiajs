import allTalks from '../../data/talks.json' assert { type: 'json' }
import allSpeakers from '../../data/speakers.json' assert { type: 'json' }

export async function get(req) {
  let speakers = allTalks.filter(t => t.event_id === "cascadiajs-2024").map(t => allSpeakers.find(s => t.speaker_id === s.id))
  const { path } = req;
  return {
    json: {
      path,
      speakers,
    },
  };
}
