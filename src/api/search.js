import { requestServer } from './base'

export const search = function (keywords, type, limit, offset) {
  return requestServer.get(`/search?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`)
}
