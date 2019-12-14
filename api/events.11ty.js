module.exports = {
    data: () => {
        return {
            permalink: '/api/events.json'
        }
    },
    render: ({collections}) => {
        return JSON.stringify(collections.events.map((event) => { let {name, location, url} = event.data; return {name, location, url} }))
    }
}