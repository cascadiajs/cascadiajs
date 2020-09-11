let slugify = require('slugify')

let talkRender = (talk) => {
    return `<a href="${talk.url}">${talk.data.event}</a>`
}

let speakerRender = (speaker, talks) => {
    talks = talks.filter(talk => talk.data.speaker === speaker.data.name)
    return `
        <li><a href="${speaker.url}">${speaker.data.name}</a> [${talks.map(talk => talkRender(talk)).join(", ")}]</li>
    `
}

module.exports = {
    data: () => { return {layout: 'layout', title: 'Speakers'}},
    render: ({ title, collections }) => {
        return `<h1>${title}</h1><ul>
            ${collections.speakers.map((speaker) => speakerRender(speaker, collections.talks)).join("\n")}
        </ul>`;
    }
};