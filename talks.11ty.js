let renderTalkLink = (talk) => {
    //console.log(talk) 
    return `<a href="${talk.url}">${talk.data.title}</a>`
}

module.exports = {
    data: () => { return {layout: 'layout', title: 'Talks'}},
    render: ({ title, collections }) => {
        return `<h1>${title}</h1><ul>
        ${collections.talks.map((talk) => `<li>${renderTalkLink(talk)}</li>`).join("\n")}
        </ul>`
    }
}