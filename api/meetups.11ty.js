module.exports = {
    data: () => {
        return {
            permalink: '/api/meetups.json'
        }
    },
    render: ({collections}) => {
        return JSON.stringify(collections.meetups.map((meetup) => { let {title, location, date, url, description} = meetup.data; return {title, location, date, url, description} }))
    }
}