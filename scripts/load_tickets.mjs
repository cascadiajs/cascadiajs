import fs from 'fs'
import 'dotenv/config'
import { insertTickets } from '../shared/data/tito.mjs'
import { release } from 'os'

const {
    TITO_API_KEY
} = process.env

const RELEASES = [
    {
      id: 1469997,
      slug: 'conference-attendee',
      title: 'Conference Attendee'
    },
    {
      id: 1487843,
      slug: '4jkgzpgexfe',
      title: 'Conference Student Attendee'
    },
    {
      id: 1489836,
      slug: 'conference-attendee-copy',
      title: 'Conference Indie Attendee'
    },
    { id: 1492670, slug: 'pjensvaav78', title: 'Conference No Frills' },
    {
      id: 1484904,
      slug: '4ulkmmv3o7m',
      title: 'Conference Attendee + Full Scholarship'
    },
    {
      id: 1492669,
      slug: 'vugalafey5k',
      title: 'Conference Significant Other'
    },
    {
      id: 1484905,
      slug: 'scholarship-donation',
      title: 'Scholarship Donation'
    },
    { id: 1484368, slug: 'qdwav1lsvk4', title: 'Conference Volunteers' },
    { id: 1484705, slug: 'cgk8vhvwoq4', title: 'Conference Speaker' },
    {
      id: 1495897,
      slug: 'f-tigfw9on0',
      title: 'Training - Intro to Data Structures (June 18)'
    },
    {
      id: 1495898,
      slug: 'training-intro-to-data-structures-june-18-copy',
      title: 'Training - Advanced Data Structures (June 18)'
    },
    {
      id: 1495640,
      slug: 'vgvtlnposje',
      title: 'Training - Intro to React Server Components (June 19)'
    },
    {
      id: 1495641,
      slug: 'jhkrbmbo-yq',
      title: 'Training - AI for React Developers (June 19)'
    }
  ]

async function main() {
    // get tickets from Tito
    let tickets = [], i = 1
    while (true) {
        let response = await fetch(`https://api.tito.io/v3/event-loop/cascadiajs-2024/tickets?page=${ i }`, {
            method: 'GET',
            headers: {
                'Authorization': `Token token=${TITO_API_KEY}`,
                'Accept': 'application/json'
            }
        })
        let json = await response.json()

        tickets = tickets.concat(json.tickets.map(t => {
            return {
                _id: t.reference,
                release_id: t.release_id,
                release_title: RELEASES.find(r => r.id === t.release_id).title,
                release_slug: RELEASES.find(r => r.id === t.release_id).slug,
                ticket_number: t.number,
                event_id: "cascadiajs-2024",
                event_title: "CascadiaJS 2024",
                full_name: t.name,
                email: t.email
            }
        }))
        if (json.meta.next_page === null) {
            break
        }
        else {
            i++
        }
    }

    console.log(tickets)

    // write tickets to DB
    await insertTickets(tickets)
}

main()