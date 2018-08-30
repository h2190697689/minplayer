'use strict'
import {getMusic, getLyric} from '../../assets/api/song'
import {Base64} from 'js-base64'
export default class Song {
  constructor (musicData) {
    this.id = musicData.songid || musicData.id || ''
    this.mid = musicData.songmid || musicData.mid || ''
    this.singer = filterSinger(musicData.singer)
    this.name = musicData.songname || musicData.title || ''
    this.album = musicData.albumname || ''
    this.duration = musicData.interval || ''
    this.image = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + (musicData.albummid || (musicData.album ? musicData.album.mid : '')) + '.jpg?max_age=2592000'
    this.url = ''
    this.lyric = ''
  }
  getMusic () {
    return new Promise((resolve) => {
      getMusic(this.mid).then((res) => {
        if (res.code === 0) {
          // this.url = 'http://dl.stream.qqmusic.qq.com/C400' + this.mid + '.m4a?vkey=' + res.data.items[0].vkey + '&guid=3613187458&uin=0&fromtag=66'
          let newUrl = 'http://dl.stream.qqmusic.qq.com/C400' + this.mid + '.m4a?vkey=' + res.data.items[0].vkey + '&guid=3613187458&uin=0&fromtag=66'
          resolve(newUrl)
        }
      })
    })
  }
  getLyric () {
    return new Promise((resolve) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === 0) {
          // this.lyric = Base64.decode(res.lyric)
          let newLyric = Base64.decode(res.lyric)
          resolve(newLyric)
        }
      })
    })
  }
}
function filterSinger (singer) {
  var a = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    a.push(s.name)
  })
  return a.join('/')
}
