module.exports = {
    data: () => {
        return {
            permalink: '/api/speakers.json'
        }
    },
    render: ({collections}) => {
        return JSON.stringify(collections.Speaker.map((speaker) => {
             let {name, location, pronouns, twitter, url, image, company} = speaker.data; 
             return {name, location, pronouns, twitter, url, image, company} 
        }))
    }
}