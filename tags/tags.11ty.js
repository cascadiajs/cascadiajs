// creates a page for each tags and displays the talks associated with it.

let slugify = require('slugify')
//let urlToTitle = require('../_includes/title_builder')

module.exports = {
    data: () => { 
        return {
            pagination: {
                data: 'collections.tagList',
                size: 1,
                alias: 'tag'
            },

            permalink: ({ tag }) => `/tags/${ slugify(tag, {lower: true}) }/`,
            layout: 'layout'
        }
    },
    render: ({ collections, tag }) => {
        return `<h1>Tagged “${ tag }”</h1>
            <ol>
                ${collections[tag]
                    .map(post => `<li><a href="${ post.url }">${ post.data.title }</a> by <a href="/speakers/${ slugify(post.data.speaker) }">${ post.data.speaker }</a></li>`)
                    .join("")}
            </ol>`
    }
}