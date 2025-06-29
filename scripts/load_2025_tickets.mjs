import 'dotenv/config'
import { insertTickets } from '../shared/data/tito.mjs'

const {
  TITO_API_KEY
} = process.env

const RELEASES = [
  { id: 1518337, slug: 'w7ge2nrxxbe', title: 'Blind Bird Conference' },
  {
    id: 1548311,
    slug: '64itpb67xvo',
    title: 'Blind Bird Conference [Indie Discount]'
  },
  {
    id: 1554279,
    slug: 'blind-bird-conference-copy',
    title: 'Early Bird Conference'
  },
  {
    id: 1554280,
    slug: 'blind-bird-conference-indie-discount-copy',
    title: 'Early Bird Conference [Indie Discount]'
  },
  {
    id: 1568179,
    slug: 'early-bird-conference-copy',
    title: 'Regular Bird Conference'
  },
  {
    id: 1568180,
    slug: 'early-bird-conference-indie-discount-copy',
    title: 'Regular Bird Conference [Indie Discount]'
  },
  {
    id: 1548329,
    slug: 'scholarship-donation',
    title: 'Scholarship Donation'
  },
  {
    id: 1556026,
    slug: 'wxds9jino1w',
    title: 'Conference Student Attendee'
  },
  {
    id: 1558771,
    slug: 'kzsu7zft-g4',
    title: 'Conference Scholarship Attendee'
  },
  {
    id: 1562911,
    slug: '63ld-owvyis',
    title: 'Training - TypeScript & Deno Foundations'
  },
  {
    id: 1562912,
    slug: 'f8in1z2uvw',
    title: 'Training - Modern React & Data Management'
  },
  {
    id: 1562914,
    slug: 'ugc33u4f0jy',
    title: 'Training - Developer Productivity with AI'
  },
  { id: 1563291, slug: 'hvarq-ojhjc', title: 'Conference Volunteer' },
  { id: 1563292, slug: 'bi6zcsmiscg', title: 'Conference Speaker' }
]

async function main() {
  // get tickets from Tito
  let tickets = [], i = 1
  while (true) {
    let response = await fetch(`https://api.tito.io/v3/event-loop/cascadiajs-2025/tickets?page=${i}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token token=${TITO_API_KEY}`,
        'Accept': 'application/json'
      }
    })
    let json = await response.json()
    console.log(new Set(json.tickets.map(t => t.release_id)))
    tickets = tickets.concat(json.tickets.map(t => {
      return {
        reference: t.reference,
        release_id: t.release_id,
        release_title: RELEASES.find(r => r.id === t.release_id).title,
        release_slug: RELEASES.find(r => r.id === t.release_id).slug,
        number: t.number,
        event_id: "cascadiajs-2025",
        event_title: "CascadiaJS 2025",
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
  //await insertTickets(tickets)
}

main()