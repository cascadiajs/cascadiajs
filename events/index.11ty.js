module.exports = {
    data: () => {
        return {
            layout: 'layout',
            title: 'Events'
        }
    },
    render: ({title, collections}) => {
        return `<h1>${title}</h1>
        <ul>
        ${collections.events.map((event) => `<li><a href="${event.url }">${event.data.name}</a></li>`).join("")}
        </ul>`;
    }
}