import { requestServer } from './base'

//  首页推荐电台 登陆后内容改变
export const personalRadios = function () {
  return requestServer.get('/personalized/djprogram')
}

export const typeRadios = function (type) {
  return requestServer.get(`/dj/recommend/type?type=${type}`)
}
