let slugify = require('slugify')

module.exports = {
    data: () => {
        return {
            layout: "layout"
        }
    },
    render: ({ title, event, speaker, tags, abstract, slides, ytID, resources, collections }) => {
        let speakerPage = collections.speakers.find(s => s.data.name === speaker) || {}
        return `
<h1>${title}</h1>
<div class="card">
    <p><img src="${ speakerPage.data.image }"/></p>
    <p>Event: <a href="/events/${ slugify(event, {lower: true}) }">${ event }</a></p>
    <p>Speaker: <a href="${ speakerPage.url }">${ speaker }</a></p>
    <p>Tags: [${ tags.map(t => `<a href="/tags/${slugify(t, {lower: true})}">${t}</a>`).join(", ") }]</p>
    <p>Abstract:<br/><br/>${ abstract }</p>
    ${ slides ? "<p>Slides: " + `<a href="${slides}">${slides}</a></p>` : "" }
    ${ resources ? "<p>Resources:<ul>" + resources.map(r => `<li><a href="${r}">${r}</a></li>`) + "</ul>" : "" }
    <p>Video:<br/><br/>
    ${ ytID 
        ? `<div class="video-container"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${ytID}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` 
        : `<i>This talk was not recorded, we're sorry.</i>`}
    </p>
</div>`
    }
}