let slugify = require('slugify')

module.exports = {
    data: () => {
        return {
            layout: "layout"
        }
    },
    render: ({ title, location, date, url, description, content, collections }) => {
        return `
        <h1>${title }</h1>
        <p>Location: ${ location }</p>
        <p>Date: ${ date.toDateString() }</p>
        <p>Website: <a href="${ url }">${ url }</a></p>
        <p>Description: ${description}</p>
        ${ content }`
    }
}