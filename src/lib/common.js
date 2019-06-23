export const timestampToDate = function (timestamp) {
  let date = new Date(timestamp)
  let dateString = date.toJSON()
  let ymd = dateString.slice(0, 10)
  return ymd
}

export const transformCount = function (count) {
  let intCount = parseInt(String(count))
  if (String(intCount).length > 8) {
    let num = Math.round(count / 100000000) + '亿'
    return num
  } else if (String(intCount).length > 4 && String(intCount).length <= 8) {
    let num = Math.round(count / 10000) + '万'
    return num
  } else {
    return count
  }
}

export const formatDuration = function (duration) {
  let min = parseInt((duration / 1000) / 60)
  let sec = parseInt((duration / 1000) % 60)
  if (min < 10) {
    min = `0${min}`
  }
  if (sec < 10) {
    sec = `0${sec}`
  }
  let time = `${min}:${sec}`
  return time
}
