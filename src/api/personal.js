import { requestServer } from './base'

//  个性化推荐歌单 需要登录
export const recommendPlaylists = function () {
  return requestServer.request('/recommend/resource')
}

//  个性化推荐歌曲 需要登录
export const recommendSongs = function () {
  return requestServer.get('/recommend/songs')
}
