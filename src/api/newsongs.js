import { requestServer } from './base'

export const personalNewSongs = function () {
  return requestServer.get('/personalized/newsong')
}
