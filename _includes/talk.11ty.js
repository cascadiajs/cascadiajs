let slugify = require('slugify')
let md = require('markdown-it')();

module.exports = {
    data: () => {
        return {
            layout: "layout",
            eleventyComputed: {
                pageTitle: data => `${ data.title } by ${ data.speaker }`
            }
        }
    },
    render: ({ title, event, speaker, tags, abstract, ytId, collections, content }) => {
        let speakerPage = collections.speakers.find(s => s.data.name === speaker) || {}
        return `
<h1>${title}</h1>
<div class="card">
    ${ ytId ? `<div class="video-container"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${ ytId }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` : ``}
    <p>Event: <a href="/events/${ slugify(event, {lower: true}) }">${ event }</a></p>
    <p>Speaker: <a href="${ speakerPage.url }">${ speaker }</a></p>
    <p>Tags: [${ tags.map(t => `<a href="/tags/${ slugify(t, {lower: true})}">${ t }</a>`).join(", ") }]</p>
    ${ abstract ? `<p>${ md.render(abstract) }</p>` : `` }
    ${ content }
</div>`
    }
}