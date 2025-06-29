import fs from 'fs'
import 'dotenv/config'

const {
    TITO_API_KEY
} = process.env

async function main() {
    // get releases from Tito
    
    let response = await fetch(`https://api.tito.io/v3/event-loop/events/upcoming`, {
        method: 'GET',
        headers: {
            'Authorization': `Token token=${TITO_API_KEY}`,
            'Accept': 'application/json'
        }
    })
    let json = await response.json()
    console.log(json.events.map(e => { return {
        id: e.id,
        slug: e.slug,
        title: e.title
    }}))
    
}

main()