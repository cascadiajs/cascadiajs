module.exports = {
    data: () => {
        return {
            permalink: '/api/talks.json'
        }
    },
    render: ({collections}) => {
        return JSON.stringify(collections.Talk.map((talk) => {
             let {title, speaker, tags, abstract, ytID} = talk.data; 
             return {title, speaker, tags, abstract, ytID} 
        }))
    }
}