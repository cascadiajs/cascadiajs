import { getBaseUrl } from '../../shared/utils/base-url.mjs'

export async function getLogin(req) {
  const baseUrl = getBaseUrl(req)
  const REDIRECT_URL = baseUrl + '/authenticate'
  const { session } = req
  const { ticketId } = session

  return {
    json: {
      REDIRECT_URL,
      ticketId
    }
  }
}

export const get = [getLogin]