const fs = require('fs')
const fm = require('front-matter')
const events = require('../data/events.json')
const speakers = require('../data/speakers.json')

const talks = []

const dir = fs.readdirSync('../data/talks')

dir.forEach((fileName) => {
    if (fileName.endsWith(".md")) {
        let file = fs.readFileSync(`../data/talks/${ fileName }`, "utf-8")
        let { attributes } = fm(file)
        delete attributes.layout
        let speaker = speakers.find((s) => s.name === attributes.speaker)
        delete attributes.speaker
        let event = events.find((e) => e.name === attributes.event)
        delete attributes.event
        let talk = {
            id: fileName.split(".md")[0],
            speaker_id: speaker.id,
            event_id: event.id,
            ...attributes
        }
        talks.push(talk)
    }
})

console.log(JSON.stringify(talks))