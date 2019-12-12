let slugify = require('slugify')

module.exports = {
    data: () => { 
        return {
            pagination: {
                data: 'collections',
                size: 1,
                alias: 'tag'
            },
            permalink: ({tag}) => `/tags/${ slugify(tag, {lower: true}) }/`,
            title: 'Tagged',
            layout: 'layout'
        }
    },
    render: ({ collections, tag }) => {
        return `<h1>Tagged “${ tag }”</h1>
<ol>
${collections[tag].map(post => `<li><a href="${ post.url }">${ post.data.title }</a></li>`).join("")}
</ol>`
    }
}