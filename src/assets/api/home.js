import axios from 'axios'

export function getHomeList () {
  const url = '/getHomeList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取乐库页面中细节歌曲数据
export function getHomeDetail (num) {
  const url = '/getHomeDetail'
  const data = Object.assign({}, {
    page: 'detail',
    topid: 26,
    type: 'top',
    song_begin: 0,
    song_num: num,
    g_tk: 782936517,
    loginUin: 2190697689,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
