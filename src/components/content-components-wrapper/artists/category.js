export const category = function () {
  return [
    { name: '热门歌手', code: 0 },
    { name: '', code: 10000 },
    { name: '入驻歌手', code: 5001 },
    { name: '华语男歌手', code: 1001 },
    { name: '华语组合', code: 1003 },
    { name: '华语女歌手', code: 1002 },
    { name: '欧美男歌手', code: 2001 },
    { name: '欧美组合', code: 2003 },
    { name: '欧美女歌手', code: 2002 },
    { name: '日本男歌手', code: 6001 },
    { name: '日本组合', code: 6003 },
    { name: '日本女歌手', code: 6002 },
    { name: '韩国男歌手', code: 7001 },
    { name: '韩国组合', code: 7003 },
    { name: '韩国女歌手', code: 7002 },
    { name: '其他男歌手', code: 4001 },
    { name: '其他组合', code: 4003 },
    { name: '其他女歌手', code: 4002 }
  ]
}

export const order = function () {
  let a = []
  for (let i = 65; i <= 90; ++i) {
    a.push(String.fromCodePoint(i))
  }
  return a
}
