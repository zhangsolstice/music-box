import { requestServer } from './base'

export const songDetails = function (ids) {
  return requestServer.get(`/song/detail?ids=${ids.join(',')}`)
}

export const audio = function (ids) {
  return requestServer.get(`/song/url?id=${ids.join(',')}`)
}

export const lyric = function (id) {
  return requestServer.get(`/lyric?id=${id.join(',')}`)
}

export const video = function (id) {
  return requestServer.get(`/mv/url?id=${id}`)
}
