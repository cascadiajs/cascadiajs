import 'dotenv/config'

import { deleteUser } from '../shared/data/users.mjs'

async function main(_id) {
    const resp = await deleteUser({ _id })
    console.log(resp)
}

const _id = process.argv[2]

main(_id)