import { requestServer } from './base'

export const newAlbums = function () {
  return requestServer.get('/album/newest')
}

export const topAlbums = function (limit, offset) {
  return requestServer.get(`/top/album?limit=${limit}&offset=${offset}`)
}
