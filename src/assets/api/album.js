import axios from 'axios'
export function getAlbum () {
  const url = '/getAlbum'
  const data = Object.assign({}, {
    g_tk: 782936517,
    loginUin: 2190697689,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: {'albumlib': {'method': 'get_album_by_tags', 'param': {'area': 7, 'company': -1, 'genre': -1, 'type': -1, 'year': -1, 'sort': 2, 'get_tags': 1, 'sin': 0, 'num': 20, 'click_albumid': 0}, 'module': 'music.web_album_library'}}
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getAlbumDetail (abmid) {
  const url = '/getAlbumDetail'
  const data = Object.assign({}, {
    albummid: abmid,
    g_tk: 782936517,
    loginUin: 2190697689,
    hostUin: 0,
    format: 'json',
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
