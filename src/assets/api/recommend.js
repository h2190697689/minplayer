import axios from 'axios'

export function getRecommendList () {
  const url = '/getRecommendList'
  const data1 = {'comm': {'ct': 24},
    'category': {'method': 'get_hot_category', 'param': {'qq': ''}, 'module': 'music.web_category_svr'},
    'recomPlaylist': {'method': 'get_hot_recommend', 'param': {'async': 1, 'cmd': 2}, 'module': 'playlist.HotRecommendServer'},
    'playlist': {'method': 'get_playlist_by_category', 'param': {'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8}, 'module': 'playlist.PlayListPlazaServer'},
    'new_song': {'module': 'QQMusic.MusichallServer', 'method': 'GetNewSong', 'param': {'type': 0}},
    'new_album': {'module': 'music.web_album_library', 'method': 'get_album_by_tags', 'param': {'area': 7, 'company': -1, 'genre': -1, 'type': -1, 'year': -1, 'sort': 2, 'get_tags': 1, 'sin': 0, 'num': 40, 'click_albumid': 0}},
    'toplist': {'module': 'music.web_toplist_svr', 'method': 'get_toplist_index', 'param': {}},
    'focus': {'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {}}}
  const data = Object.assign({}, {
    g_tk: 782936517,
    loginUin: 2190697689,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: JSON.stringify(data1)
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
