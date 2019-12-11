let slugify = require('slugify')

let talkRender = (talk) => {
    return `<a href="${talk.url}">${talk.data.title}</a>`
}

let speakerRender = (speaker, talks) => {
    talks = talks.filter(talk => talk.data.speaker === speaker.data.name)
    return `
        <li><a href="${speaker.url}">${speaker.data.name}</a> [${talks.map(talk => talkRender(talk)).join(", ")}]</li>
    `
}

module.exports = function ({ collections }) {
    //console.log(collections)
    return `<ul>
        ${collections.Speaker.map((speaker) => speakerRender(speaker, collections.Talk)).join("\n")}
    </ul>`;
};