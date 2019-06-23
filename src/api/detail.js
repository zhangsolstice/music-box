import { requestServer } from './base'

export const playlistDetail = function (id) {
  return requestServer.get(`/playlist/detail?id=${id}`)
}

export const radioDetailInfo = function (rid) {
  return requestServer.get(`/dj/detail?rid=${rid}`)
}

export const radioDetailDj = function (rid, limit, offset) {
  return requestServer.get(`/dj/program?rid=${rid}&limit=${limit}&offset=${offset}`)
}

export const albumDetail = function (id) {
  return requestServer.get(`/album?id=${id}`)
}
