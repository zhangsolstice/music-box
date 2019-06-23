import { requestServer } from './base'

export const artistInfoAndSongs = function (id) {
  return requestServer.get(`/artists?id=${id}`)
}

export const artistAlbums = function (id, limit, offset) {
  return requestServer.get(`/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
}
