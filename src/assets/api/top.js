import axios from 'axios'

export function getTopList () {
  const url = '/getTopList'
  const data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopMusic (topid) {
  const url = '/getTopMusic'
  const data = Object.assign({}, {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5',
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
