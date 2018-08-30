import axios from 'axios'

export function getPlayList () {
  const url = '/getPlayList'
  const data = Object.assign({}, {
    picmid: 1,
    rnd: 0.5381472273331032,
    g_tk: 782936517,
    jsonpCallback: 'getPlaylist',
    loginUin: 2190697689,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getPlayDetail (id) {
  const url = '/getPlayDetail'
  const data = Object.assign({}, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: id,
    format: 'json',
    g_tk: 782936517,
    loginUin: 2190697689,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
