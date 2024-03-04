import { AstraDB } from '@datastax/astra-db-ts'

function getConnection() {
    const {
      ASTRA_DB_API_ENDPOINT,
      ASTRA_DB_APPLICATION_TOKEN
    } = process.env
    return new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT)
}

export {
  getConnection
}