import { DataAPIClient } from '@datastax/astra-db-ts'

function getConnection() {
    const {
      ASTRA_DB_API_ENDPOINT,
      ASTRA_DB_APPLICATION_TOKEN
    } = process.env

    const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
    return client.db(ASTRA_DB_API_ENDPOINT)
}

export {
  getConnection
}