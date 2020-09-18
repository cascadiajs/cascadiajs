let slugify = require('slugify')

module.exports = {
    data: () => {
        return {
            layout: "layout",
            eleventyComputed: {
                pageTitle: data => `Events - ${ data.name }`
            }
        }
    },
    render: ({ name, location, url, content, collections }) => {
        return `
        <h1>${name }</h1>
        <p>location: ${ location }</p>
        <p>website: <a href="${ url }">${ url }</a></p>
        ${ content }
        <p>Talks:</a></p>
        <ul>
        ${collections.talks.filter(t => t.data.event === name).map(t => `<li><a href="${t.url}">${t.data.title}</a></li>`).join("\n")}
        </ul>`
    }
}