import fs from 'fs'
import 'dotenv/config'

const {
    TITO_API_KEY
} = process.env

async function main() {
    // get releases from Tito
    
    let response = await fetch(`https://api.tito.io/v3/event-loop/cascadiajs-2025/releases`, {
        method: 'GET',
        headers: {
            'Authorization': `Token token=${TITO_API_KEY}`,
            'Accept': 'application/json'
        }
    })
    let json = await response.json()
    //console.log(json)
    //console.log(json.releases.length)
    console.log(json.releases.map(r => { return {
        id: r.id,
        slug: r.slug,
        title: r.title
    }}))
}

main()