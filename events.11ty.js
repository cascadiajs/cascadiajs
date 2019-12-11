module.exports = {
    data: () => {
        return {
            layout: 'layout',
        }
    },
    render: ({collections}) => {
        let events = collections.Event
        return `<ul>
        ${events.map((event) => `<li><a href="${event.url }">${event.data.name}</a></li>`).join(",")}
        </ul>`;
    }
}