import { requestServer } from './base'
//  热门歌手 歌手界面/推荐界面
export const popArtists = function (limit, offset) {
  return requestServer.get(`/top/artists?limit=${limit}&offset=${offset}`)
}

export const catArtists = function (cat, initial, limit = 100, offset = 0) {
  if (cat === 5001) {
    return requestServer.get(`/artist/list?cat=${cat}`)
  }
  return requestServer.get(`/artist/list?cat=${cat}&initial=${initial}&limit=${limit}&offset=${offset}`)
}
