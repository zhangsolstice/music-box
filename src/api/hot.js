import { requestServer } from './base'
//  歌曲排行榜 首页/排行榜页面
export const hots = function (idx) {
  return requestServer.get(`/top/list?idx=${idx}`)
}
