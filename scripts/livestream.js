/**
 * This script is used to launch the conference livestream simulcast using Mux.
 *
 * 1. Run script, this will create a Mux livestream object
 * 2. Configure the conference live stream to send via RTMP to rtmps://global-live.mux.com:443/app using the stream_key
 * 3. Go to https://studio.twitter.com/producer/broadcasts and "Create broadcast", make it public, tweet it out
 *
 * No action needed for Twitch or YouTube, they will automatically start streaming.
 *
 * See: https://docs.mux.com/guides/video/stream-live-to-3rd-party-platforms#2-select-a-simulcast-target-supported-by-mux
 */

require('dotenv').config()
const { DataAPIClient } = require('@datastax/astra-db-ts')
const Mux = require('@mux/mux-node')

// init the Astra DB client
const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT)
// init the Mux client

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
  });


async function updatePlaybackId(playbackId) {
    const collection = await db.collection('events')
    await collection.findOneAndUpdate({ name: 'CascadiaJS 2024' }, { $set: { playbackId }}, { returnDocument: 'after'})
    console.log('Setting Updated: playbackId: ', playbackId)
}

async function createLivestream() {
    // call MUX API
    const result = await mux.video.liveStreams.create({
        playback_policy: [
          "public"
        ],
        new_asset_settings: {
          playback_policy: [
            "public"
          ]
        },
        generated_subtitles: [
          {
            name: "English CC (auto)",
            passthrough: "English closed captions (auto-generated)",
            language_code: "en-US",
            transcription_vocabulary_ids: []    
          }
        ],
        simulcast_targets : [
          {
            url : "rtmps://or.pscp.tv:443/x",
            stream_key : process.env.TWITTER_STREAM_KEY,
            passthrough : "CascadiaJS 2024 Livestream on Twitter"
          },
          {
            url : "rtmp://sea.contribute.live-video.net/app/",
            stream_key : process.env.TWITCH_STREAM_KEY,
            passthrough : "CascadiaJS 2024 Livestream on Twitch"
          },
          {
            url : "rtmp://a.rtmp.youtube.com/live2",
            stream_key : process.env.YOUTUBE_STREAM_KEY,
            passthrough : "CascadiaJS 2024 Livestream on YouTube"
          }
        ]
      });
    //console.log(result)
    console.log("Mux Stream Key: ", result.stream_key)
    let playbackId = result.playback_ids[0].id
    //console.log("Mux playbackId: ", playbackId)
    await updatePlaybackId(playbackId)
}

function main() {
    let command = process.argv[2]
    let arg = process.argv[3]
    switch (command) {
        case 'start':
            createLivestream()
            break
        case 'stop':
            updatePlaybackId(null)
            break
    }
}
  
main()