let slugify = require('slugify')
let { strcmp } = require('../_includes/utils')

let speakerRender = (speaker, talks) => {
    talks = talks.filter(talk => talk.data.speaker === speaker.data.name)
    return `
        <li><a href="${speaker.url}">${speaker.data.name}</a></li>
    `
}

module.exports = {
    data: () => { 
        return {
            layout: 'layout', 
            title: 'Speakers'
        }
    },
    render: ({ title, collections }) => {
        return `<h1>${title}</h1><ul>
            ${collections.speakers.sort((a,b) => strcmp(a.data.name, b.data.name)).map((speaker) => speakerRender(speaker, collections.talks)).join("\n")}
        </ul>`;
    }
};