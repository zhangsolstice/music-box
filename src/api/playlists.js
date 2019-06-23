import { requestServer } from './base'

//  首页推荐歌单 登陆后内容改变
export const personalPlaylists = function () {
  return requestServer.get('/personalized')
}

export const relatedPlaylists = function (id) {
  return requestServer.get(`/related/playlist?id=${id}`)
}

export const hotAndNewPlaylists = function (order, cat, limit, offset) {
  return requestServer.get(`/top/playlist?order=${order}&cat=${cat}&limit=${limit}&offset=${offset}`)
}

export const highQualityPlaylists = function (cat, limit, before = '') {
  return requestServer.get(`/top/playlist/highquality?cat=${cat}&limit=${limit}&before=${before}`)
}

export const createNewPlaylist = function (name) {
  return requestServer.get(`/playlist/create?name=${name}`)
}

export const addSongsToPlaylist = function (pid, tracks) {
  return requestServer.get(`/playlist/tracks?op=add&pid=${pid}&tracks=${tracks}`)
}
