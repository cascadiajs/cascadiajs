import { getBaseUrl } from '../../shared/utils/base-url.mjs'

export async function getLogin(req) {
  const baseUrl = getBaseUrl(req)
  const REDIRECT_URL = baseUrl + '/authenticate'

  return {
    json: {
      REDIRECT_URL
    }
  }
}

export const get = [getLogin]