let slugify = require('slugify')
let { strcmp } = require('../_includes/utils')


let renderTalkLink = (talk) => {
    //console.log(talk) 
    return `<a href="${ talk.url }">${ talk.data.title }</a> by <a href="/speakers/${ slugify(talk.data.speaker.toLowerCase()) }">${ talk.data.speaker }</a>`
}

module.exports = {
    data: () => { 
        return {
            layout: 'layout', 
            title: 'Talks'
        }
    },
    render: ({ title, collections }) => {
        return `<h1>${title}</h1><ul>
        ${collections.talks.sort((a,b) => strcmp(a.data.title, b.data.title)).map((talk) => `<li>${renderTalkLink(talk)}</li>`).join("\n")}
        </ul>`
    }
}