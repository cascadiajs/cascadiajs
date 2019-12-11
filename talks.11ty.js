let renderTalkLink = (talk) => {
    //console.log(talk) 
    return `<a href="${talk.url}">${talk.data.title}</a>`
}

module.exports = function ({ collections }) {
    return `<ul>
    ${collections.Talk.map((talk) => `<li>${renderTalkLink(talk)}</li>`).join("\n")}
    </ul>`;
};