let slugify = require('slugify')

module.exports = {
    data: () => { 
        return {
            title: 'Tags',
            layout: 'layout'
        }
    },
    render: ({ collections }) => {
        let tags = Object.keys(collections)
        return `<h1>Tags</h1>
            <ul>
            ${tags.filter(tag => ['all', 'talks', 'speakers', 'events'].indexOf(tag) < 0)
                .map(tag => `<li><a href="/tags/${slugify(tag, {lower: true})}">${ tag }</a></li>`)
                .join("\n")}
            </ul>`
    }
}