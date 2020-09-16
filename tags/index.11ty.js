// creates the index (listing) page for all tags

let slugify = require('slugify')

module.exports = {
    data: () => { 
        return {
            title: 'Tags',
            layout: 'layout'
        }
    },
    render: ({ collections }) => {
        let tags = collections.tagList
        return `<h1>Tags</h1>
            <ul>
            ${tags
                .map(tag => `<li><a href="/tags/${slugify(tag, {lower: true})}">${ tag }</a></li>`)
                .join("\n")}
            </ul>`
    }
}