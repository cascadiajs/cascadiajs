let slugify = require('slugify')

module.exports = {
    data: () => {
        return {
            layout: "layout",
            title: "Event"
        }
    },
    render: ({ name, location, url, content, collections }) => {
        return `
        <h1>${name }</h1>
        <p>location: ${ location }</p>
        <p>website: <a href="${ url }">${ url }</a></p>
        <p><a href="/tags/${ slugify(name, {lower: true}) }">Talks</a></p>
        ${ content }`
    }
}