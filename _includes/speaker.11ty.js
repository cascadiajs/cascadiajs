module.exports = {
    data: () => {
        return {
            layout: "layout",
            title: "Speaker"
        }
    },
    render: ({ name, image, location, pronouns, twitter, url, company, collections }) => {
        let talks = collections.Talk.filter(t => t.data.speaker === name)
            .map(t => `<a href="${t.url}">${ t.data.title }</a>`).join(`,`)
        return `
<h1>${name}</h1>
<img src="${ image }"/>
<p>Location: ${ location }</p>
<p>Company: ${ company }</p>
${ pronouns ? `<p>Pronouns: ${pronouns}</p>` : "" }
${ twitter ? `<p>Twitter: <a href="https://twitter.com/${twitter}">${twitter}</a></p>` : ""}
${ url ?  `<p>Website: <a href="${url}">${url}</a></p>` : ""}
<p>Talks: ${ talks }</p>
`
    }
}
