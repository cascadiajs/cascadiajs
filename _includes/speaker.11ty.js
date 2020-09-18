module.exports = {
    data: () => {
        return {
            layout: "layout",
            eleventyComputed: {
                pageTitle: data => `Speakers - ${ data.name }`
            }
        }
    },
    render: ({ name, image, location, pronouns, twitter, url, company, collections }) => {
        let talks = collections.talks.filter(t => t.data.speaker === name)
            .map(t => `<li><a href="${t.url}">${ t.data.title }</a></li>`).join("\n")
        return `
<h1>${name}</h1>
<img src="${ image }"/>
${ location ? `<p>Location: ${ location }</p>` : ""}
${ company ? `<p>Company: ${ company }</p>` : ""}
${ pronouns ? `<p>Pronouns: ${pronouns}</p>` : "" }
${ twitter ? `<p>Twitter: <a href="https://twitter.com/${twitter}">${twitter}</a></p>` : ""}
${ url ?  `<p>Website: <a href="${url}">${url}</a></p>` : ""}
<p>Talks:<ul>${ talks }</ul></p>
`
    }
}
