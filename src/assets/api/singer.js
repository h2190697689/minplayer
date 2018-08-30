import axios from 'axios'

export function getSingerList () {
  const url = '/getSingerList'
  const data = Object.assign({}, {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    format: 'jsonp',
    notice: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail (singerId) {
  const url = '/getSingerDetail'
  const data = Object.assign({}, {
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    format: 'jsonp',
    notice: 0,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
    singermid: singerId
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
