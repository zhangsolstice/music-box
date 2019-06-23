import { requestServer } from './base'

export const creatorInfo = function (uid) {
  return requestServer.get(`/user/detail?uid=${uid}`)
}

export const creatorPlaylists = function (uid, limit, offset = 0) {
  return requestServer.get(`/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`)
}
