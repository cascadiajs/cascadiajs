import 'dotenv/config'

import { deleteAllTickets } from '../shared/data/tito.mjs'

async function main() {
    const resp = await deleteAllTickets()
    console.log(resp)
}


main()