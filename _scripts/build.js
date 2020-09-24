let slugify = require('slugify')
let fs = require('fs')
let speakers = require('./speakers-2020.json')

function writeSpeaker(speaker) {
    let slug = slugify(speaker.name.toLowerCase())
    let path = `./speakers/${ slug }.md`
    if (!fs.existsSync(path)) {
        console.log('File does not exist: ', path)
        let yaml = `---
name: ${ speaker.name }
location: ${ speaker.location }
image: https://create-4jr-staging.begin.app/_static/2020/${ slug }.jpg
pronouns: ${ speaker.pronouns }
layout: speaker
---
`
        fs.writeFileSync(path, yaml)
    }
}

function writeTalk(speaker) {
    let talkSlug = slugify(speaker.title.toLowerCase())
    let speakerSlug = slugify(speaker.name.toLowerCase())
    let path = `./talks/${ talkSlug }.md`
    if (!fs.existsSync(path)) {
        console.log('File does not exist: ', path)
        let yaml = `---
title: ${ JSON.stringify(speaker.title) }
speaker: ${ speaker.name }
event: CascadiaJS 2020
tags: ${ JSON.stringify(speaker.topics) }
abstract: ${ JSON.stringify(speaker.abstract) }
${ speaker.ytId ? `ytId: ${ speaker.ytId }` : `` }
layout: talk
---
![talk illustration](https://2020.cascadiajs.com/images/speakers/${ speakerSlug }-illustration.png)
`
        fs.writeFileSync(path, yaml)
    }
}

for (speaker of speakers) {
    writeSpeaker(speaker)
    writeTalk(speaker)
}