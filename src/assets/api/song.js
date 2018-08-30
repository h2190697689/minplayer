import axios from 'axios'

// 获取歌曲媒体
export function getMusic (mid) {
  const url = '/getMusic'
  const data = Object.assign({}, {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 3613187458,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    cid: 205361747
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌词
export function getLyric (mid) {
  const url = '/getLyric'
  const data = Object.assign({}, {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    pcachetime: +new Date(),
    songmid: mid,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    format: 'jsonp',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
